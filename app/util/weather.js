'use strict';
// 雷达降水强度	降水量 mm／h	天气现象
// <0.031	<0.08	无雨／雪
// 0.031～0.25	0.08~3.44	小雨／雪
// 0.25～0.35	3.44~11.33	中雨／雪
// 0.35～0.48	11.33~51.30	大雨／雪
// >=0.48	>=51.30	暴雨／雪

const dateUtil = require('./date');
const SKYCON = {
  CLEAR_DAY: '晴（白天）',
  CLEAR_NIGHT: '晴（夜间）',
  PARTLY_CLOUDY_DAY: '多云（白天）',
  PARTLY_CLOUDY_NIGHT: '多云（夜间）',
  CLOUDY: '阴',
  LIGHT_HAZE: '轻度雾霾',
  MODERATE_HAZE: '中度雾霾',
  HEAVY_HAZE: '重度雾霾',
  LIGHT_RAIN: '小雨',
  MODERATE_RAIN: '中雨',
  HEAVY_RAIN: '大雨',
  STORM_RAIN: '暴雨',
  FOG: '雾',
  LIGHT_SNOW: '小雪',
  MODERATE_SNOW: '中雪',
  HEAVY_SNOW: '大雪',
  STORM_SNOW: '暴雪',
  DUST: '浮尘',
  SAND: '沙尘',
  WIND: '大风',
};
const getAQIDesc = value => {
  if (value < 50) {
    return '优';
  } else if (value < 100) {
    return '良';
  } else if (value < 150) {
    return '轻度污染';
  } else if (value < 200) {
    return '中度污染';
  }
  return '重度污染';
};

module.exports = {
  shortReport: res => {
    const {
      result: { daily },
    } = res;
    const { temperature, air_quality, skycon_08h_20h } = daily;
    const { aqi } = air_quality;
    const { date, min: temperatureMin, max: temperatureMax } = temperature[0];
    const { avg: { chn } } = aqi[0];
    const { value: skyconValue } = skycon_08h_20h[0];
    return `${dateUtil.format(date, 'MM-DD')} | ${
      SKYCON[skyconValue]
    } | ${Math.round(temperatureMin)} ~ ${Math.round(
      temperatureMax
    )}℃ | AQI: ${Math.round(chn)} ${getAQIDesc(chn)}`;
  },
};
