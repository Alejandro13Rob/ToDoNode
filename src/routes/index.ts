import { Router } from 'express';

const router = Router();

// REST stuff
router.get('/', (request, response) => {
  /*TodoTask.find({}, (err, tasks) => {
        response.render("todo.ejs", { todoTasks: tasks });
    });*/
  response.render('todo.ejs');
});
router.get('/about', function (req, res) {
  res.send('About Success!');
});

router.post('/', async (request, response) => {
  /*const todoTask = new todoModel({ content: request.body.content });
    try {
        await todoTask.save();
        response.redirect("/");
    } catch (err) {
        response.redirect("/");
    }*/
  // response.send('ToDo App Post working');
  console.log(request.body);
  response.json(request.body);
});

module.exports = router;
