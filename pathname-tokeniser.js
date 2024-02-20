/**
 * Pathname Tokeniser
 * Scope       : Before Load Rules
 * Occurrence  : Run Always
 * Condition   : ut.event equals (ignore case) view
 * Description : Create default _pathname* values
 */

var parts = b['dom.pathname'].slice(1).split('/');
for (var i = 0; i < parts.length; i++) {
  var key = '_pathname' + (i + 1);
  b[key] = parts[i];
}
