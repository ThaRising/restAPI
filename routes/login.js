const express = require('express');
const auth = require("../controllers/login");

const router = express.Router();

router.route('/').post(auth);