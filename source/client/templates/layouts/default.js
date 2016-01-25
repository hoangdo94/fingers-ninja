const handleRedirect = (routes, redirect) => {
  let currentRoute = FlowRouter.getRouteName();
  if (routes.indexOf(currentRoute) > -1) {
    FlowRouter.go(redirect);
    return true;
  }
};

Template.default.helpers({
  subscribing() {
      return !FlowRouter.subsReady();
    },
    loggingIn() {
      return Meteor.loggingIn();
    },
    authenticated() {
      return !Meteor.loggingIn() && Meteor.user();
    },
    redirectAuthenticated() {
      return handleRedirect([
        'login',
        'signup',
        'recover-password',
        'reset-password'
      ], '/');
    },
    redirectPublic() {
      return handleRedirect([
        'ninja-shop',
        'create-battle',
      ], '/login');
    }
});
