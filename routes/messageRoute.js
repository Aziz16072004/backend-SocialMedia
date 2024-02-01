const { addMessage, getMessages,getLastMsg } = require("../controller/messageController");
const router = require("express").Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);
router.get("/getLastMsg", getLastMsg);

module.exports = router;