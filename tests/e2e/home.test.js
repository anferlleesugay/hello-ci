const { Builder, By } = require('selenium-webdriver');

describe('E2E Home Page Test', () => {
  let driver;

  // Increase global timeout to allow the 10-second sleep
  jest.setTimeout(40000);

  beforeAll(async () => {
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
    const appUrl = process.env.APP_URL || 'http://jenkins:3000';
    await driver.get(appUrl);

    const heading = await driver.findElement(By.tagName('h1'));
    const text = await heading.getText();

    expect(text).toBe('Hello DevOps');

    // Pause for 10 seconds while the page is rendered on screen
    await driver.sleep(10000);
  });
});