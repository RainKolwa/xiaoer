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

  config.middleware = [ 'errorHandler' ];
  config.errorHandler = {
    match: '/api',
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

  config.security = {
    csrf: {
      enable: false,
    },
  };
  // validate
  config.validate = {
    convert: true,
  };

  // alicloud
  config.alicloud = {
    accessKeyId: process.env.ACCESS_KEY_ID,
    accessKeySecret: process.env.ACCESS_KEY_SECRET,
    accountName: process.env.ACOUNT_NAME,
  };
  // caiyun
  config.caiyun = {
    token: process.env.CAIYUN_TOKEN,
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
