#!/bin/env node
var express = require('express');
var fs = require('fs');

var un = 'node';//change this to something private
var pw = 'password';//change this to something private

var blogPost = require('./db/blog');



var nodeBlog = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;


        if (typeof self.ipaddress === "undefined") {
            //  Log errors but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        }
        ;
    };




    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig) {
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating sample app ...',
                    Date(Date.now()), sig);
            process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()));
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function() {
        //  Process on exit and signals.
        process.on('exit', function() {
            self.terminator();
        });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
            'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() {
                self.terminator(element);
            });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {

        self.app = express();        
        self.app.use(express.logger('dev'));
        self.app.use(express.bodyParser());
        self.app.use(express.static(__dirname + '/public'));
        var auth = express.basicAuth(un, pw);




        self.app.get('/NodeBlog/test', auth, function(req, res) {
            //var w = test();
            res.send([{code: 2, name: "ken"}, {name: 'wine2'}]);
        });

        self.app.post('/NodeBlog/blog', auth, blogPost.saveBlog);
        self.app.post('/NodeBlog/comment', auth, blogPost.saveComment);
        self.app.get('/NodeBlog/blogList', blogPost.findBlogList);
        self.app.get('/NodeBlog/blog/:id', blogPost.findBlog);
        self.app.post('/NodeBlog/login', function(req, res) {
            var reqBody = req.body;
            var auth = false;
            if (!req.is('application/json')) {
                res.status(415);
            } else {
                if (reqBody.username === un && reqBody.password === pw) {
                    auth = true;
                }
            }
            var returnVal = {
                "authenticated": auth
            };
            res.send(returnVal);

        });
        self.app.post('/NodeBlog/blogTest', function(req, res) {
            var reqBody = req.body;
            console.log("new Blog: " + JSON.stringify(reqBody));
            res.json(req.body);
        });
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();        
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                    Date(Date.now()), self.ipaddress, self.port);
        });
    };



};



/**
 *  main():  Main code.
 */
var zapp = new nodeBlog();
zapp.initialize();
zapp.start();

