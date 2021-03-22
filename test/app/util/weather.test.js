'use strict';

const { assert } = require('egg-mock/bootstrap');
const weatherUtil = require('../../../app/util/weather');

describe('test/util/weather.test.js', () => {
  // test cases
  it('should return short report', () => {
    const apiResponse = {
      status: 'ok',
      result: {
        daily: {
          status: 'ok',
          temperature: [
            {
              date: '2021-03-16T00:00+08:00',
              max: 23.53,
              min: 17.16,
              avg: 20.98,
            },
          ],
          air_quality: {
            aqi: [
              {
                date: '2021-03-16T00:00+08:00',
                max: {
                  chn: 21,
                  usa: 21,
                },
                avg: {
                  chn: 15.69,
                  usa: 15.69,
                },
                min: {
                  chn: 12,
                  usa: 12,
                },
              },
            ],
          },
          skycon_08h_20h: [
            {
              date: '2021-03-16T00:00+08:00',
              value: 'CLEAR_DAY',
            },
          ],
        },
        primary: 0,
      },
    };

    const msg = weatherUtil.shortReport(apiResponse);
    assert(msg === '03-16 | 晴（白天） | 17 ~ 24℃ | AQI: 16 优');
  });
});
