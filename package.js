Package.describe({
  name: "levensailor:accounts-ciscospark",
  summary: "Login service for Ciscospark accounts",
  version: "1.0.0",
  git: "https://github.com/levensailor/accounts-ciscospark.git"
});

Package.onUse(function(api) {
  api.use(['underscore@1.0.9', 'random@1.0.10']);
  api.use('accounts-base@1.0.4', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base@1.0.4', ['client', 'server']);
  api.use('accounts-oauth@1.1.13', ['client', 'server']);
  api.use('levensailor:ciscospark@1.0.0', ['client', 'server']);

  api.addFiles('ciscospark_login_button.css', 'client');

  api.addFiles("ciscospark.js");
});
