'use strict';

const Service = require('egg').Service;
const Core = require('@alicloud/pop-core');

class MailService extends Service {
  async send({ mailto, subject, body }) {
    const { alicloud } = this.app.config;
    const { accessKeyId, accessKeySecret, accountName } = alicloud;
    const client = new Core({
      accessKeyId: accessKeyId,
      accessKeySecret: accessKeySecret,
      endpoint: 'https://dm.aliyuncs.com',
      apiVersion: '2015-11-23',
    });
    const { logger } = this;
    const params = {
      RegionId: 'cn-hangzhou',
      AccountName: accountName,
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
