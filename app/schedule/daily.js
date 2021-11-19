'use strict';
/**
 * Daily report: weather
 * Send report email every morning at 8:00
 */
const weatherUtil = require('../util/weather');

module.exports = {
  schedule: {
    type: 'worker',
    cron: '0 30 7 * * *',
  },
  async task(ctx) {
    const res = await ctx.service.weather.daily({
      lat: 31.242727,
      lng: 121.497125,
    });
    const msg = weatherUtil.shortReport(res);
    const mailto = 'rainkolwa@gmail.com';
    const subject = 'Daily Weather Report';
    ctx.service.email.send({ mailto, subject, body: msg });
  },
  disable: true,
};
