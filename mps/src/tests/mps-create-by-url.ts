import { check } from 'k6';
import { Options } from 'k6/options';
import { SharedArray } from 'k6/data';
// @ts-ignore
import papaparse from '../../../libs/papaparse.min.js';

import { MPSPlots } from '../services/index.js';
import { mpsPlots } from '../scenarios/index.js';
import { generateRandomNumber, errorHandler, getHeaders } from 'shared';


const BASE_URL = __ENV['BASE_URL'],
  SCENARIO_TAG = __ENV['SCENARIO_TAG'],
  TEST_DATA_PATH = __ENV['TEST_DATA_PATH'];

const scenariosList = SCENARIO_TAG.split(',');
console.log('QWQW1', scenariosList);

const list = Object.fromEntries(
  scenariosList.map(key => {
    console.log('QWQW2', key);

    if (!mpsPlots.scenarios?.[key]) {
      throw new Error(`Scenario ${key} not found.`);
    }
    return [key, mpsPlots.scenarios?.[key]];
  }));
console.log('QWQW3', list);

export const options: Options = {
  ...mpsPlots,
  scenarios: list
}

console.log('***Final Options***', options);


type URIObject = { URI: string }

export default () => {
  const payload = {
    "photos": [
        {
            "type": "nps_business_connect_patch",
            "name": "Newport_Mall_NJ_1",
            "autovalidate": false,
            "skip_csam": true,
            "skip_blur": true,
            "skip_publish": true,
            "metadata": {
                "business_connect_id": "newport_center"
            },
            "url": "https://www.sefram.com/images/products/photos/hi_res/LS3002AMP.jpg",
            "properties": {
                "location": {
                    "lat": "40.72635456045517",
                    "lon": "-74.03309414145664"
                },
                "country_code": "US",
                "intent": "GALLERY",
                "photo_id": "X5Wr6uuMw0KOlKeIoqI0Bv",
                "size": {
                    "type": "original",
                    "pixel_height": 100,
                    "pixel_width": 100
                },
                "captions": [
                    {
                        "locale": "en-US",
                        "text": "Inner View"
                    }
                ],
                "ttl": {
                    "soft_delete": 1716285670800,
                    "hard_delete": 1716372070800
                }
            }
        }
    ]
  }
  const res = MPSPlots.postMPS(`${BASE_URL}/api/1/photo/_create_from_urls?skip_dedupe=true`, getHeaders(), payload);
  console.log('response',res.body)
  // As we are using production data, some urls will not be found on dev envx`
  // As our intention is to simulate load, we are ignoring 404 requests.
  const checkStatus = check(res, {
    'status is 200': () => res.status === 200 || res.status === 201,
  });

  // Log the failed checks
  errorHandler.logError(!checkStatus, res);
};