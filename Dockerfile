# Use the official Playwright image
FROM mcr.microsoft.com/playwright:v1.56.1-jammy

WORKDIR /saucedemo-testautomation

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy test files
COPY . .

# Build TypeScript
RUN npm run build

# Run Playwright install (to ensure browsers are installed)
RUN npx playwright install --with-deps

# Default command to run tests
CMD ["npx", "playwright", "test", "--reporter=line"]

