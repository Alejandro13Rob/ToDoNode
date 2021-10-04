import * as express from 'express';
const helmet = require('helmet');
const todoModel = require('./datasources/mongoModel');

const createServer = () => {
    const app = express();
    app.enable('trust proxy');
    app.use(express.json());
    app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
    // CSS stuff
    app.use("/static", express.static("public"));
    app.use(express.urlencoded({ extended: true }));
    app.set("view engine", "ejs");
    // REST stuff
    app.get('/', (request, response) => {
        /*TodoTask.find({}, (err, tasks) => {
            response.render("todo.ejs", { todoTasks: tasks });
        });
        response.render("todo.ejs", { todoTasks: tasks });*/
    });

    app.post('/', async (request, response) => {
        const todoTask = new todoModel({ content: request.body.content });
        try {
            await todoTask.save();
            response.redirect("/");
        } catch (err) {
            response.redirect("/");
        }
        // response.send('ToDo App Post working');
        console.log(request.body);
        response.json(request.body);
    });

    return { app };
};

export { createServer };