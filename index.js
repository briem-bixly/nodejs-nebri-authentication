var nebri = require('nodejs-nebri');

function NebriToken(instance_name, token){
    this.instanceName = instance_name;
    this.token = token;
}
NebriToken.prototype = new nebri.NebriClient();
NebriToken.prototype.parent = nebri.NebriClient.prototype;
NebriToken.prototype.api_request = function(api_module, view_name, method, payload, callback, error_callback) {
    if (payload == undefined || payload == null){
        payload = {'token': this.token};
    } else {
        payload['token'] = this.token;
    }
    this.parent.api_request.call(this, api_module, view_name, method, payload, callback, error_callback);
};
function NebriBasic(instance_name, username, password){
    this.instanceName = instance_name;
    this.username = username;
    this.password = password;
}
NebriBasic.prototype = new nebri.NebriClient();
NebriBasic.prototype.parent = nebri.NebriClient.prototype;
NebriBasic.prototype.api_request = function(api_module, view_name, method, payload, callback, error_callback) {
    if (payload == null || payload == undefined){
        payload = {basic_auth: {user: this.username, pass: this.password}};
    } else {
        payload['basic_auth'] = {user: this.username, pass: this.password};
    }
    this.parent.api_request.call(this, api_module, view_name, method, payload, callback, error_callback);
};
function NebriOAuth(instance_name, consumer_key, consumer_secret, access_token){
    this.instanceName = instance_name;
    this.consumer_key = consumer_key;
    this.consumer_secret = consumer_secret;
    if (access_token == undefined) {
        console.log('no access token');
        var params = {'key': this.consumer_key, 'secret': this.consumer_secret};
        var me = this;
        this.parent.api_request.call(this, "nebrios_authentication", "get_oauth_token", "POST", params, function(data){
            try{
                data = JSON.parse(data);
            } catch (e) {
                //pass, already in JSON
            }
            if (data == "<class 'core.http.HttpResponseForbidden'>"){
                console.log("Consumer Key or Consumer Secret are incorrect.");
            }
            me.access_token = data['access_token'];
        });
    } else {
        this.access_token = access_token;
    }
}
NebriOAuth.prototype = new nebri.NebriClient();
NebriOAuth.prototype.parent = nebri.NebriClient.prototype;
NebriOAuth.prototype.api_request = function(api_module, view_name, method, payload, callback, error_callback) {
    if (payload == null || payload == undefined){
        payload = {'access_token': this.access_token};
    } else {
        payload['access_token'] = this.access_token;
    }
    console.log(payload);
    this.parent.api_request.call(this, api_module, view_name, method, payload, callback, error_callback);
};

module.exports.NebriTokenClient = NebriToken;
module.exports.NebriBasicClient = NebriBasic;
module.exports.NebriOAuthClient = NebriOAuth;