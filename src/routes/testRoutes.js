const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

router.get("/test", auth, (req, res) => {
  res.json({
    message: "You accessed a test route",
    user: req.user,
  });
});

module.exports = router;
