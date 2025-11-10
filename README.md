# SauceDemo Test Automation Framework

A comprehensive end-to-end test automation framework for [SauceDemo](https://www.saucedemo.com/) built with Playwright and TypeScript.

## ✨ Features

- ✅ **TypeScript** - Full TypeScript support with strict typing
- ✅ **Page Object Model** - Organized and maintainable test structure
- ✅ **Fixtures** - Reusable test fixtures for page objects
- ✅ **Fake Data Generation** - Dynamic test data using Faker.js
- ✅ **Docker Support** - Run tests in containerized environment
- ✅ **CI/CD Ready** - GitHub Actions workflow included
- ✅ **HTML Reports** - Beautiful test reports with screenshots and videos
- ✅ **Multiple Browsers** - Support for Chromium, Firefox, and WebKit
- ✅ **Price Validation** - Comprehensive price comparison across pages

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- **Docker** (optional, for containerized testing) - [Download here](https://www.docker.com/)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/csaba-balint/sauceDemo-testAutomation.git
cd sauceDemo-testAutomation
```

### 2. Install Dependencies

```bash
npm ci
```

This will install all required dependencies including:
- `@playwright/test` - Playwright testing framework
- `@faker-js/faker` - Fake data generator
- `typescript` - TypeScript compiler
- `@types/node` - Node.js type definitions
- `builder-pattern` - Builder pattern utilities

### 3. Install Playwright Browsers

```bash
npx playwright install --with-deps
```

This command installs Chromium, Firefox, and WebKit browsers along with system dependencies.

### 4. Build TypeScript Files

```bash
npm run build
```

This compiles TypeScript files to JavaScript in the `dist/` directory.

## 📁 Project Structure

```
sauceDemo-testAutomation/
│
├── pages/
│   ├── BasePage/
│   │   └── BasePage.ts
│   ├── LoginPage/
│   │   └── LoginPage.ts
│   ├── ProductsPage/
│   │   └── ProductsPage.ts
│   ├── CartPage/
│   │   └── CartPage.ts
│   ├── CheckoutPage/
│   │   └── CheckoutPage.ts
│
├── tests/                         # Test specifications
│   ├── login.spec.ts             # Login test scenarios
│   └── orderPlacement.spec.ts    # Order placement tests
│
├── testData/                      # Test data generators
│   └── DataObjects.ts            # Order data object factory
│
├── fixtures.ts                    # Playwright fixtures
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── Dockerfile                    # Docker configuration
├── .dockerignore                 # Docker ignore patterns
│
├── .github/
│   └── workflows/
│       └── playwright.yml        # CI/CD workflow
│
└── package.json                  # Project dependencies
```

## 🧪 Running Tests

### Run All Tests (Headless)

```bash
npm test
```

### Run Tests in Headed Mode

```bash
npm run test:headed
```

This opens the browser window so you can see the tests running.

### Run Tests in UI Mode

```bash
npm run test:ui
```

Opens Playwright's interactive UI mode for test development and debugging.

### Run Tests in Debug Mode

```bash
npm run test:debug
```

Opens the Playwright Inspector for step-by-step debugging.

### Run Specific Test File

```bash
npx playwright test tests/login.spec.ts
```

### Run Tests with Specific Tags

```bash
npx playwright test --grep @smoke
npx playwright test --grep @regression
```

### Run Tests in Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 📊 Test Data

The framework uses **Faker.js** to generate random test data for checkout forms:

Fresh data is generated before each test run in the `beforeAll` hook.

## 🐳 Docker Support

### Build Docker Image

```bash
docker build -t playwright-tests .
```

### Run Tests in Docker Container

```bash
docker run --rm playwright-tests
```

### Run Tests and Extract Reports

```bash
docker run --rm \
  -v $(pwd)/playwright-report:/saucedemo-testautomation/playwright-report \
  -v $(pwd)/test-results:/saucedemo-testautomation/test-results \
  playwright-tests
```

This mounts local directories to extract HTML reports and test results.

### Using npm Script

```bash
npm run docker:test
```

## 🔄 CI/CD

The project includes a GitHub Actions workflow that automatically:

1. ✅ Builds Docker image
2. ✅ Runs all tests inside Docker container
3. ✅ Generates HTML reports
4. ✅ Uploads test artifacts (reports and results)

### Workflow Triggers

- **Push** to `main` branch
- **Pull Request** targeting `main` branch

### View Reports

After each workflow run:
1. Go to GitHub Actions tab
2. Click on the workflow run
3. Download `playwright-report` artifact
4. Extract and open `index.html`

## 📈 Reports

### View HTML Report

After running tests, view the report:

```bash
npm run test:report
```

Or manually:

```bash
npx playwright show-report
```

The HTML report includes:
- ✅ Test results summary
- ✅ Test duration
- ✅ Screenshots (on failure)
- ✅ Videos (on failure)
- ✅ Traces (on retry)
- ✅ Step-by-step execution logs

### Report Locations

- **HTML Report**: `playwright-report/index.html`
- **Test Results**: `test-results/`
- **Compiled JS**: `dist/`

## 🔍 Test Scenarios

### Login Tests (`tests/login.spec.ts`)

- ✅ Verify login page elements
- ✅ Login with valid credentials
- ✅ Login with invalid username
- ✅ Login with invalid password
- ✅ Login and logout

### Order Placement Tests (`tests/orderPlacement.spec.ts`)

- ✅ **Place an order** - Complete end-to-end order flow
- ✅ **Check order total price** - Validates:
  - Product prices from Products page
  - Cart prices match Products page prices
  - Cart total calculation
  - Checkout subtotal matches cart total
  - Checkout total = subtotal + tax

## 🛠️ Troubleshooting

### Tests Failing Locally

1. **Ensure browsers are installed**:
   ```bash
   npx playwright install --with-deps
   ```

2. **Clear previous test artifacts**:
   ```bash
   rm -rf test-results playwright-report dist
   ```

3. **Rebuild TypeScript**:
   ```bash
   npm run build
   ```

### Docker Build Fails

1. **Clear Docker cache**:
   ```bash
   docker system prune -a
   ```

2. **Rebuild without cache**:
   ```bash
   docker build --no-cache -t playwright-tests .
   ```

### CI/CD Pipeline Fails

1. **Check package-lock.json is committed**:
   ```bash
   git ls-files package-lock.json
   ```

2. **Verify TypeScript compiles**:
   ```bash
   npm run build
   ```

3. **Check GitHub Actions logs** for specific error messages

### Port Already in Use

If you get port errors, kill the process:

```bash
# macOS/Linux
lsof -ti:PORT | xargs kill -9

# Windows
netstat -ano | findstr :PORT
taskkill /PID <PID> /F
```

---

**Happy Testing! 🚀**

