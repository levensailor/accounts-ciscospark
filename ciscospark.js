Accounts.oauth.registerService('ciscospark');

if (Meteor.isClient) {
  Meteor.loginWithCiscospark = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    if (typeof Accounts._options.restrictCreationByEmailDomain === 'string') {
      options = _.extend({}, options || {});
      options.loginUrlParameters = _.extend({}, options.loginUrlParameters || {});
      options.loginUrlParameters.hd = Accounts._options.restrictCreationByEmailDomain;
    }
    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Ciscospark.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: _.map(
      // publish access token since it can be used from the client (if
      // transmitted over ssl or on
      // localhost). https://developer.ciscospark.com/authentication.html
      // refresh token probably shouldn't be sent down.
      Ciscospark.whitelistedFields.concat(['accessToken', 'expiresAt']), // don't publish refresh token
      function (subfield) { return 'services.ciscospark.' + subfield; }),

    forOtherUsers: _.map(
      // even with autopublish, no legitimate web app should be
      // publishing all users' emails
      _.without(Ciscospark.whitelistedFields, 'emails'),
      function (subfield) { return 'services.ciscospark.' + subfield; })
  });
}
