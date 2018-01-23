var mongoose = require('mongoose');





var thingSchema = mongoose.Schema({}, { strict: false });



var Comment = mongoose.model('Comment',thingSchema)

module.exports=Comment
