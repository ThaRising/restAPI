const express = require('express');
const { createUser, updateUser, getUser, deleteUser } = require('../controllers/users');

const router = express.Router();

router.route('/').post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
