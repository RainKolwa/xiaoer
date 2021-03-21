'use strict';

const Controller = require('egg').Controller;

class MailController extends Controller {
  async daily() {
    const { ctx, service } = this;
    const createRule = {
      lng: { type: 'number', min: -180, max: 180 },
      lat: { type: 'number', min: -85, max: 85 },
    };
    this.logger.info(ctx.request.query);
    ctx.validate(createRule, ctx.request.query);
    const res = await service.weather.daily(ctx.request.query);
    if (res.status === 'failed') {
      const { error = 'unknown' } = res;
      ctx.body = {
        code: 1,
        messeage: `错误信息: ${error}`,
      };
    } else {
      ctx.body = {
        code: 0,
        messeage: 'Success',
        data: res.result,
      };
    }
  }
}
module.exports = MailController;
