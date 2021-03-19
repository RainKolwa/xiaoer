'use strict';

const Controller = require('egg').Controller;

class MailController extends Controller {
  async sendSingleMail() {
    const { ctx, service } = this;
    const createRule = {
      mailto: { type: 'email' },
      subject: { type: 'string' },
      body: { type: 'string' },
    };
    ctx.validate(createRule);
    const res = await service.email.send(ctx.request.body);
    if (res.error) {
      const { name, code } = res;
      ctx.body = {
        code: 1,
        messeage: `错误码: ${code}, 错误信息: ${name}`,
      };
    } else {
      // save event
      // const {RequestId, EnvId} = res;
      ctx.body = {
        code: 0,
        messeage: 'Success',
      };
    }
  }
}
module.exports = MailController;
