const router = require("express").Router();
const historyController = require("../controllers/history.controller");

router.get("/", historyController.getHistory);
router.get("/all", historyController.getAllHistory);
router.get("/title-dashboad", historyController.getTitleHistory);
router.get("/:id", historyController.getDetailedHistory);

module.exports = router;
