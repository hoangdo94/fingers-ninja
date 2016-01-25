Accounts.onCreateUser((options, user) => {
  if (!options || !user) {
    return;
  } else {
    var defaultModel = NinjaModel.findOne({
      'price': 0
    });
    GameProfile.insert({
      userId: user._id,
      nickname: options.profile.nickname || 'Ninja',
      modelsOwned: [defaultModel._id],
      currentModel: defaultModel._id
    });
  }
  return user;
});
