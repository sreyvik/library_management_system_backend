import http from "k6/http";
import { check, sleep } from "k6";

const baseUrl = __ENV.BASE_URL || "http://localhost:3000";

export const options = {
  stages: [
    { duration: "10s", target: 5 },
    { duration: "20s", target: 10 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.10"],
    http_req_duration: ["p(95)<1000"],
  },
};

function createBorrowPayload() {
  const uniqueBookId = Date.now() * 1000 + (__VU * 100) + __ITER;

  return JSON.stringify({
    memberId: 1,
    bookId: uniqueBookId,
    borrowDate: "2026-05-22",
  });
}

export function setup() {
  const response = http.get(`${baseUrl}/health`);

  check(response, {
    "health check is 200": (res) => res.status === 200,
  });

  return { baseUrl };
}

export default function (data) {
  const commonParams = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const dashboardResponse = http.get(`${data.baseUrl}/api/dashboard`);
  check(dashboardResponse, {
    "dashboard is 200": (res) => res.status === 200,
  });

  const borrowResponse = http.post(
    `${data.baseUrl}/api/borrow`,
    createBorrowPayload(),
    commonParams
  );
  check(borrowResponse, {
    "borrow is 201": (res) => res.status === 201,
  });

  sleep(1);
}
