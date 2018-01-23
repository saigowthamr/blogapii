var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors')
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express()
var Content = require('./models/content')
var Comment = require('./models/comment');

var storage =multer.diskStorage({
    destination:function(req,file,cb){
   cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
     cb(null,new Date().toISOString()+file.originalname)
    }
})


var port = process.env.PORT || 3000

var upload = multer({storage:storage})


app.use(cors())

app.use(express.static(__dirname+'/uploads'))




app.use(bodyParser.urlencoded({
    extended: true
}))


app.use(bodyParser.json())

mongoose.Promise = global.Promise;

//connect to  the Mongoose //get rid of the depricated warning
mongoose.connect('mongodb://test:test@ds133597.mlab.com:33597/sainode')
    .then(() => {
        console.log('Mlabs Connected')
    }).catch(err => {
        console.log(err)
    })




app.get('/',(req,res)=>{

      Content.find({}).then((data)=>{
        //   console.log(data)
          res.send(data)
      }).catch(err=>{
          res.send(err)
      })


})

app.post('/s',upload.single('cimage'),(req,res)=>{
       
   
    var sai = Content({
        title:req.body.title,
        content:req.body.content,
        cimage:req.file.path
    })
      

    sai.save().then((data)=>{
        
        res.status(200).json({'item': 'Item added successfully'});

    }).catch(err=>{
        res.send(err)
    })

})

    app.get('/post/:id',(req,res)=>{
         
         Content.findOne({_id:req.params.id})
         .then(data=>{
             res.status(200).send(data)
         }).catch(err=>{
             res.status(404).json({'error':'Not found'})
         })
    })

app.delete('/delete/:id',(req,res)=>{

      Content.findByIdAndRemove({_id:req.params.id})
      .then((data)=>{
          res.status(200).json({'item':'Succesfully deleted'})
      }).catch(err=>{
          res.send(404).json({'err':"Error while deleteing"})
      })
})

app.post('/comments',(req,res)=>{
    var comments=Comment({
        comment:req.body.comment,
        Date:Date.now()
    }
    )
      comments.save().then(data=>{
          console.log(data)
          res.send(data)
      })
})

app.get('/comments',(req,res)=>{
    Comment.find({})
    .then(data=>{

        res.status(200).send(data)
    }).catch(err=>{
        res.status(404).json({'error':'Error Occured'})
    })
})


app.listen(port,function(){
    console.log('connected')
})