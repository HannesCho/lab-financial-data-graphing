const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/index", (req, res, next) => {
  console.log(req.query);
  res.render("index");
});

module.exports = router;
