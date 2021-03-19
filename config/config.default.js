/* eslint valid-jsdoc: "off" */

'use strict';
require('dotenv').config();

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1616120968794_2553';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
  };
  // error handling
  config.onerror = {
    all(err, ctx) {
      ctx.status = err.status || 500;

      ctx.body = {
        code: ctx.status,
        success: false,
        message: err.message,
      };
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
