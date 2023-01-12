const path = require('path');
module.exports = function (target) {
  return path.resolve(__dirname, target);
};
