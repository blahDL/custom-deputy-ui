# Custom Deputy UI

## Prerequisites

The following environment variables are required for operation of the site:

Name | Value
---- | -----
DEPUTY_API_HOST | The hostname for your API requests e.g. `subdomain.deputy.com`
DEPUTY_API_KEY | The [Permanent Token](https://www.deputy.com/api-doc/API/Authentication#page_Permanent_Token) for accessing the Deputy API

The following software is assumed to be installed and configured:
* [Git](https://www.git-scm.com/)
* [Node.js](https://nodejs.org/)

## Getting started

1. Clone the repository
```
git clone https://github.com/blahDL/custom-deputy-ui.git
```
2. Install the node modules 
```
npm install
```

## Running the site

Run the web server
```
npm start
```
Browse to http://localhost:8080/ in your web browser

## Installing the windows service

The service will be called `Deputy Custom UI` and can be maintained through Computer Management / Services
```
npm run service install
```
_Click `Yes` to all the prompts to complete the installation process_

Browse to http://localhost:8080/ in your web browser

Log files for the server can be found in `service/daemon/`

## Uninstalling the windows service

After installing the windows service, it can be uninstalled by running the following command
```
npm run service uninstall
```
_Click `Yes` to all the prompts to complete the uninstal process_

## Note

This website proxies all requests made to the API through the web server as the Deputy API isn't configured to allow the requests directly from the browser :disappointed: