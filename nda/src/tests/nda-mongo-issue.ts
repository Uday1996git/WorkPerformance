import { check } from 'k6';
import { Options } from 'k6/options';
import { SharedArray } from 'k6/data';
// @ts-ignore
import papaparse from '../../../libs/papaparse.min.js';

import { TilePack } from '../services/index.js';
import { tilesPack } from '../scenarios/index.js';
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



console.log('*************************************************************\n*** Test Data Loading Finished. Execution Starts Now ********\n*************************************************************');

export default () => {

  // Get random number between the 0 and test data length
  

  const res = TilePack.getTiles(`${BASE_URL}/api/1.0/analytics/real-time/users/features`, getHeaders());


  // As we are using production data, some urls will not be found on dev env
  // As our intention is to simulate load, we are ignoring 404 requests.
  const checkStatus = check(res, {
    'status is 200': () => res.status === 200 || res.status === 404,
  });

  // Log the failed checks
  errorHandler.logError(!checkStatus, res);
};
