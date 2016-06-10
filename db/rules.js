var path = require('path');
var dbc = require(path.normalize(__dirname + '/db'));
var db = dbc.db;
var helper = dbc.helper;

module.exports = function() {
  var q = `SELECT * FROM auto_moderation`;
  return db.sqlQuery(q).then(helper.slugify);
};
