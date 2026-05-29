const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");

const app = require("../../dist/app.js").default;
const db = require("../../dist/configs/db.js").default;

let server;
let port;

function makeRequest(path, method = "GET", body = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;

    const request = http.request(
      {
        hostname: "127.0.0.1",
        port,
        path,
        method,
        headers: payload
          ? {
              "Content-Type": "application/json",
              "Content-Length": Buffer.byteLength(payload),
            }
          : {},
      },
      (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          resolve({
            statusCode: response.statusCode,
            body: data,
          });
        });
      }
    );

    request.on("error", reject);

    if (payload) {
      request.write(payload);
    }

    request.end();
  });
}

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      port = server.address().port;
      resolve();
    });
  });
});

test.after(async () => {
  if (!server) {
    await db.end();
    return;
  }

  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

  await db.end();
});

test("GET /health returns success response", async () => {
  const response = await makeRequest("/health");
  const body = JSON.parse(response.body);

  assert.equal(response.statusCode, 200);
  assert.equal(body.message, "Server is running");
});

test("GET /api/dashboard returns dashboard summary", async () => {
  const response = await makeRequest("/api/dashboard");
  const body = JSON.parse(response.body);

  assert.equal(response.statusCode, 200);
  assert.equal(body.success, true);
  assert.equal(body.message, "Dashboard fetched successfully");
  assert.equal(typeof body.data.totalBooks, "number");
  assert.equal(typeof body.data.totalMembers, "number");
  assert.equal(typeof body.data.borrowedBooks, "number");
  assert.equal(typeof body.data.overdueBooks, "number");
  assert.equal(typeof body.data.totalReservations, "number");
});
