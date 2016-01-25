Template.index.helpers({
  rankings: () => GameProfile.find({}, {sort: {'points': -1}}),
  recentBattles: () => Battle.find({endTime: {$exists: true}}),
  waitingBattles: () => Battle.find({startTime: {$exists: false}}),
  inProgressBattles: () => Battle.find({startTime: {$exists: true}, endTime: {$exists: false}})
});
