import { sleep } from 'k6';
import  { browser }  from 'k6/experimental/browser';
import { TOTP } from './totp.ts';
import { setTimeout } from 'k6/timers';



export const options = {
    scenarios: {
        browser_test: {
          executor: 'constant-vus',
          vus: 1,
          duration: '5m',
          options:{
            browser:{
                type:'chromium'
                },
            },
        },
    }, 
}

// export const options = {
//     iterations: 1,
// };

export default async function(){
    // const context = await browser.newContext();
    // const page = await context.newPage();
    const page = await browser.newPage();
    await page.setDefaultTimeout(1200000);
    await page.setDefaultNavigationTimeout(1200000);
    await page.goto("https://plasma-connect-staging.geo.apple.com/api/2/auth/ac_authenticate?app_token=training-center-ui.10bedd29-2e95-43a9-92fc-f6932f0ca425&app_version=1.248.0-0.0&env=staging&app_env=staging&ac_env=PROD&redirect_to=aHR0cHM6Ly90cmFpbmluZy1jZW50ZXItdWktc3RhZ2luZy5nZW8uYXBwbGUuY29tLw%3D%3D", {waitUntil:'load'});
    await page.waitForSelector('#account_name_text_field', { timeout: 10000 });
    page.locator("#account_name_text_field").type("aws_plasmabot");
    await page.locator("//button[@id='sign-in']").click();
    await page.locator("//input[@id='password_text_field']").type("Awsbot@130824");
    await page.locator("//button[@id='sign-in']").click();
    console.log("clicked")
    await page.locator(".si-device-name").click()
    console.log("click aws");
    const { otp, expires } = await TOTP.generate("ntbrevh56mnifpxy")
    console.log(otp)
    await page.locator("//input[@id='char0']").type(otp)
    sleep(2)
    await page.waitForSelector(".EzKYU",{timeout:10000})
    // const cookies = context.cookies()
    // console.log(cookies);
    await page.close();
    await browser.closeContext();
}