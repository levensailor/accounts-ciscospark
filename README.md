# accounts-ciscospark

A login service for Cisco Spark.

To install: **meteor add levensailor:accounts-ciscospark**

example usage:

//project/server/lib/config/accounts.js

Meteor.startup(function() {

  ServiceConfiguration.configurations.update(
    { service: "ciscospark" },
    { $set: {
        clientId: process.env.clientId,
        secret: process.env.secret
      }
    },
    { upsert: true }
  );

  Accounts.onCreateUser((options, user) => {
    const { avatar, emails, displayName } = user.services.ciscospark;
    user.profile = {};
    user.profile.fullname = displayName;
    user.profile.emailBuffer = emails;
    user.profile.avatarUrl = avatar;
    user.username = emails[0];
    user.profile.initials = displayName.match(/[A-Z]/g).join("");
    return user;
  });
});

