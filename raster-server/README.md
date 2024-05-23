# Raster Server Load Tests
Load testing using k6

## Building

Run `npx nx build {App Name}` to build the library.

To build tests:
```
npx nx build tests
```

Generates javascript files in dist folder. k6 works with only Javascript

## Raster Server Get Tile Test data download
Run the below query in splunk
```
index=app_logs app=neutron-raster-server "Request-URI" env=prod "raster-server/tile" "Status=200" | rex field=_raw "Request-URI=\[(?<Method>\w+)\](?<URI>\/\S+)" | dedup URI | table URI | outputcsv rasters_data.csv

```
Downlaod as csv file and provide test data path in below command.

## Run tests
k6 is not nodejs based, to run tests rely on k6 binary

Download [k6 Typescript binary](https://github.com/grafana/xk6-ts/releases/tag/v0.2.6) and copy to root folder(For example raster-server/)

> Always replace with the latest binary, and ensure the binary is compatible with the operating system on which you are running the scripts.

> After running build, files will be generated under dist folder. For each test file one js will be generated

To run tests
```
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_PERIOD=1s K6_WEB_DASHBOARD_EXPORT=html-report.html npx nx test raster-server -e PROTOCOL=https -e HOSTNAME=neutron-raster-server-dev.geo.apple.com -e SCENARIO_TAG=smokeGetTiles -e X_AUTH_TOKEN=${token} -e X_APP_TOKEN=${apptoken} -e X_APP_VERSION=1 -e TEST_DATA_PATH=${testDataPath} src/tests/getRasterTiles.ts |& tee k6logs.log
```


you can pass all k6 options in the above command