import { check } from 'k6';
import { Options } from 'k6/options';
import { SharedArray } from 'k6/data';
// @ts-ignore
import { scenario } from 'k6/execution';
// @ts-ignore
import papaparse from '../libs/papaparse.min.js';

import { TilePack } from '../services';
import { tilesPack } from '../scenarios';
import { generateRandomNumber } from '../libs/utils';


const HOSTNAME = __ENV['HOSTNAME'],
  PROTOCOL = __ENV['PROTOCOL'],
  X_AUTH_TOKEN = __ENV['X_AUTH_TOKEN'],
  X_APP_TOKEN = __ENV['X_APP_TOKEN'],
  X_APP_VERSION = __ENV['X_APP_VERSION'],
  SCENARIO_TAG = __ENV['SCENARIO_TAG'];

interface Scenario {
  [key: string]: Options;
}

const headers = {
  xAuthToken: X_AUTH_TOKEN,
  xAppToken: X_APP_TOKEN,
  xAppVersion: X_APP_VERSION,
  contentType: 'image/jpeg'
}

export const options: Options = tilesPack

if (!options.scenarios?.[SCENARIO_TAG]) {
  throw new Error(`Scenario ${SCENARIO_TAG} not found.`);
}

type URIObject = { URI: string }

const rasterRequestUrls: URIObject[] = new SharedArray('another data name', function () {
  // Load CSV file and parse it using Papa Parse
  return papaparse.parse(open('./raster-tile-request-test-data.csv'), { header: true }).data;
});

console.log('*************************************************************\n*** Test Data Loading Finished. Execution Starts Now ********\n*************************************************************');

const rasterRequestsLength = rasterRequestUrls?.length;
console.log('rasterRequestsLength', rasterRequestsLength);

export default () => {



  console.log('Iteration Index', scenario.iterationInTest);

  // scenario.iterationInTest : gives index of iteration, if iteration goes beyond test data array length, exceptions will occur
  // const rasterPath = rasterRequestUrls[scenario.iterationInTest];

  // Get random number between the 0 and test data length
  const randomIndex = generateRandomNumber(0, rasterRequestsLength);
  console.log('randomIndex', randomIndex);
  const rasterPath = rasterRequestUrls[randomIndex];

  const res = TilePack.getTiles(`${PROTOCOL}://${HOSTNAME}${rasterPath.URI}`, headers);


  if (res.status === 200 || res.status === 404) {
    console.log(`Status ${res.status} for the path ${rasterPath.URI}`);
  } else {
    console.log(`!X!X!X Error status ${res.status}  for the request path ${rasterPath.URI}`, res);
  }


  // As we are using production data, some urls will not be found on dev env
  // As our intention is to simulate load, we are ignoring 404 requests.
  check(res, {
    'status is 200': () => res.status === 200 || res.status === 404,
  });
};
