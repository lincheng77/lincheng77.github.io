

# Docker基础 - 安装和入门基础

> 在了解了虚拟化技术和Docker之后，让我们上手Docker，看看Docker是怎么工作的。这里会介绍CentOS环境下Docker的安装和配置，以及会给你展示两个实例，给你一个直观的理解。再啰嗦下，有条件的情况下直接看官网在新窗口打开, 网上资料鱼龙混杂，版本也更新不及时。

## Docker 架构

> 理解如下的一些概念，你才知道安装什么

- Docker 使用客户端-服务器（C/S）架构模式，使用远程API来管理和创建Docker容器。

- Docker客户端（Client）：Docker客户端通过命令行或者其他工具（如Docker SDK[https://docs.docker.com/develop/sdk/]）与Docker的守护进程通信。

Docker包括三个基本概念：

- **镜像（Image）**：相当于是一个root文件系统，比如官方镜像Ubuntu16.04就包含了完整的一套Ubuntu16.04最小系统的root文件系统。
- **容器（Container）**：镜像和容器的关系，就像是面向对象设计中的类和实例一样，1镜像是静态的定义，容器是镜像运行时的实体，容器可以被<u>创建</u>、<u>启动</u>、<u>停止</u>、<u>删除</u>、<u>暂停</u>等。
- **仓库（Repository）**：仓库是用来存放镜像的空间（例如Maven仓库，在本地找不到以来就会去远程仓库找）。

![](http://image.edkso.cn/blog/docker-x-1.png)

## Docker安装

> 从 2017 年 3 月开始 docker 在原来的基础上分为两个分支版本: Docker CE 和 Docker EE：Docker CE 即社区免费版；Docker EE 即企业版，强调安全，但需付费使用；按照官网上Docker Engine - Community包现在就是叫做Docker CE。这里将展示在CentOS上安装Docker。

### 安装要求

这里以Centos举例：（其他Linux操作参考官网文档：[Get Docker](https://docs.docker.com/get-docker/)）[我个人不推荐使用Windows安装]

- Centos7稳定版
- 安装遇到问题再参考[Install Docker Desktop on Linux ](https://docs.docker.com/desktop/install/linux-install/)中的System requirements

### 卸载老的Docker及依赖

> 为什么你可能还需要删除较低的Docker安装？因为较旧版本的Docker被称为docker或docker-engine（它是一个简化Docker安装的命令行工具，通过一个简单的命令行即可在相应的平台上安装Docker，比如VirtualBox、 Digital Ocean、Microsoft Azure）

```bash
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

###  安装一些依赖库

> 如果没有安装yum请先安装yum

```bash
sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
```

设置下载docker的仓库

```bash
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

### 安装Docker CE

```bash
yum install -y docker-ce
```

### 启动Docker CE

```bash
sudo systemctl start docker
```

测试是否安装成功

```bash
systemctl status docker
```

![](http://image.edkso.cn/blog/image-20230406174221906.png)

## 仓库配置

> Docker 安装好以后，我们就要开始为拉取镜像准备了；国内从 DockerHub 拉取镜像有时会特别慢，此时可以**配置镜像加速器**。

Docker 官方和国内很多云服务商都提供了国内加速器服务，比如：

- 阿里云的加速器：https://help.aliyun.com/document_detail/60750.html
- 网易加速器：http://hub-mirror.c.163.com
- Docker官方中国加速器：https://registry.docker-cn.com
- ustc 的镜像：https://docker.mirrors.ustc.edu.cn
- daocloud：https://www.daocloud.io/mirror#accelerator-doc（注册后使用）

**这里配置以 Docker官方中国的加速器**：

对于使用Centos7系统，请在 /etc/docker/daemon.json 中写入如下内容（如果文件不存在请新建该文件）

```json
{"registry-mirrors":["https://registry.docker-cn.com"]}
```

然后重新启动服务

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 镜像查看和拉取

拉取hello world

```bash
docker pull hello-world:latest
```

```bash
[root@lincheng77 ~]# docker pull hello-world:latest
latest: Pulling from library/hello-world
2db29710123e: Pull complete 
Digest: sha256:ffb13da98453e0f04d33a6eee5bb8e46ee50d08ebe17735fc0779d0349e889e9
Status: Downloaded newer image for hello-world:latest
docker.io/library/hello-world:latest
```

查看本地仓库中的镜像（images）：

```bash
[root@lincheng77 ~]# docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
hello-world   latest    feb5d9fea6a5   18 months ago   13.3kB
```

运行hello-world这个镜像

![](http://image.edkso.cn/image-20230406185703200.png)

> 注意, 如果你在没有镜像的时候，直接`docker run hello-world`也是可以的；它会先检查本地是否有这个镜像，没有的话会先从指定仓库中拉取。

## 容器实例-ubuntu实例

> Hello-world是一个官方的容器实例，然后再通过介绍运行ubuntu的实例来全面理解如何跑一个Docker实例

### 在Ubuntu容器中跑Hello world

Docker 允许你在容器内运行应用程序， 使用 docker run 命令来在容器内运行一个应用程序。这里同样是个Hello World，不同在于它是在容器内部运行的。

![](http://image.edkso.cn/blog/image-20230406190617353.png)

**命令参数解释：**

| 参数                          |                             解释                             |
| :---------------------------- | :----------------------------------------------------------: |
| **`docker`**                  |                   Docker 的二进制执行文件                    |
| **`run`**                     |                         运行一个容器                         |
| **`ubuntu:latest`**           | 指定要运行的镜像，Docker 首先从本地主机上查找镜像是否存在，如果不存在，Docker 就会从镜像仓库 Docker Hub 下载公共镜像 |
| **`/bin/echo "Hello world"`** |                   在启动的容器里执行的命令                   |

### 在Ubuntu容器中交互

> 以上面例子，容器跑的是Ubuntu是一个系统实例，能否进入系统进行交互呢？

下面是一个在ubuntu容器中交互的例子：

![](http://image.edkso.cn/blog/image-20230406191159347.png)

**命令参数解释：**

| 参数     |                   解释                    |
| :------- | :---------------------------------------: |
| **`-t`** |      在新容器内指定一个伪终端或终端       |
| **`-i`** | 允许你对容器内的标准输入 (STDIN) 进行交互 |

### 让Ubuntu容器在后台运行

> 我们先来看, 当我们跑完上面例子之后，我们看下后台是否有docker容器实例？

我们可以看到没有容器实例

![](http://image.edkso.cn/blog/image-20230406192744363.png)

我们运行下面命令：

![](http://image.edkso.cn/blog/image-20230406192900195.png)

仅仅输出了一个长长的无规律的字符串，这个字符串叫做**容得ID**，对每个容器来说都是唯一的，我们可以通过**容器ID**来查看对应的容器发生了什么

我们再次输入`docker ps`命令可以看到有在运行的容器实例

![](http://image.edkso.cn/blog/image-20230406193138048.png)

然后我们再输入**`docker logs ce148270abdc`**来查看容器运行日志（ce148270abdc注意替换为自己对应的容器ID）

<img src="http://image.edkso.cn/blog/image-20230406193520885.png" alt="image-20230406193520885" style="zoom:67%;" />

最后我们看下，如何关闭后台实例

![](http://image.edkso.cn/blog/image-20230406193634215.png)

**以上命令参数解释：**

| 参数       |         解释         |
| :--------- | :------------------: |
| **`ps`**   |   查看运行中的实例   |
| **`-d`**   | 让容器实例在后台运行 |
| **`logs`** | 查看容器实例运行日志 |
| **`stop`** |     停止一个容器     |

**以上输出参数解释：**

| 参数               |                             解释                             |
| :----------------- | :----------------------------------------------------------: |
| **`CONTAINER ID`** |                           容器 ID                            |
| **`IMAGE`**        |                          使用的镜像                          |
| **`COMMAND`**      |                     启动容器时运行的命令                     |
| **`CREATED`**      |                        容器的创建时间                        |
| **`STATUS`**       | 容器状态(状态有7种)<br />created（已创建）<br />restarting（重启中）<br/> running（运行中）<br> removing（迁移中）<br/> paused（暂停）<br/> exited（停止）<br/> dead（死亡） |
| **`PORTS`**        |          容器的端口信息和使用的连接类型（tcp\udp）           |
| **`NAMES`**        |                      自动分配的容器名称                      |