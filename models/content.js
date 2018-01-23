var mongoose = require('mongoose');




var contentSchema = mongoose.Schema({

    title:{
        type:String,
       required:true,
        trim:true,

    },
    content:{
       type:String,
       required:true,       
       trim:true  
    },
    cimage:{
       required:true,        
        type:String,
        
    },
    data:{
        type:Date,
        default:Date.now
    }


})

//var thingSchema = mongoose.Schema({}, { strict: false });



var Content = mongoose.model('Content',contentSchema)

module.exports=Content
