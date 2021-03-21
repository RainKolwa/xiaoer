'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // mail
  router.post('/api/mail/single', controller.email.sendSingleMail);
  // weather
  router.get('/api/weather/daily', controller.weather.daily);
};
