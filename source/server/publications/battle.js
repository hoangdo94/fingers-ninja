/**
 * Created by hoangdo on 1/16/16.
 */
Meteor.publish('battle', function(options) {
  check(options, Object);
  return Battle.find(options.battleId);
});
// Meteor.publish('joinableBattles', function() {
//   return Battle.find({
//     endTime: {
//       $exists: false
//     }
//   });
// });
// Meteor.publish('recentBattles', function(limit) {
//   check(limit, Number);
//   return Battle.find({
//     endTime: {
//       $exists: true
//     }
//   }, {
//     sort: {
//       endTime: -1
//     },
//     limit: limit
//   });
// });

Meteor.publish('battlesMetadata', function() {
  return Battle.find({}, {
    fields: {
      'battleText': false,
      'battleTextArr': false,
      'battleLog': false
    }
  });
});

Meteor.publish('ninjaBattles', function(params) {
  check(params, Object);
  return Battle.find({
    $or: [{
      'users.0.userId': params.userId
    }, {
      'users.1.userId': params.userId
    }]
  }, {
    sort: {
      startTime: -1
    },
    limit: params.limit,
    fields: {
      'battleTextArr': false,
      'battleLog': false
    }
  });
});
