var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to db 
mongoose.connect('mongodb://admin:Achintya2@ds151614.mlab.com:51614/todo', { useNewUrlParser: true });
//Create a schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'kick ass' }];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

    app.get('/todo', function (req, res) {
        //get data from mongodb and pass it to view
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function (req, res) {
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        });
        //data.push(req.body);
        //res.json(data);
    });

    app.delete('/todo/:item', function (req, res) {
        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });
        // data = data.filter(function (todo) {
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json({todos: data});
    });
};