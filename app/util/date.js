'use strict';
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc'); // dependent on utc plugin
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Shanghai');

module.exports = {
  format: (date, format = 'YYYY-MM-DD') => {
    return dayjs(date).format(format);
  },
};
