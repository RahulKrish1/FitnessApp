const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress.controller');

const auth = require('../middleware/auth');
const { addProgressValidator } = require('../middleware/validation');



router.post('/',auth('createAny','progress'),addProgressValidator, progressController.createProgress)

router.route('/progress/:id')
.get(auth('readAny','progress'),progressController.getProgressById)
.patch(auth('updateAny','progress'),progressController.updateProgressById)
.delete(auth('deleteAny','progress'),progressController.deleteProgressById)

router.route('/users/progress/:id')
.get(progressController.getUsersProgressById)

router.route('/all')
.get(progressController.getAllProgress)
.post(progressController.getMoreProgress)

router.post('/admin/paginate',auth('readAny','progress'),progressController.adminPaginate)


module.exports = router;