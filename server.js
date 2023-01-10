const express = require("express");
const bodyParser = require("body-parser");
const roleRouter = require('./route/role');
const categoryRouter = require('./route/category');
const taskRouter = require('./route/task');
const userRouter = require('./route/user');


const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(roleRouter);
app.use(categoryRouter);
app.use(userRouter);
app.use(taskRouter);


app.listen(8080, () => {
    console.log('Listening on port 3000');
    
});