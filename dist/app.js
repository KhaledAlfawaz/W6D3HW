"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const data = require('./data.json');
app.use(express_1.default.json());
app.get('/users', (req, res) => {
    res.json(data);
});
app.delete('/users/', (req, res) => {
    const name = req.body.name;
    res.json(data.filter((e) => e.name !== name));
});
app.post('/users', (req, res) => {
    if (req.body.name === undefined || req.body.age === undefined) {
        res.send('please enter a name and age').end();
    }
    else {
        const name = req.body.name;
        const age = req.body.age;
        const obj = {
            name: name,
            age: age
        };
        data.push(obj);
        res.send(data);
    }
});
app.put('/users', (req, res) => {
    if (req.body.age === undefined) {
        res.send('please enter the new age');
    }
    else {
        data.find((e) => {
            if (e.name === req.body.name) {
                e.age = req.body.age;
            }
        });
        res.json(data);
    }
});
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
