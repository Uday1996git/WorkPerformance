import { check } from 'k6';
import { Options } from 'k6/options';
import { SharedArray } from 'k6/data';
// @ts-ignore
import papaparse from '../../../libs/papaparse.min.js';

import { TilePack } from '../services';
import { tilesPack } from '../scenarios';
import { generateRandomNumber, errorHandler, getHeaders } from 'shared';


const BASE_URL = __ENV['BASE_URL'],
  SCENARIO_TAG = __ENV['SCENARIO_TAG'],
  TEST_DATA_PATH = __ENV['TEST_DATA_PATH'];

if (!tilesPack.scenarios?.[SCENARIO_TAG]) {
  throw new Error(`Scenario ${SCENARIO_TAG} not found.`);
}

// TODO: for now go with single scenarios
// Ideally create an util to provide merge option.
export const options: Options = {
  ...tilesPack,
  scenarios: {
    [SCENARIO_TAG]: tilesPack.scenarios?.[SCENARIO_TAG]
  }
}

console.log('***Final Options***', options);


type URIObject = { URI: string }

const rasterRequestUrls: URIObject[] = new SharedArray('another data name', function () {
  // Load CSV file and parse it using Papa Parse
  return papaparse.parse(open(TEST_DATA_PATH), { header: true }).data;
});

console.log('*************************************************************\n*** Test Data Loading Finished. Execution Starts Now ********\n*************************************************************');

const rasterRequestsLength = rasterRequestUrls?.length;
console.log('rasterRequestsLength', rasterRequestsLength);

export default () => {

  // Get random number between the 0 and test data length
  const randomIndex = generateRandomNumber(0, rasterRequestsLength);
  console.log('randomIndex', randomIndex);
  const rasterPath = rasterRequestUrls[randomIndex];

  const res = TilePack.getTiles(`${BASE_URL}${rasterPath.URI}`, getHeaders());
  console.log("Body is --->",res.body)
  console.log("Status is ----->", res.status)
  console.log("res.headers--->", res.headers)
  if(res.status === 503){
    console.log("Error message is ---->", res.error)
    console.log("Response headers are --->", res.headers)
  }
  

  // As we are using production data, some urls will not be found on dev env
  // As our intention is to simulate load, we are ignoring 404 requests.
  const checkStatus = check(res, {
    'status is 200': () => res.status === 200 || res.status === 404,
  });

  // Log the failed checks
  errorHandler.logError(!checkStatus, res);
};
