import { Browser, Builder, By, Key, until } from "selenium-webdriver";
import Chrome, { ServiceBuilder } from "selenium-webdriver/chrome";

export async function GET() {
  const Options = new Chrome.Options();
  Options.addArguments("--no-sandbox");
  Options.addArguments("--disable-dev-shm-usage");
  Options.addArguments("--disable-gpu");
  Options.addArguments(
    "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.1 Safari/537.36"
  );
  const driver = new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeService(new ServiceBuilder(process.env.CHROME_DRIVER_EXE_PATH))
    .setChromeOptions(Options)
    .build();

  try {
    await driver.get("https://www.google.com/ncr");
    await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);

    await driver.sleep(3000);

    const html = await driver.getPageSource();

    await driver.wait(until.titleContains("webdriver"), 5000);

    return new Response(html);
  } catch (error) {
    console.error("에러 발생:", error);
    return new Response("Error", { status: 500 });
  } finally {
    await driver.quit();
  }
}
