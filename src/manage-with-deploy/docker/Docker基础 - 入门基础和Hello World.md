# Docker基础 - 入门基础和Hello World
> 在了解了虚拟化技术和Docker之后，让我们上手Docker，看看Docker是怎么工作的。这里会介绍CentOS环境下Docker的安装和配置，以及会给你展示两个实例，给你一个直观的理解。再啰嗦下，有条件的情况下直接看官网在新窗口打开, 网上资料鱼龙混杂，版本也更新不及时。

## Docker 架构

> 理解如下的一些概念，你才知道安装什么

- Docker 使用客户端-服务器（C/S）架构模式，使用远程API来管理和创建Docker容器。

- Docker客户端（Client）：Docker客户端通过命令行或者其他工具（如Docker SDK[https://docs.docker.com/develop/sdk/]）与Docker的守护进程通信。

Docker包括三个基本概念：

- 镜像（Image）：
- 容器（Container）：
- 仓库（Repository）