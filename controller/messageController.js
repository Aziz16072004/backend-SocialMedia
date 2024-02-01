const Messages = require("../models/message");

module.exports.getMessages = async (req, res, next) => {
    try {
      const { from, to } = req.body;
  
      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
  
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  };
  module.exports.addMessage = async (req, res, next) => {
    try {
      const { from, to, message } = req.body;
      const data = await Messages.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });
  
      if (data) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
      next(ex);
    }
  };
  module.exports.getLastMsg = async (req,res) =>{
    const { from, to } = req.query; // Use req.query to access parameters from the query string

    try {
      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ createdAt: -1 });
  
      if (messages.length > 0) {
        res.json(messages[0].message.text);
      } else {
        res.json('No messages found');
      }
    } catch (error) {
      console.error('Error in getLastMsg:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }