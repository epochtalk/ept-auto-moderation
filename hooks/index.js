var path = require('path');
var Promise = require('bluebird');
var autoModerator = require(path.normalize(__dirname + '/../autoModerator'));

function moderate(request) {
  return autoModerator.moderate(request);
}

module.exports = [
  { path: 'posts.create.pre', method: moderate }
];
