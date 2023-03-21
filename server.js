const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

require('colors');
require('./database/connect');

app.use(bodyParser.json());

router.get('/init', require('./routers/init'));
router.get('/login', require('./routers/login'));

app.use('/api', router);

app.listen(5555, () => {
  console.log('[Successfully] '.green + `Server started in 5555.`);
});
