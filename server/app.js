const express = require('express');
const morgan = require('morgan');
const toDo = require('../toDo.json');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).json('ok');
});

app.get('/api/todoItems', function(req, res) {
    res.status(200).json(toDo);
});

app.get('/api/todoItems/:number', function(req, res) {
    const id = parseInt(req.params.number);
    const item = toDo.find(item => item.todoItemId === id);
    if (item) {
        res.status(200).json(item);
    } else {
        res.status(404).json({error: 'Item not found'});
    }
});

app.post('/api/todoItems', function(req, res) {
    const newItem = req.body;
    toDo.push(newItem);
    res.status(201).json(newItem);
});

app.delete('/api/todoItems/:number', function(req, res) {
    const id = parseInt(req.params.number);
    const index = toDo.findIndex(item => item.todoItemId === id);
    if (index !== -1) {
        const deletedItem = toDo[index];
        toDo.splice(index, 1);
        res.status(200).json(deletedItem);
    } else {
        res.status(404).json({error: 'Item not found'});
    }
});

module.exports = app;
