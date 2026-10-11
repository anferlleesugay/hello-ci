const { Builder, By, until } = require('selenium-webdriver');

describe('E2E Home Page Test', () => {
  let driver;

  // Global timeout for remote browser startup
  jest.setTimeout(30000);

  beforeAll(async () => {
    // Connect to the Selenium standalone container over the Docker network
    const seleniumHost = process.env.SELENIUM_HOST || 'http://selenium:4444/wd/hub';

    driver = await new Builder()
      .forBrowser('chrome')
      .usingServer(seleniumHost)
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('should display correct header text', async () => {
    // Navigate to the Express server running inside the Jenkins container
    const appUrl = process.env.APP_URL || 'http://jenkins:3000';
    await driver.get(appUrl);

    // Locate the <h1> element and assert header content
    const heading = await driver.findElement(By.tagName('h1'));
    const text = await heading.getText();

    expect(text).toBe('Welcome to CI/CD');
  });
});