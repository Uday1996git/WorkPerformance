import { Options } from 'k6/options';

// Requests per day in production env for raster-server/tile is 3251889(As of 14-May-2024), 37 req/s, 2258 req/min , 135k req/hr
// By adding buffer, 50Vus, 500 and simulate around 150k req/hr
export const tilesPack: Options = {
  discardResponseBodies: true,
  thresholds: {
    http_req_failed: ['rate<0.03'], // http errors should be less than 3%
  },
  scenarios: {
    smokeGetTiles: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 20,
      maxDuration: '10s',
    },
    spikeGetTiles: {
      executor: 'ramping-arrival-rate',
      preAllocatedVUs: 10,
      maxVUs: 50,
      timeUnit: '1m',
      startRate: 600,
      stages: [
        { target: 1200, duration: '2m' }, // linearly go from 600 iters/s to 1200 iters/s for 2m
        { target: 2400, duration: '3m' }, // jump to 2400 iters/s in 3m
        { target: 2400, duration: '20m' },// continue with 2400 iters/s for 20 minutes
        { target: 1200, duration: '2m' },// ramp down to 1200 iters/s in 2m
        { target: 600, duration: '1m' },// ramp down to 600 iters/s in 1m
      ]
    },
  },
};