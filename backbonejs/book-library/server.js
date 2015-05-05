var application_root = __dirname,
	express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/library_database');

var Keywords = new mongoose.Schema({
    keyword: String
});

var Book = new mongoose.Schema({
	title: String,
	author: String,
	releaseDate: Date,
	keywords: [ Keywords ]
});

var BookModel = mongoose.model('Book', Book);

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

app.post( '/api/books', function( request, response ) {
    var book = new BookModel({
        title: request.body.title,
        author: request.body.author,
        releaseDate: request.body.releaseDate,
        keywords: request.body.keywords       // NEW
    });
    book.save( function( err ) {
        if( !err ) {
            console.log( 'created' );
            return response.send( book );
        } else {
            return console.log( err );
        }
    });
});


app.get( '/api/books/:id', function( request, response ) {
    return BookModel.findById( request.params.id, function( err, book ) {
        if( !err ) {
            return response.send( book );
        } else {
            return console.log( err );
        }
    });
});

app.put( '/api/books/:id', function( request, response ) {
    console.log( 'Updating book ' + request.body.title );
    return BookModel.findById( request.params.id, function( err, book ) {
        book.title = request.body.title;
        book.author = request.body.author;
        book.releaseDate = request.body.releaseDate;
        book.keywords = request.body.keywords; // NEW

        return book.save( function( err ) {
            if( !err ) {
                console.log( 'book updated' );
            } else {
                console.log( err );
            }
            return response.send( book );
        });
    });
});

app.delete( '/api/books/:id', function( request, response ) {
    console.log( 'Deleting book with id: ' + request.params.id );
    return BookModel.findById( request.params.id, function( err, book ) {
        return book.remove( function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});


