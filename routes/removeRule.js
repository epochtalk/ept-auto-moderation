var Joi = require('joi');
var Boom = require('boom');
var path = require('path');
var db = require(path.normalize(__dirname + '/../db'));
var autoModerator = require(path.normalize(__dirname + '/../autoModerator'));

function auth(request, reply) {
  var promise = request.server.authorization.build({
    error: Boom.forbidden(),
    type: 'hasPermission',
    server: request.server,
    auth: request.auth,
    permission: 'autoModeration.removeRule.allow'
  });

  return reply(promise);
}

module.exports = {
  method: 'DELETE',
  path: '/api/automoderation/rules/{id}',
  config: {
    auth: { strategy: 'jwt' },
    validate: { params: { id: Joi.string().required() } },
    pre: [ { method: auth } ]
  },
  handler: function(request, reply) {
    var ruleId = request.params.id;
    var promise = db.removeRule(ruleId)
    .tap(function() { autoModerator.removeRule(ruleId); });
    return reply(promise);
  }
};
