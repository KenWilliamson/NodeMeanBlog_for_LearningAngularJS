var mongoose = require('mongoose');
var mongoConnectString = "mongodb://localhost/blogpost";
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  mongoConnectString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
//mongoose.connect('mongodb://localhost/blogpost');
mongoose.connect(mongoConnectString);

var blogSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    introText: String,
    blogText: String
});

var commentSchema = new mongoose.Schema({
    commentText: String,
    blog: {type: mongoose.Schema.ObjectId, ref: blogSchema}
});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("MongoDB connection successful");
});


exports.saveBlog = function(req, res) {
    var reqBody = req.body;
    var success = false;
    var id = -1;
    console.log(reqBody);
    if (req.is('application/json')) {
        var blogJson = JSON.stringify(reqBody);
        console.log("new Blog: " + blogJson);
        var Blog = mongoose.model('Blog', blogSchema);
        var blg = new Blog(reqBody);

        blg.save(function(err) {
            if (err) {
                console.log("error: " + err);
                res.status(500);
                res.send(returnVal);
            }
        });
        success = true;
        id = blg._id;
    } else {
        res.status(415);
    }

    var returnVal = {
        "success": success,
        "id": id
    };
    res.send(returnVal);


};

exports.saveComment = function(req, res) {
     var reqBody = req.body;
    var success = false;
    var id = -1;
    console.log(reqBody);
    if (req.is('application/json')) {
        var commentJson = JSON.stringify(reqBody);
        console.log("new comment: " + commentJson);
        var Comment = mongoose.model('Comment', commentSchema);
        var cmt = new Comment(reqBody);

        cmt.save(function(err) {
            if (err) {
                console.log("error: " + err);
                res.status(500);
                res.send(returnVal);
            }
        });
        success = true;
        id = cmt._id;
    } else {
        res.status(415);
    }

    var returnVal = {
        "success": success,
        "id": id
    };
    res.send(returnVal);
};

exports.findBlogList = function(req, res) {
    var Blog = mongoose.model('Blog', blogSchema);
    Blog.find({}, function(err, results) {
        // res.send(results); for example.
        if(err){
            res.status(500);
            res.send({"success": false});
        }
        console.log("BlogList:" + JSON.stringify(results));
        res.send(results);
    });


};

exports.findBlog = function(req, res) {
    var id = req.params.id;
    if (id !== null && id !== undefined) {
        var Blog = mongoose.model('Blog', blogSchema);
        var Comment = mongoose.model('Comment', commentSchema);
        Blog.findById(id, function(err, results) {
            // res.send(results); for example.
            console.log("Blog:" + JSON.stringify(results));
            Comment.find({"blog":id}, function(err, commentResults){
                console.log("Comments:" + JSON.stringify(commentResults));
                var blog = results.toObject();
                blog.comments = commentResults;
                console.log("Blog2:" + JSON.stringify(blog));
                res.send(blog);
            });
            
        });
    }else{
        res.status(500);
        res.send({"success": false});
    }

};