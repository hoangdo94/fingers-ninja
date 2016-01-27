Template.userProfile.onCreated(() => {
  //battles count
  var userId = FlowRouter.getParam('id');
  Meteor.call('userBattlesCount', {userId: userId}, function(err,c) {
    Session.set(userId + '_battlesCount', c);
  });
  //battles limit
  var limit = Session.get(userId + '_battlesLimit');
  if (!limit) {
    limit = 5;
    Session.set(userId + '_battlesLimit', limit);
  }
  ProfileBattlesSubs.subscribe('ninjaBattles', {userId: userId, limit: limit});
  //Subs
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
  canChangeNickname: (userId) => {
    if (userId === Meteor.userId()){
      return true;
    }
    return false;
  },
  battles: () => Battle.find({
    $or: [{
      'users.0.userId': FlowRouter.getParam('id')
    }, {
      'users.1.userId': FlowRouter.getParam('id')
    }]
  }, {
    sort: {startTime: -1}
  }),
  opponentId: (battle) => {
    if (battle.users[0].userId === FlowRouter.getParam('id')) return battle.users[1].userId;
    return battle.users[0].userId;
  },
  battleResult: (battle) => {
    if (!battle.winnerId) return '<span style="color:gray"><b>IN PROGRESS...</b></span>';
    if (battle.winnerId === FlowRouter.getParam('id')) return '<span style="color:green"><b>WON</b></span>';
    return '<span style="color:red"><b>LOST</b></span>';
  },
  hasMoreBattles: (battles) => {
    var userId = FlowRouter.getParam('id');
    var total = Session.get(userId + '_battlesCount');
    return (battles.count() < total);
  },
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
  'click #change-nickname': (e) => {
    var nickname = prompt('New nickname');
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
  },
  'input .filter-opponent': (e) => {
    var t = $(e.target).val().toLowerCase();
    if (!t) {
      $('.battle-item').fadeIn();
    } else {
      $('.battle-item').each(function() {
        var op = $(this).attr('data-opponent').toLowerCase();
        if (op.indexOf(t) !== - 1) {
          $(this).fadeIn();
        } else {
          $(this).fadeOut();
        }
      });
    }
  },
  'click .btn-more': (e) => {
    var userId = FlowRouter.getParam('id');
    var sessionParam = userId + '_battlesLimit';
    var currentLimit = Session.get(sessionParam);
    Session.set(sessionParam, currentLimit + 5);
    ProfileBattlesSubs.subscribe('ninjaBattles', {userId: userId, limit: currentLimit + 5});
    $('.filter-opponent').val('');
    $('.battle-item').show();
  }
});

Template.userProfile.onRendered(() => {

});
