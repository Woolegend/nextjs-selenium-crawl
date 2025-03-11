# nextjs-selenium-crawl

- 환경: Next.js App Route
- 패키지: [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver), [chromedriver](https://googlechromelabs.github.io/chrome-for-testing/#stable)

## 사용법

### api 설정

#### 1. git clone

```
git clone https://github.com/Woolegend/nextjs-selenium-crawl.git
```

#### 2. `/api/crawl/route.ts` 원하는 경로에 배치

#### 3. 패키지 설치

```
npm i selenium-webdriver chromedriver
```

#### 4. chromedriver 수동 설치

아래 리스트 중 알맞은 플랫폼을 선택해 chromedriver를 설치

https://googlechromelabs.github.io/chrome-for-testing/#stable

#### 5. chromedriver 실행 파일 경로 명시

[해당 내용](#selenium-manager를-불러오지-못-함)을 따라 명시하면 된다.

## selenium-webdriver 타입 에러

타입스크립트를 사용하는 환경에서 selenium을 사용할 경우 아래 오류가 발생한다.

```
 Could not find a declaration file for module 'selenium-webdriver'.
 'c:/.../project/node_modules/selenium-webdriver/index.js' implicitly has an 'any' type.

 Try `npm i --save-dev @types selenium-webdriver`

 if it exists or add a new declaration (.d.ts) file containing `declare module 'selenium-webdriver';`
```

경고문에 나와 있듯 다음 명령어를 사용해 selenium-webdriver의 타입을 설치하면 된다.

```
npm i --save-dev @types selenium-webdriver
```

## Selenium Manager를 불러오지 못 함

```
Selenium Error: Error: Unable to obtain browser driver.
For more information on how to install drivers see
https://www.selenium.dev/documentation/webdriver/troubleshooting/errors/driver_location/. Error:
Unable to obtain Selenium Manager
 at C:\...\project\next\server\bin\windows\selenium-manager.exe
at GET (c:\...\route.ts:11:7)
9 | .forBrowser("chrome")
10| .setChromeOptions(options)
11| .build();
    ^
```

공식 문서에서 제시하는 첫 번째 방법은 selenium과 chromedriver를 최신버전으로 업데이트한 후 chromedriver 경로를 환경 변수에 등록하면 해결된다고 나와있다.

나의 경우 위 방법으로 문제가 해결되지 않아 두 번째 방법을 사용했다.

두 번째 방법은 chromedriver를 수동으로 설치한 뒤 chromedriver의 경로를 코드상에 명시하면 된다.

**windows**

```ts
// windows
const driver = new Builder()
  .forBrowser(Browser.CHROME)
  .setChromeService(new ServiceBuilder("c:/.../chromedriver/chromedriver.exe"))
  .build();
```

**macOS**

```ts
// macOS
const driver = new Builder()
  .forBrowser(Browser.CHROME)
  .setChromeService(new ServiceBuilder("/Users/.../chromedriver/chromedriver"))
  .build();
```

## macOS 보안 오류

macOS에서 chromedriver를 실행할 때 다음 경고창이 뜰 것이다.

<img width="263" alt="스크린샷 2025-03-11 오후 2 36 10" src="https://github.com/user-attachments/assets/5cb41a04-7d96-4ed6-8dda-889e5c6283bd" />

해당 경고창은 macOS의 보안 정책으로 인해 chromedriver이 실행되지 않는 것이다.

이 경우 chromedriver에 대한 실행을 허용하면 된다.

방법은 아래와 같다.

1. `시스템 설정`
2. `개인정보 보호 및 보안`
3. `보안`
4. `chromedriver` 허용

## Chrome과 ChromeDriver 버전 불일치

```
 ⨯ unhandledRejection: [Error
  [SessionNotCreatedError]:
  session not created:
  This version of ChromeDriver only supports Chrome version 134
  Current browser version is 133.0.6943.143 with binary path
  /Applications/Google Chrome.app/Contents/MacOS/Google Chrome]

  remoteStacktrace:
  '0   chromedriver  0x0000000102915804 cxxbridge1$str$ptr + 2785964\n' +
  '1   chromedriver  0x000000010290dddc cxxbr
```

해당 오류는 경고문에도 나와있듯 Chrome 브라우저의 버전과 ChromeDriver의 버전이 맞지 않아 발생하는 문제다.

그래서 이 오류는 드라이버의 버전을 브라우저와 일치 시키거나 브라우저와 드라이버 모두 최신 버전으로 업데이트 하면 해결된다.
