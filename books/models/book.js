var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
    title: String,
    author: String,
    numPages: Number
  });
  
// Memory only virtual to remove prefix underscores
BookSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

// Set Vurtuals to remove prefix __
BookSchema.set('toObject', {
  virtuals: true
});

// DR. Leverage vertuals to remove underscore prefixes from ID this only haooens in memory not in the DB
BookSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
}


module.exports = mongoose.model('book', BookSchema);