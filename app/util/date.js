'use strict';
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc'); // dependent on utc plugin
const timezone = require('dayjs/plugin/timezone');
const TIMEZONE = 'Asia/Shanghai';
dayjs.extend(utc);
dayjs.extend(timezone);

module.exports = {
  format: (date, format = 'YYYY-MM-DD') => {
    return dayjs(date).tz(TIMEZONE).format(format);
  },
};
