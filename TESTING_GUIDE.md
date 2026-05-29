# Testing Guide - Library Management System

## Quick Start

### Run All Tests
```bash
npm run test:all
```

### Run Individual Test Suites

#### Unit Tests Only
```bash
npm run test:unit
```
**Tests**: Borrowing entity calculations, date validation, overdue detection
**Duration**: ~800ms
**Output**: 4/4 passing

#### Integration Tests Only
```bash
npm run test:integration
```
**Tests**: API endpoints, health checks, dashboard data
**Duration**: ~2s
**Output**: 2/2 passing

#### Performance Tests Only
```bash
npm run test:performance
```
**Tests**: Load testing with k6 (5→10 virtual users, 40s duration)
**Duration**: ~50s
**Output**: 439 requests, 100% success rate

---

## Test Structure

```
tests/
├── unit/
│   └── borrow.model.test.js          # Unit tests for borrowing model
├── integration/
│   └── app.integration.test.js        # Integration tests for API endpoints
└── performance/
    └── k6-dashboard-borrow.js         # Load testing script
```

---

## Running Specific Test File

### Unit Test File
```bash
npm run build && node --test tests/unit/borrow.model.test.js
```

### Integration Test File
```bash
npm run build && node --test tests/integration/app.integration.test.js
```

### Performance Test with Custom Base URL
```bash
BASE_URL=http://localhost:5000 k6 run tests/performance/k6-dashboard-borrow.js
```

---

## Expected Results

### ✅ Unit Tests: 4/4 PASS
```
✔ BorrowingEntity.createNew calculates due date correctly
✔ BorrowingEntity.createNew throws for invalid borrow date
✔ BorrowingEntity can detect overdue status
✔ BorrowingEntity markReturned updates return date and status
```

### ✅ Integration Tests: 2/2 PASS
```
✔ GET /health returns success response (200)
✔ GET /api/dashboard returns dashboard summary (200)
```

### ✅ Performance Tests: 439/439 PASS
```
✓ http_req_duration: p(95)=17.18ms (threshold: <1000ms)
✓ http_req_failed: 0% (threshold: <10%)
✓ All 439 requests successful
```

---

## Troubleshooting

### Error: "Database connection refused"
**Solution**: Ensure MySQL is running on `localhost:3306`
```bash
# Windows: Check MySQL service
Get-Service MySQL*

# Linux/Mac: Check MySQL
brew services start mysql
# or
sudo systemctl start mysql
```

### Error: "JWT_SECRET must be set"
**Solution**: Add JWT_SECRET to `.env` file
```bash
# Generate secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Add to .env
JWT_SECRET=your_generated_secret_here
```

### Error: "Cannot find k6"
**Solution**: Install k6 for performance tests
- Visit: https://k6.io/docs/getting-started/installation/
- Or skip performance tests: `npm run test:unit && npm run test:integration`

### Performance Test Shows Higher Latency
**Possible Causes**:
- Database is slow
- Server CPU under load
- Network issues
- Too many concurrent connections

**Solution**: Check system resources during test:
```bash
# Windows: Task Manager
# Linux: top or htop
# Mac: Activity Monitor
```

---

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run Tests
  run: |
    npm run test:unit
    npm run test:integration
```

### Before Deployment
```bash
# 1. Run all tests
npm run test:all

# 2. Build production code
npm run build

# 3. Check for TypeScript errors
npx tsc --noEmit

# 4. Ready to deploy!
```

---

## Adding New Tests

### Template: Unit Test
```javascript
const test = require("node:test");
const assert = require("node:assert/strict");

test("describe what you're testing", () => {
  // Arrange
  const testData = { /* ... */ };

  // Act
  const result = functionToTest(testData);

  // Assert
  assert.equal(result, expectedValue);
});
```

### Template: Integration Test
```javascript
test("describe the API behavior", async () => {
  const response = await makeRequest("/api/endpoint", "POST", { data });
  const body = JSON.parse(response.body);

  assert.equal(response.statusCode, 200);
  assert.equal(body.success, true);
});
```

---

## Performance Test Customization

Edit `tests/performance/k6-dashboard-borrow.js`:

```javascript
export const options = {
  stages: [
    { duration: "10s", target: 5 },    // Ramp up
    { duration: "20s", target: 10 },   // Stay at peak
    { duration: "10s", target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_failed: ["rate<0.10"],           // Max 10% errors
    http_req_duration: ["p(95)<1000"],        // p95 under 1 second
  },
};
```

---

## Resources

- **Node.js Test Runner**: https://nodejs.org/api/test.html
- **K6 Documentation**: https://k6.io/docs/
- **Express Testing**: https://expressjs.com/en/guide/testing.html

---

**Last Updated**: 2026-05-29
