# Custom Deputy UI

## Prerequisites

The following environment variables are required for operation of the site:
Name | Value
---- | -----
DEPUTY_API_HOST | The hostname for your API requests e.g. `subdomain.deputy.com`
DEPUTY_API_KEY | The [Permanent Token](https://www.deputy.com/api-doc/API/Authentication#page_Permanent_Token) for accessing the Deputy API

## Getting started

1. Clone the repository
```
git clone https://github.com/blahDL/custom-deputy-ui.git
```
2. Install the node modules 
```
npm install
```
3. Run the web server
```
npm start
```
4. Browse to http://localhost:8080/ in your web browser

## Installing the windows service

The service will be called `Deputy Custom UI` and can be maintained through Computer Management / Services
```
npm run service install
```

## Uninstalling the windows service

After installing the windows service following the steps above it can be uninstalled by running the following command
```
npm run service uninstall
```

## Note

This website proxies all requests made to the API through the web server as the Deputy API isn't configured to allow the requests directly from the browser :disappointed: