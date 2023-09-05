const express = require("express");
const jsonParse = express.json();
const router = express.Router();
const ContactController = require("../../controllers/contacts");

router.get("/", ContactController.getAll);

router.get("/:contactId", ContactController.getById);

router.post("/", jsonParse, ContactController.create);

router.delete("/:contactId", ContactController.remove);

router.put("/:contactId", jsonParse, ContactController.update);

router.patch(
  "/:contactId/favorite",
  jsonParse,
  ContactController.updateFavorite
);

module.exports = router;
