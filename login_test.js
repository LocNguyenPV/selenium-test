const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const { resolve } = require("path");

const scenario1 = async (driver) => {
  await driver.findElement(By.name("username")).sendKeys("student1");
  await driver
    .findElement(By.name("password"))
    .sendKeys("Password123", Key.ENTER);
  await driver.findElement(By.id("submit")).click();
  let divErr = await driver.findElement(By.id("error"));
  await driver.wait(until.elementIsVisible(divErr), 2000);
  divErr.getText().then((textValue) => {
    assert.equal("Your username is invalid!", textValue);
  });
};
const scenario2 = async (driver) => {
  await driver.findElement(By.name("username")).sendKeys("student");
  await driver
    .findElement(By.name("password"))
    .sendKeys("Password1234", Key.ENTER);
  await driver.findElement(By.id("submit")).click();
  let divErr = await driver.findElement(By.id("error"));
  await driver.wait(until.elementIsVisible(divErr), 2000);
  divErr.getText().then((textValue) => {
    assert.equal("Your password is invalid!", textValue);
  });
};
const scenario3 = async (driver) => {
  await driver.findElement(By.name("username")).sendKeys("student");
  await driver
    .findElement(By.name("password"))
    .sendKeys("Password123", Key.ENTER);
  await driver.findElement(By.id("submit")).click();
  await driver.wait(
    until.urlIs("https://practicetestautomation.com/logged-in-successfully/"),
    1000
  );
};

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get("https://practicetestautomation.com/practice-test-login/");
    await scenario1(driver);
    await scenario2(driver);
    await scenario3(driver);
  } catch (err) {
    console.log(err);
  } finally {
    await driver.quit();
  }
})();
