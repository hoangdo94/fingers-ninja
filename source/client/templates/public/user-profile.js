Template.userProfile.onCreated(() => {
  Template.instance().autorun(() => {
    var subsReady = FlowRouter.subsReady();
    if (subsReady) {
      if (!Meteor.users.findOne(FlowRouter.getParam('id'))) {
        BlazeLayout.render( 'default', { yield: 'notFound' } );
      }
    }
  });
});

Template.userProfile.helpers({
  userInfo: () => Meteor.users.findOne(FlowRouter.getParam('id')),
  gameProfile: () => GameProfile.findOne({userId: FlowRouter.getParam('id')}),
  isDisabled: (userId) => {
    if (userId !== Meteor.userId()){
      return "disabled";
    }
    return "";
  },
  battles: () => Battle.find(),
  opponentId: (battle) => {
    if (battle.users[0].userId === FlowRouter.getParam('id')) return battle.users[1].userId;
    return battle.users[0].userId;
  },
  battleResult: (battle) => {
    if (!battle.winnerId) return '<span style="color:gray"><b>IN PROGRESS...</b></span>';
    if (battle.winnerId === FlowRouter.getParam('id')) return '<span style="color:green"><b>WON</b></span>';
    return '<span style="color:red"><b>LOST</b></span>';
  },
  haveMoreBattles: () => true,
  shareData: () => {
    var gp = GameProfile.findOne({userId: FlowRouter.getParam('id')});
    if (gp) return {
      title: gp.nickname + '\'s profile',
      author: 'Fingers Ninja',
      description: gp.nickname + '\'s profile'
    };
    return {};
  }
});

Template.userProfile.events({
  'click .btn-pref .btn': (e) => {
    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
    $(e.currentTarget).removeClass("btn-default").addClass("btn-primary");
  },
  'blur #input-user-nickname': (e) => {
    var nickname = $(e.currentTarget).val();
    Meteor.call('updateUserNickname', {
      userId: Meteor.userId(),
      nickname: nickname
    }, (err) => {
      if (err){
        console.error(err);
        Bert.alert('Failed to update user nickname.', 'danger', 'growl-top-right');
      }
      Bert.alert('Successfully updated user nickname.', 'success', 'growl-top-right');
    });
  }
});
