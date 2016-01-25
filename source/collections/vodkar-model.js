/**
 * Created by hoangdo on 1/16/16.
 */
NinjaModel = new Meteor.Collection('ninjaModel');

NinjaModel.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

NinjaModel.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let NinjaModelSchema = new SimpleSchema({
  "title": {
    type: String
  },
  "imageUrl": {
    type: String
  },
  "price": {
    type: Number
  }
});

NinjaModel.attachSchema(NinjaModelSchema);
