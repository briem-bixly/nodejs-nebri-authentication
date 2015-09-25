# Node.js Nebri Authentication

The simple and easy-to-use package for making authenticated Nebri api requests from a Node.js application.

This package is intended for use with a Nebri instance. Visit https://nebrios.com to sign up for free!

<h2>Installation</h2>
This app can be installed via npm:
```
npm install nebrie/nodejs-nebri-authentication --save
```
- including --save at the end will install this component and add it as a dependency in your app's package.json

<h2>Requirements</h2>
Before using any classes and associated functions in this package, you must include nebrios-authentication in your Nebri Instance and set up any authentication methods you would like to utilize. See https://github.com/nebrie/nebrios-authentication/blob/master/README.md for more information.

<h2>Public Classes</h2>
<strong>NebriTokenClient</strong><br>
This is the most basic authentication method supported. This class must be instantiated before use.
```
var nebri_auth = require('nodejs-nebri-authentication');
var token_client = new nebri_auth.NebriTokenClient('instance_name', 'token');
```
- instance name is your Nebri instance name. i.e. https://<strong>instance_name</strong>.nebrios.com
- your token must be generated on your Nebri instance using https://github.com/nebrie/nebrios-authentication

<br>
<strong>NebriBasicClient</strong>
```
var nebri_auth = require('nodejs-nebri-authentication');
var token_client = new nebri_auth.NebriBasicClient('instance_name', 'username', 'password');
```
- before using this method, a username and password combo should be saved to your Nebri instance using https://github.com/nebrie/nebrios-authentication

<br>
<strong>NebriOAuthClient</strong>
```
var nebri_auth = require('nodejs-nebri-authentication');
var token_client = new nebri_auth.NebriOAuthClient('instance_name', 'consumer_key', 'consumer_secret', 'access_token');
```
- consumer key and consumer secret should be obtained from your Nebri instance using https://github.com/nebrie/nebrios-authentication
- if you have already created an access token all arguments should be passed
- if you have not created an access token, only consumer key and consumer secret are required. this app will make the appropriate call for an access token and will save the generated token to your NebriOAuthClient instance automatically

<h2>Public Function</h2>
All classes have the same function with the same parameters.

<strong>api_request</strong>
- api_module: the name of the api module stored on your NebriOS instance
- view_name: the name of the target function contained in the given api module
- method: the desired HTTP request method
- payload: an object containing params and values, if no payload is meant to be sent, null should be passed
- callback (optional): the function to execute after a successful api request. this callback will receive all data included in your view's response.
- error_callback (optional): the function to execute after an unsuccessful api request.

<h2>Example</h2>
```
var nebri_auth = require('nodejs-nebri-authentication');
var token_client = new auth.NebriTokenClient("instance_name", "token");
token_client.api_request("nebrios_authentication", "test_endpoint", "POST", {'key': 'value'}, function(data){
    console.log('test_endpoint: ', data);
});
var basic_client = new auth.NebriBasicClient("instance_name", "username", "password");
basic_client.api_request("nebrios_authentication", "other_test", "POST", null, function(data){
    console.log('other_test: ', data);
});
var oauth_client = new auth.NebriOAuthClient("instance_name", "consumer_key", "consumer_secret", "access_token");
oauth_client.api_request("nebrios_authentication", "another_test", "POST", null, function(data){
    console.log('another_test: ', data);
});
var oauth_client_no_token = new auth.NebriOAuthClient("instance_name", "consumer_key", "consumer_secret");
oauth_client_no_token.api_request("nebrios_authentication", "another_test", "POST", null, function(data){
    console.log('another_test #2: ', data);
});
```
