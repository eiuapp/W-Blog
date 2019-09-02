## 开启mongodb
```
mongod --dbpath '你数据库的目录' # --auth 如果开启密码，要加上这个命令
```
这一步，要注意一下。

因为我的环境中，先前已经有了 Mongodb 服务，所以，直接创建对应的帐户，并配置帐户信息就可以了。

### 创建 mongodb account

```
root@cfbaa6436964:/# mongo
> use admin;
switched to db admin
> db.createUser({
...  user: 'blog',
...  pwd: 'blog123456',
...  roles: [
...  { role: "dbAdmin", db: "blog" },
...  { role: "readWrite", db: "blog" }
...  ]
... 
... });
Successfully added user: {
	"user" : "blog",
	"roles" : [
		{
			"role" : "dbAdmin",
			"db" : "blog"
		},
		{
			"role" : "readWrite",
			"db" : "blog"
		}
	]
}
> ^C
bye
root@cfbaa6436964:/# 
```

#### 创建完的用户，登录方式，是不是要不同

admin可以登录。

```
root@cfbaa6436964:/# mongo --port 27017 -u "admin" -p "admin123456" --authenticationDatabase "admin"
MongoDB shell version v4.0.10
connecting to: mongodb://127.0.0.1:27017/?authSource=admin&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("459c9c0b-b058-4d36-8f62-b62faea031e2") }
MongoDB server version: 4.0.10
---
Enable MongoDB's free cloud-based monitoring service, which will then receive and display
metrics about your deployment (disk utilization, CPU, operation statistics, etc).

The monitoring data will be available on a MongoDB website with a unique URL accessible to you
and anyone you share the URL with. MongoDB may use this information to make product
improvements and to suggest MongoDB products and deployment options to you.

To enable free monitoring, run the following command: db.enableFreeMonitoring()
To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---

> 
```

但是，通过admin创建的帐户 blog 像上面这样，登录不了的。

```
root@cfbaa6436964:/# mongo --port 27017 -u "blog" -p "blog123456" --authenticationDatabase "blog"
MongoDB shell version v4.0.10
connecting to: mongodb://127.0.0.1:27017/?authSource=blog&gssapiServiceName=mongodb
2019-08-31T06:21:12.562+0000 E QUERY    [js] Error: Authentication failed. :
connect@src/mongo/shell/mongo.js:344:17
@(connect):2:6
exception: connect failed
root@cfbaa6436964:/# 
```

### 程序中配置

`config/config.default.js` 中 配置如下：

```
    mongoose: {
      clients: {
        blog: {
          url: 'mongodb://127.0.0.1/blog',
          options: {
            user: 'blog', // 数据库的用户名 
            pass: 'blog123456', // 数据库的密码,
            authSource:"admin"
          },
        }
      }
    },
```

