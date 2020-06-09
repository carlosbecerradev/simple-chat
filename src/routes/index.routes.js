const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    // res.send('Hello madafaka');
    res.render('index')
});

module.exports = router;