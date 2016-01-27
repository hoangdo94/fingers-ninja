Meteor.methods({
  userBattlesCount( params ) {
    check( params, Object );
    return Battle.find({
      $or: [{
        'users.0.userId': params.userId
      }, {
        'users.1.userId': params.userId
      }]
    }).count();
  }
});
