'use strict';

const Service = require('egg').Service;

class WeatherService extends Service {
  constructor(ctx) {
    super(ctx);
    const { caiyun } = this.app.config;
    this.baseUrl = `https://api.caiyunapp.com/v2.5/${caiyun.token}`;
  }
  async daily({ lat, lng }) {
    const { ctx, logger } = this;
    const url = `${this.baseUrl}/${lng},${lat}/daily.json`;
    logger.info('call caiyun api', url);
    try {
      const res = await ctx.curl(url, { dataType: 'json' });
      return res.data;
    } catch (err) {
      logger.error(err);
      return {
        status: 'failed',
      };
    }
  }
}
module.exports = WeatherService;
