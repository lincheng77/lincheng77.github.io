# Nacos 单机集群部署搭建

> 本文介绍为Nacos2.2 版本配置，其他版本请注意根据情况而定

## Nacos部署环境

> Nacos定义为一个IDC内部应用组件，并非面向公网环境的产品，建议在内部隔离网络环境中部署，强烈不建议部署在公共网络环境。

## Nacos部署模式

- 单机模式 - 用于测试和单机试用。
- 集群模式 - 用于生产环境，确保高可用。
- 多集群模式 - 用于多数据中心场景。

## Nacos环境准备

- 安装好 JDK，需要 1.8 及其以上版本
- 建议: 2核 CPU / 4G 内存 及其以上
- 建议: 生产环境 3 个节点 及其以上

## Nacos配置准备

这里说的配置单机模式，集群模式都要配置，为什么要配置参考我的另外一篇文章 [Nacos2.2版本Tomcat启动报错.md](/micro-service/nacos/error/Nacos2.2版本Tomcat启动报错.html)

conf目录下的application.properties文件配置：

```properties
nacos.core.auth.plugin.nacos.token.secret.key=SecretKey012345678901234567890123456789012345678901234567890123456789
```

详情可查看[官方文档：鉴权-自定义密钥 ](https://nacos.io/zh-cn/docs/v2/guide/plugin/auth-plugin.html).

> 注意，文档中的默认值为公开默认值，可用于临时测试，实际使用时请**务必**更换为自定义的其他有效值。

## Nacos单机模式

### 单机模式启动

- **Linux/Unix/Mac**

```shell
$ sh startup.sh -m standalone
```

- **Windows**

```shell
$ cmd startup.cmd -m standalone
```

### 配置mysql数据库

在0.7版本之前，在单机模式时nacos使用嵌入式数据库实现数据的存储，不方便观察数据存储的基本情况。0.7版本增加了支持mysql数据源能力，具体的操作步骤：

- 1.安装数据库，版本要求：5.6.5+
- 2.初始化mysql数据库，数据库初始化文件：mysql-schema.sql（在conf目录下）
- 3.修改conf/application.properties文件，增加支持mysql数据源配置（目前只支持mysql，官方文档在2023年4月还是这样写的，大家可以看下配置文件），添加mysql数据源的url、用户名和密码。

```properties
spring.datasource.platform=mysql
db.num=1
db.url.0=jdbc:mysql://11.162.196.16:3306/nacos_devtest?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true
db.user=nacos_devtest
db.password=youdontknow
```

再以单机模式启动nacos，nacos所有写嵌入式数据库的数据都写到了mysql

> 官方在2.2（具体哪一个版本不清楚，我在2.2版本的配置文件中看到）版本推荐，spring.sql.init.platform =mysql 这样来配置mysql启动

![](http://image.edkso.cn/blog/image-20230410230112943.png)

## Nacos集群模式

> 3个或3个以上Nacos节点才能构成集群。

### 配置文件

- 在nacos的解压目录nacos/的conf目录下，有配置文件cluster.conf，请每行配置成ip:port。（请配置3个或3个以上节点）

```shell
# ip:port
200.8.9.16:8848
200.8.9.17:8848
200.8.9.18:8848
```

- 如果是单台机器部署集群模式，还要修改`conf`目录下的`application.properties`文件，把server.port=8848 分别修改为不同的端口，同时不要使用连续的端口，至于为什么可以参考我的这篇文章//TODO
- application.properties的数据源配置注意保持一致

### 集群模式启动

#### 启动

> 使用内置数据源

```bash
sh startup.sh -p embedded
```

> 使用外置数据源

```bash
sh startup.sh
```

#### 停止

```bash
sh shutdown.sh
```



