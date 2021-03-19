'use strict';

const Service = require('egg').Service;
const Core = require('@alicloud/pop-core');

const client = new Core({
  accessKeyId: process.env.ACCESS_KEY_ID,
  accessKeySecret: process.env.ACCESS_KEY_SECRET,
  endpoint: 'https://dm.aliyuncs.com',
  apiVersion: '2015-11-23',
});

class MailService extends Service {
  async send({ mailto, subject, body }) {
    const { logger } = this;
    const params = {
      RegionId: 'cn-hangzhou',
      AccountName: process.env.ACOUNT_NAME,
      AddressType: 1,
      ReplyToAddress: 'false',
      ToAddress: mailto,
      Subject: subject,
      TextBody: body,
    };
    return client.request('SingleSendMail', params, { method: 'POST' }).then(
      result => {
        logger.info('send mail successfully');
        return JSON.stringify(result);
      },
      ex => {
        const { name, code } = ex;
        logger.error('send mail failed', ex);
        return {
          name,
          code,
          error: 1,
        };
      }
    );
  }
}
module.exports = MailService;
