# Nacos2.2版本Tomcat启动报错

## 错误日志

查看 logs/start.out，可以看到报错信息

```bash
2023-04-09 19:36:23,081 ERROR Error starting Tomcat context. Exception: org.springframework.beans.factory.UnsatisfiedDependencyException. Message: Error creating bean with name 'basicAuthenticationFilter' defined in class path resource [com/alibaba/nacos/prometheus/filter/PrometheusAuthFilter.class]: Unsatisfied dependency expressed through method 'basicAuthenticationFilter' parameter 0; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'nacosAuthConfig' defined in URL [jar:file:/opt/server/nacos/nacos-8848/target/nacos-server.jar!/BOOT-INF/lib/nacos-plugin-default-impl-2.2.1.jar!/com/alibaba/nacos/plugin/auth/impl/NacosAuthConfig.class]: Unsatisfied dependency expressed through constructor parameter 1; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'tokenManagerDelegate': Unsatisfied dependency expressed through field 'jwtTokenManager'; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'jwtTokenManager' defined in URL [jar:file:/opt/server/nacos/nacos-8848/target/nacos-server.jar!/BOOT-INF/lib/nacos-plugin-default-impl-2.2.1.jar!/com/alibaba/nacos/plugin/auth/impl/token/impl/JwtTokenManager.class]: Instantiation of bean failed; nested exception is org.springframework.beans.BeanInstantiationException: Failed to instantiate [com.alibaba.nacos.plugin.auth.impl.token.impl.JwtTokenManager]: Constructor threw exception; nested exception is java.lang.IllegalArgumentException: the length of secret key must great than or equal 32 bytes; And the secret key  must be encoded by base64.Please see https://nacos.io/zh-cn/docs/v2/guide/user/auth.html
```

![](http://image.edkso.cn/blog/image-20230409225218791.png)

## 解决方案

> Failed to instantiate (con. alibaba, nacos, olugin, auth. imol, token. imol. JitTokenManager]: Constructor threw exception;

可以看到提示我们一个秘钥是必须配置的，我们打开这个网址

| 参数                                              | 默认值                                                       | 启止版本       | 说明                                                         |
| ------------------------------------------------- | :----------------------------------------------------------- | -------------- | ------------------------------------------------------------ |
| nacos.core.auth.plugin.<br>nacos.token.secret.key | SecretKey01234567<br>89012345678901234567<br>89012345678901234567<br>890123456789(2.2.0.1后无默认值) | 2.1.0 ~ latest | 默认鉴权插件用于生成用户登陆临时accessToken所使用的密钥，**使用默认值有安全风险** |

然后我们修改 conf/application.properties 文件

找到nacos.core.auth.plugin.nacos.token.secret.key这个字段给他赋值临时值：SecretKey01234567<br>8901234567890123456789012345678901234567890123456789

> 不要用在生产环境，临时使用，官方在可视化界面登录的时候也提醒了

<img src="http://image.edkso.cn/blog/image-20230409230403557.png" alt="image-20230409230403557" style="zoom:50%;" />
