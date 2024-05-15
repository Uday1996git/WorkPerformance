# k6-load-ts
Load testing using k6

## Building

Run `npx nx build {App Name}` to build the library.

To build tests:
```
npx nx build tests
```

Generates javascript files in dist folder. k6 works with only Javascript

## Run tests
k6 is not nodejs based, to run tests rely on k6 binary

Download [k6 binary](https://github.com/grafana/k6/releases) and copy to root folder(For example tests/)

> Always replace with the latest binary, and ensure the binary is compatible with the operating system on which you are running the scripts.

> After running build, files will be generated under dist folder. For each test file one js will be generated

To run tests on mac
```
npx nx test tests -e PROTOCOL=http -e HOSTNAME=test.k6.io -e SCENARIO_TAG=smokeCrocodiles dist/getCrocodiles.js
```
npx nx testd tests -e PROTOCOL=http -e HOSTNAME=test.k6.io -e SCENARIO_TAG=smokeCrocodiles dist/getCrocodiles.js

K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_PERIOD=1s K6_WEB_DASHBOARD_EXPORT=html-report.html npx nx test tests -e PROTOCOL=https -e HOSTNAME=neutron-raster-server-dev.geo.apple.com -e SCENARIO_TAG=spikeGetTiles -e X_AUTH_TOKEN=${token} -e X_APP_TOKEN=${apptoken} -e X_APP_VERSION=1 dist/getRasterTiles.js


you can pass all k6 options in the above command