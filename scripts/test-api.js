/* eslint-disable no-console */
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 5000;
const baseUrl = `http://localhost:${port}`;

async function request(method, path, body) {
  const headers = {};
  let payload;

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = typeof body === "string" ? body : JSON.stringify(body);
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: payload,
  });

  const text = await res.text();
  let parsed = text;
  try {
    parsed = JSON.parse(text);
  } catch {
    // keep raw text
  }

  return { status: res.status, body: parsed };
}

function toLogJson(value) {
  if (!value || typeof value !== "object") return value;

  // Mask tokens in output only (keep real values for follow-up requests)
  return JSON.parse(
    JSON.stringify(value, (key, val) => {
      if (key === "token" && typeof val === "string") return "[token]";
      return val;
    })
  );
}

async function run() {
  const results = [];

  results.push(["GET", "/", await request("GET", "/")]);
  results.push(["GET", "/api", await request("GET", "/api")]);
  results.push(["GET", "/api/auth", await request("GET", "/api/auth")]);
  results.push([
    "GET",
    "/api/auth/register",
    await request("GET", "/api/auth/register"),
  ]);
  results.push(["GET", "/api/unknown", await request("GET", "/api/unknown")]);

  const email = `apitest${Math.floor(Math.random() * 1e9)}@example.com`;
  const password = "12345678";

  results.push([
    "POST",
    "/api/auth/register (new user)",
    await request("POST", "/api/auth/register", {
      name: "API Test",
      email,
      password,
    }),
  ]);

  results.push([
    "POST",
    "/api/auth/register (duplicate email)",
    await request("POST", "/api/auth/register", {
      name: "API Test",
      email,
      password,
    }),
  ]);

  const loginResult = await request("POST", "/api/auth/login", {
    email,
    password,
  });

  results.push(["POST", "/api/auth/login (valid)", loginResult]);

  const token = loginResult.body?.data?.token;
  if (token) {
    results.push([
      "GET",
      "/api/auth/me (with token)",
      await (async () => {
        const res = await fetch(`${baseUrl}/api/auth/me`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const text = await res.text();
        let parsed = text;
        try {
          parsed = JSON.parse(text);
        } catch {}
        return { status: res.status, body: parsed };
      })(),
    ]);
  }

  results.push([
    "POST",
    "/api/auth/register (invalid JSON)",
    await request("POST", "/api/auth/register", "\"  {\\n  }\""),
  ]);

  results.push([
    "POST",
    "/api/auth/register (validation error)",
    await request("POST", "/api/auth/register", {
      name: "NoPass",
      email: `nopass${Math.floor(Math.random() * 1e9)}@example.com`,
    }),
  ]);

  for (const [method, name, result] of results) {
    const body =
      typeof result.body === "string"
        ? result.body
        : JSON.stringify(toLogJson(result.body));
    console.log(`${method} ${name} -> ${result.status} | ${body}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
