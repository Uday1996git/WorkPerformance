import { sleep, check } from 'k6';
import { browser } from 'k6/experimental/browser';
import { connectPlots } from '../services/plasmaConnect';

export const options = {
    scenarios: {
        browser_test: {
          executor: 'constant-vus',
          vus: 1,
          duration: '2m',
          options:{
            browser:{
                type:'chromium'
                },
            },
        },
    }, 
}
export default async function(){
    const page = browser.newPage()
    await page.goto("https://plasma-connect-staging.geo.apple.com/api/2/auth/ac_authenticate?app_token=training-center-ui.10bedd29-2e95-43a9-92fc-f6932f0ca425&app_version=1.248.0-0.0&env=staging&app_env=staging&ac_env=PROD&redirect_to=aHR0cHM6Ly90cmFpbmluZy1jZW50ZXItdWktc3RhZ2luZy5nZW8uYXBwbGUuY29tLw%3D%3D");
    page.locator("//input[@id='account_name_text_field']").type("aws_plasmabot")
    await page.locator("//button[@id='sign-in']").click()
    page.locator("//input[@id='password_text_field']").type("Awsbot@130824")
    await page.locator("//button[@id='sign-in']").click()
    await page.locator(".si-device-name").click()
    const otp = connectPlots.getOTP
    if (typeof otp == 'string')
    page.locator("//input[@id='char0']").type(otp)

    sleep(10);
}