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
      const message = await Message.create({ senderId, text, conversationId, unread: true });
      return res.json({ message, sender });
    } 


    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      unread: true
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, sender } = req.body;
    if (sender && senderId !== sender.id){
    //making sure the sender is the sender
      return res.sendStatus(401);;
    }
    let conversationId;
    // getting the conversation, if their is one
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      console.log('Cannot update read status without logged in user')
      return res.sendStatus(405);
    } else {
      // this no longer uses the conversationId sent from the socket, to avoid third users posting to chats, but rather just uses conversation ID from db
      conversationId = conversation.id;
      const messages = await Message.findAll({
        where:{ conversationId, unread: true }
      });
      messages.forEach(async (message) =>{
        message.unread = false;
        await message.save()
      })
      return res.json({ unread: false });
    } 

  } catch (error) {
    next(error);
  }
});

module.exports = router;
