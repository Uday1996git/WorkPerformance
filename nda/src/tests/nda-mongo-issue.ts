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

const scenariosList = SCENARIO_TAG.split(',');
console.log('QWQW1', scenariosList);

const list = Object.fromEntries(
  scenariosList.map(key => {
    console.log('QWQW2', key);

    if (!tilesPack.scenarios?.[key]) {
      throw new Error(`Scenario ${key} not found.`);
    }
    return [key, tilesPack.scenarios?.[key]];
  }));
console.log('QWQW3', list);


// console.log('tilesPack.scenarios?.[SCENARIO_TAG]', SCENARIO_TAG);
// TODO: for now go with single scenarios
// Ideally create an util to provide merge option.

// TODO: for now go with single scenarios
// Ideally create an util to provide merge option.
export const options: Options = {
  ...tilesPack,
  scenarios: list
}

console.log('***Final Options***', options);


type URIObject = { URI: string }



console.log('*************************************************************\n*** Test Data Loading Finished. Execution Starts Now ********\n*************************************************************');

export function todo_count() {
  console.log('--> todo_count')
  const request = {
    url: `${BASE_URL}/api/2.0/analytics/real-time/user/jella_subramanyam/todos`,
    method: 'GET',
    headers: getHeaders(),
    params: {
      startTime: "2024-08-01T00:00:00.000Z",
      endTime: "2024-08-21T00:00:00.000Z",
      aggregateByProject: true
    }
  };

  const res = TilePack.getTiles(request.url, request.headers, request.params);
  // console.log('res', res.body)
  // As we are using production data, some urls will not be found on dev env
  // As our intention is to simulate load, we are ignoring 404 requests.
  const checkStatus = check(res, {
    'status is 200': () => res.status === 200 || res.status === 404,
  });

  // Log the failed checks
  errorHandler.logError(!checkStatus, res);
};

export function user_feature_details() {

  console.log('--> user_feature_details')

  const request = {
    url: `${BASE_URL}/api/1.0/analytics/real-time/user/jella_subramanyam/features`,
    method: 'GET',
    headers: getHeaders(),
    params: {
      startTime: "2024-08-01T00:00:00.000Z",
      endTime: "2024-08-21T00:00:00.000Z",
    }
  };

  const res = TilePack.getTiles(request.url, request.headers, request.params);
  // console.log('res', res.body)
  // As we are using production data, some urls will not be found on dev env
  // As our intention is to simulate load, we are ignoring 404 requests.
  const checkStatus = check(res, {
    'status is 200': () => res.status === 200 || res.status === 404,
  });

  // Log the failed checks
  errorHandler.logError(!checkStatus, res);
};

export function real_time_user_report_by_user() {
  console.log('--> real_time_user_report_by_user')

  const request = {
    url: `${BASE_URL}/api/1.0/analytics/real-time/user/jella_subramanyam/timecard`,
    method: 'GET',
    headers: getHeaders(),
    params: {
      startTime: "2024-08-01T00:00:00.000Z",
      endTime: "2024-08-21T00:00:00.000Z",
      aggregateByProject: true,
      aggregateAllDays: true
    }
  };
  const res = TilePack.getTiles(request.url, request.headers, request.params);
  // console.log('res', res.body)
  // As we are using production data, some urls will not be found on dev env
  // As our intention is to simulate load, we are ignoring 404 requests.
  const checkStatus = check(res, {
    'status is 200': () => res.status === 200 || res.status === 404,
  });

  // Log the failed checks
  errorHandler.logError(!checkStatus, res);
};
