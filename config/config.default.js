'use strict';

module.exports = appInfo => {
  return {
    keys: appInfo.name + '_153332185447_3632',
    mongoose: {
      clients: {
        blog: {
          // url: 'mongodb://127.0.0.1/blog',
          url: 'mongodb://192.168.168.137/blog',
          options: {
            user: 'blog', // 数据库的用户名 
            pass: 'blog123456', // 数据库的密码,
            authSource:"admin"
          },
        }
      }
    },
    user: { // 初始化管理员的账号
      userName: 'admin',
      password: 'admin',
    },
    session: {
      maxAge: 3600 * 1000,
    },
    jwt: {
      cert: 'huanggegehaoshuai' // jwt秘钥
    },
    qiniu: { // 这里填写你七牛的Access Key和Secret Key
      ak: '',
      sk: ''
    }
  }
};
