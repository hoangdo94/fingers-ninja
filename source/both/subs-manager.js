GlobalSubs = new SubsManager({
  // maximum number of cache subscriptions
  cacheLimit: 10,
  // any subscription will be expire after 5 minute, if it's not subscribed again
  expireIn: 2
});

ProfileBattlesSubs = new SubsManager();
