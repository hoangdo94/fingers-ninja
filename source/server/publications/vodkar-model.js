/**
 * Created by hoangdo on 1/16/16.
 */
Meteor.publish('ninjaModels', function() {
  return NinjaModel.find({}, {sort: {'price': 1}});
});
