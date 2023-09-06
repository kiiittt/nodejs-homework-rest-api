const getAll = require("./getAllContacts");
const getById = require("./getContactById");
const create = require("./addContact");
const remove = require("./removeContact");
const update = require("./updateContact");
const updateFavorite = require("./updateFavoriteContact");

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  updateFavorite,
};
