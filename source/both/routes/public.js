const publicRoutes = FlowRouter.group({
  name: 'public'
});

publicRoutes.route( '/', {
  name: 'index',
  action() {
    BlazeLayout.render( 'default', { yield: 'index' } );
  },
  subscriptions() {
    this.register('battlesMetadataSubs', GlobalSubs.subscribe('battlesMetadata'));
  }
});

publicRoutes.route( '/signup', {
  name: 'signup',
  action() {
    BlazeLayout.render( 'default', { yield: 'signup' } );
  }
});

publicRoutes.route( '/login', {
  name: 'login',
  action() {
    BlazeLayout.render( 'default', { yield: 'login' } );
  }
});

publicRoutes.route( '/recover-password', {
  name: 'recover-password',
  action() {
    BlazeLayout.render( 'default', { yield: 'recoverPassword' } );
  }
});

publicRoutes.route( '/reset-password/:token', {
  name: 'reset-password',
  action() {
    BlazeLayout.render( 'default', { yield: 'resetPassword' } );
  }
});

publicRoutes.route( '/user/:id' , {
  name: 'user-profile',
  action(params, queryParams) {
    BlazeLayout.render( 'default', { yield: 'userProfile', userId: params.id } );
  },
  subscriptions(params) {
    this.register('userProfileSubs', GlobalSubs.subscribe('userProfile', {userId: params.id}));
    // this.register('ninjaBattlesSubs', GlobalSubs.subscribe('ninjaBattles', {userId: params.id, limit: 5}));
  }
});

publicRoutes.route( '/battle/:id' , {
  name: 'battle',
  action(params) {
    BlazeLayout.render( 'default', { yield: 'battle', battleId: params.id } );
  },
  subscriptions(params) {
    this.register('battleSubs', GlobalSubs.subscribe('battle', {battleId: params.id}));
  },
  triggersExit: [(context) => {
    Meteor.call('leaveBattle', {
      battleId: context.params.id,
      userId: Meteor.userId(),
      wordsMissed: total - correct
    });
  }]
});
