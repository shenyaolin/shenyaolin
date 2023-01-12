const resolve = require('./resolve');

const myAlias = {
  assets: resolve('../src/assets'),
  src: resolve('../src'),
  components: resolve('../src/views/components'),
  framework: resolve('../src/framework'),
  services: resolve('../src/services'),
  config: resolve('../src/config'),
  utils: resolve('../src/utils'),
  context: resolve('../src/context')
};

module.exports = myAlias;