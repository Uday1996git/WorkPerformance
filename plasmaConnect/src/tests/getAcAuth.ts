import { check } from 'k6';
import { Options } from 'k6/options';
import { SharedArray } from 'k6/data';
// @ts-ignore
import papaparse from '../../../libs/papaparse.min.js';

import { connectPlots } from '../services/index.js';
import { ConnectPlots } from '../scenarios/index.js';
import { generateRandomNumber, errorHandler, getHeaders } from 'shared';


const BASE_URL = __ENV['BASE_URL'],
  SCENARIO_TAG = __ENV['SCENARIO_TAG'],
  TEST_DATA_PATH = __ENV['TEST_DATA_PATH'];

const scenariosList = SCENARIO_TAG.split(',');
console.log('QWQW1', scenariosList);

const list = Object.fromEntries(
  scenariosList.map(key => {
    console.log('QWQW2', key);

    if (!ConnectPlots.scenarios?.[key]) {
      throw new Error(`Scenario ${key} not found.`);
    }
    return [key, ConnectPlots.scenarios?.[key]];
  }));
console.log('QWQW3', list);

export const options: Options = {
  ...ConnectPlots,
  scenarios: list
}

console.log('***Final Options***', options);


type URIObject = { URI: string }

export default () => {
  const payload = {
   
  }
  // https://plasma-connect-ci.geo.apple.com/api/2/auth/ac_authenticate?with_membership=false&app_env=ci&app_version=1.372.1.716&redirect_to=aHR0cHM6Ly9wbGFzbWEtd2ZtLWNpLmdlby5hcHBsZS5jb20vYXBpLWRvYy8%3D&app_token=wfm-web.9b109a6e-4cf5-4f37-8ad9-d919377bf845&env=ci
  // https://plasma-connect-staging.geo.apple.com/api/2/auth/ac_authenticate?app_token=training-center-ui.10bedd29-2e95-43a9-92fc-f6932f0ca425&app_version=1.248.0-0.0&env=staging&app_env=staging&ac_env=PROD&redirect_to=aHR0cHM6Ly90cmFpbmluZy1jZW50ZXItdWktc3RhZ2luZy5nZW8uYXBwbGUuY29tLw%3D%3D
  const res = connectPlots.getConnect(`${BASE_URL}/api/1/auth/ac_authenticate?app_token=training-center-ui.10bedd29-2e95-43a9-92fc-f6932f0ca425&app_version=1.248.0-0.0&env=staging&app_env=staging&ac_env=PROD&redirect_to=aHR0cHM6Ly90cmFpbmluZy1jZW50ZXItdWktc3RhZ2luZy5nZW8uYXBwbGUuY29tLw%253D%253D`, getHeaders(), payload);
  console.log("Status code is ",res.status)
  // console.log("String response is ",res.body)
  // console.log('response',res.body)
  // As we are using production data, some urls will not be found on dev envx`
  // As our intention is to simulate load, we are ignoring 404 requests.
  const checkStatus = check(res, {
    'status is 200': () => res.status === 200 || res.status === 201,
  });
  // Log the failed checks
  errorHandler.logError(!checkStatus, res);
};