const { spawn } = require("child_process");
const http = require("http");

const PORT = 3001;

function get(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve({ statusCode: res.statusCode, body }));
      })
      .on("error", reject);
  });
}

describe("my-nodejs-app", () => {
  let server;

  beforeAll((done) => {
    server = spawn("node", ["app.js"], {
      env: { ...process.env, PORT: String(PORT) },
    });
    server.stdout.once("data", () => done());
    server.stderr.on("data", (chunk) => process.stderr.write(chunk));
  });

  afterAll(() => {
    server.kill();
  });

  test("GET / returns 200 and serves index.html", async () => {
    const res = await get(`http://localhost:${PORT}/`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("Everybody");
  });
});
