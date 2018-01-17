Package.describe({
  summary: "Login service for Ciscospark accounts",
  version: "1.0.0",
  git: "https://github.com/levensailor/accounts-ciscospark.git"
});

Package.onUse(function(api) {
  api.use(['underscore', 'random']);
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('ciscospark', ['client', 'server']);

  api.addFiles('ciscospark_login_button.css', 'client');

  api.addFiles("ciscospark.js");
});
