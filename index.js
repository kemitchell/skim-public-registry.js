var PassThrough = require('readable-stream').PassThrough
var https = require('https')
var queryString = require('querystring').stringify

module.exports = function(since) {
  var returned = new PassThrough()
  var query =
    { heartbeat: '30000',
      include_docs: 'true',
      feed: 'continuous' }
  if (since) { query.since = since }
  var options =
    { host: 'skimdb.npmjs.com',
      path: '/registry/_changes?' + queryString(query) }
  https.get(options, function(response) {
    response.pipe(returned) })
    .on('error', function(error) {
      returned.emit('error', error) })
  return returned }
