const Message = require('../models/Message');
const User = require('../models/user');
const axios = require('axios');

exports.sendMessage = async (req, res) => {
  const { recipientId, message } = req.body;

  try {
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ msg: 'Recipient not found' });
    }

    if (recipient.status === 'BUSY') {
      try {
        const response = await axios.post('YOUR_LLM_API_ENDPOINT', {
          prompt: message,
        }, { timeout: 10000 });

        const aiMessage = response.data.answer || "User is busy, and the AI couldn't generate a response.";
        const newMessage = new Message({
          sender: req.user.id,
          recipient: recipientId,
          message: aiMessage,
        });

        await newMessage.save();
        return res.json(newMessage);
      } catch (error) {
        const fallbackMessage = 'User is busy and unavailable at the moment.';
        const newMessage = new Message({
          sender: req.user.id,
          recipient: recipientId,
          message: fallbackMessage,
        });

        await newMessage.save();
        return res.json(newMessage);
      }
    } else {
      const newMessage = new Message({
        sender: req.user.id,
        recipient: recipientId,
        message,
      });

      await newMessage.save();
      return res.json(newMessage);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getMessages = async (req, res) => {
  const { recipientId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: recipientId },
        { sender: recipientId, recipient: req.user.id },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
