import { Router } from 'express';

const router = Router();

router.get('/', function (request, response) {
    response.send('Users Index Page');
});

router.get('/todos', function (request, response) {
    response.send('Users ToDos Page');
});

module.exports = router;