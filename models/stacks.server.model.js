var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Stacks = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  client: {
    type: Schema.ObjectId,
    ref: 'Client',
    default: null
  },
  name: String,
  facebookId: String
});

module.exports = mongoose.model('Stack', Stacks);