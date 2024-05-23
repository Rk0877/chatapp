const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/chatController');
const auth = require('../middlewares/auth');

// @route    POST api/chat/send
// @desc     Send a message
// @access   Private
router.post('/send', auth, sendMessage);

// @route    GET api/chat/messages/:recipientId
// @desc     Get messages with a recipient
// @access   Private
router.get('/messages/:recipientId', auth, getMessages);

module.exports = router;
