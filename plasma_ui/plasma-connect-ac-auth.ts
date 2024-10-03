import { sleep } from 'k6';
import { browser } from 'k6/experimental/browser';
import { TOTP } from './totp.ts';


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

export default async function () {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://plasma-connect-staging.geo.apple.com/api/2/auth/ac_authenticate?app_token=training-center-ui.10bedd29-2e95-43a9-92fc-f6932f0ca425&app_version=1.248.0-0.0&env=staging&app_env=staging&ac_env=PROD&redirect_to=aHR0cHM6Ly90cmFpbmluZy1jZW50ZXItdWktc3RhZ2luZy5nZW8uYXBwbGUuY29tLw%3D%3D", { waitUntil: 'networkidle' });
    const frame = await page.frames();
    console.log(frame.length)
    console.log("frame--->", frame[1])
    await page.evaluate(()=>{
        const iframe = frame[0].content();
        frame[0].fill("#account_name_text_field","aws_plasmabot");
    })
    
    // const iframeHandle = await page.waitForSelector("//iframe");
    // const frame = await iframeHandle.contentFrame();
}
