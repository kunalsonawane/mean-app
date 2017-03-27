var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db=null;
var MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.json());

app.use(express.static('public'));

MongoClient.connect("mongodb://localhost:27017/mittens", function(err,dbconn){
		if(!err){
			console.log("We are connected");
			db = dbconn;
			}

	});


app.get('/meows', function(req, res, next){
	db.collection('event', function(err,meowsCollection){
		meowsCollection.find().toArray(function(err,meows){
			return res.json(meows);
		});
	});	

});

app.get('/getallusers', function(req, res, next){
	db.collection('users', function(err,meowsCollection){
		meowsCollection.find().toArray(function(err,m){
			return res.json(m);
		});
	});	

});





app.post('/meows', function(req, res, next){

	db.collection('meows', function(err, meowsCollection){
	var newMeow = {
		text: req.body.newMeow
	};
	meowsCollection.insert(newMeow,{w:1}, function(err){
		return res.send();
	});

});

	
});


app.post('/user', function(req, res, next){

	db.collection('users', function(err, meowsCollection){
	
	meowsCollection.insert({name:req.body.username, pwd:req.body.password}, function(err){
		return res.send();
	});

});
});

app.post('/events', function(req, res, next){

	db.collection('event', function(err, meowsCollection){
	 console.log(req.body.event_city);
	meowsCollection.insert({event_name:req.body.event_name,
				                        event_city:req.body.event_city,
				                        event_description:req.body.event_description,
				                         event_type:req.body.event_type,event_image:req.body.event_image,
				                         event_lattitude:req.body.event_lattitude,
				                         event_longitude:req.body.event_longitude,
				                         event_pincode:req.body.event_pincode}, function(err){
				                             console.log(req.body.event_city);
		return res.send();
	});

});


	
});

app.post('/userlogin', function(req, res, next){

	db.collection('users', function(err, meowsCollection){
	
meowsCollection.find({name:req.body.username, pwd:req.body.password}).toArray(function(err,m){
			return res.json(m);
		});

		
	});

});

app.post('/remove', function(req, res, next){

	db.collection('event', function(err, meowsCollection){
	
meowsCollection.remove({event_name:req.body.newMeow}).toArray(function(err,m){
			return res.json(m);
		});

		
	});

});
	
app.get('/geteventbyname', function(req, res, next){
	db.collection('event', function(err,meowsCollection){
		meowsCollection.findOne({event_name:req.body.event_to_update}).toArray(function(err){
			return res.send();
		});
	});	

});
	

app.post('/geteventbyname', function(req, res, next){
	db.collection('event', function(err,meowsCollection){
	
		meowsCollection.findOne({event_name:req.body.event_to_update}, function(err,response){
			console.log(response);
			return res.json(response);
		});
	});	

});	

app.post('/updateevent', function(req, res, next){
	db.collection('event', function(err,meowsCollection){
	console.log("bofof "+req.body.description);
	meowsCollection.update({event_name:req.body.event_to_update},{
										$set:{
				                        event_city:req.body.event_city,
				                        event_description:req.body.event_description,
				                         event_type:req.body.event_type,event_image:req.body.event_image,
				                         event_lattitude:req.body.event_lattitude,
				                         event_longitude:req.body.event_longitude,
										event_pincode:req.body.event_pincode}
										}, function(err){
				                             console.log(req.body.event_city);
		return res.send();
	});
	});	

});	

app.listen(2000,function(){
	console.log('Running on 2000');

});
