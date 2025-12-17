const { Builder, until } = require("selenium-webdriver");

(async function bstackDemoTest() {
  const capabilities = {
    browserName: "Chrome",
    browserVersion: "latest",
    "bstack:options": {
      os: "Windows",
      osVersion: "11",
      projectName: "GitHub Actions Demo",
      buildName: "bstackdemo.com Build",
      sessionName: "Homepage Title Validation"
    }
  };

  const driver = await new Builder()
    .usingServer(
      `https://${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}` +
      `@hub-cloud.browserstack.com/wd/hub`
    )
    .withCapabilities(capabilities)
    .build();

  try {
    await driver.get("https://bstackdemo.com/");

    await driver.wait(async () => {
      const title = await driver.getTitle();
      return title && title.length > 0;
    }, 10000);

    const title = await driver.getTitle();
    console.log("Page title:", title);

    if (!title.toLowerCase().includes("stack")) {
      throw new Error("Title validation failed");
    }

    console.log("✅ bstackdemo.com test passed!");
  } finally {
    await driver.quit();
  }
})();
