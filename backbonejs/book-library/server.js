var application_root = __dirname,
	express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/library_database');

var Book = new mongoose.Schema({
	title: String,
	author: String,
	releaseDate: Date
});

var BookModel = mongoose.model('Book',Book);

var app = express();

app.use(bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);
app.use(express.static(path.join(application_root,'site')));
// app.use(express.errorHandler({dumpExceptions: true, showStack: true}));

var port = 4711;
app.listen(port, function(){
	console.log('Express server listenting on port %d in %s mode',
		port, app.settings.env)
})

app.get('/api', function(req, res){
	res.send('Library API is running');
});

app.get('/api/books', function(req,res){
	return BookModel.find(function(err,books){
		if(!err){
			return res.send(books);
		} else {
			return console.log(err);
		}
	})
})

app.post('/api/books', function(req,res){
	var book = new BookModel({
		title: req.body.title,
		author: req.body.author,
		releaseDate: req.body.releaseDate
	});

	return book.save(function(err){
		if(!err){
			console.log('created');
			return res.send(book);
		} else {
			console.log(err);
		}
	})
})