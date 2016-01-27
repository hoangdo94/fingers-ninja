FlowRouter.notFound = {
  action() {
    BlazeLayout.render( 'default', { yield: 'notFound' } );
  }
};
FlowRouter.subscriptions = function() {
  this.register('usersGameProfileSubs', GlobalSubs.subscribe('usersGameProfile'));
  this.register('ninjaModelsSubs', GlobalSubs.subscribe('ninjaModels'));
};
