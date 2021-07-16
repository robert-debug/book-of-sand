const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, sender } = req.body;
    if (sender && senderId !== sender.id){
    //making sure the sender is the sender
      return res.sendStatus(401);
    }
    let conversationId;
    // getting the conversation, if their is one
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    } else {
      // this no longer uses the conversationId sent from the socket, to avoid third users posting to chats, but rather just uses conversation ID from db
      conversationId = conversation.id;
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    } 


    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
