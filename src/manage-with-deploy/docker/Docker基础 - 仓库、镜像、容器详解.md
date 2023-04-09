

# Docker基础 - 仓库、镜像、容器详解


> 本文将从仓库，镜像，容器三个方面讲解常用的docker命令和使用等，对于开发而言这块使用的非常频繁，需要重点掌握。

## 仓库、镜像、容器的关系

> 我们再回顾下仓库，镜像，容器的关系（这是官网的图）

![仓库、镜像、容器的关系](http://image.edkso.cn/blog/docker-architecture.svg)

## Docker镜像

当运行容器时，使用的镜像如果在本地种不存在，docker就会自动从docker镜像仓库中下载，默认是从Docker Hub公共镜像源下载。

### 镜像列表

我们可以使用`docker images`来列出本地主机上的镜像

```bash
[root@lincheng77 ~]# docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
ubuntu        latest    08d22c0ceb15   4 weeks ago     77.8MB
hello-world   latest    feb5d9fea6a5   18 months ago   13.3kB
```

**以上输出参数解释：**

| 参数         |                              解                              |
| :----------- | :----------------------------------------------------------: |
| `REPOSITORY` |                       表示镜像的仓库源                       |
| `TAG`        | 镜像的标签, 同一仓库源可以有多个 TAG，代表这个仓库源的不同个版本 |
| `IMAGE ID`   |                            镜像ID                            |
| `CREATED`    |                         镜像创建时间                         |
| `SIZE`       |                           镜像大小                           |

### 查找镜像

> 以查找rabbitmq的镜像为例：

- **通过Docker Hub 进行查找**, 比如https://hub.docker.com/search?q=mysql&type=image

<img src="http://image.edkso.cn/blog/image-20230407093904083.png" style="zoom: 67%;" />

- **通过docker search 命令来搜索镜像**

```shell
[root@lincheng77 ~]# docker search rabbitmq
NAME                                      DESCRIPTION                                      STARS     OFFICIAL   AUTOMATED
rabbitmq                                  RabbitMQ is an open source multi-protocol me…   4723      [OK]       
bitnami/rabbitmq                          Bitnami Docker Image for RabbitMQ                95                   [OK]
bitnami/rabbitmq-exporter                                                                  2                    
circleci/rabbitmq                         This image is for internal use                   0                    
circleci/rabbitmq-delayed                 https://github.com/circleci/rabbitmq-delayed…   1                    
bitnami/rabbitmq-cluster-operator                                                          0                    
rapidfort/rabbitmq                        RapidFort optimized, hardened image for Rabb…   0                    
bitnamicharts/rabbitmq                                                                     0                    
itisfoundation/rabbitmq                                                                    0                    
masstransit/rabbitmq                                                                       11                   
bitnamicharts/rabbitmq-cluster-operator                                                    0                    
nasqueron/rabbitmqadmin                   RabbitMQ management plugin CLI tool Lightwei…   1                    [OK]
clearlinux/rabbitmq                       RabbitMQ multi-protocol messaging broker wit…   0                    
corpusops/rabbitmq                        https://github.com/corpusops/docker-images/      0                    
brightercommand/rabbitmq                  RabbitMQ management with delay plugin enabled    0                    
drud/rabbitmq                             rabbitmq                                         0                    [OK]
nasqueron/rabbitmq                        RabbitMQ wth management, MQTT and STOMP plug…   0                    [OK]
ibmcom/rabbitmq-exporter-ppc64le                                                           0                    
uselagoon/rabbitmq                                                                         0                    
betterweb/rabbitmq                                                                         0                    
uselagoon/rabbitmq-cluster                                                                 0                    
newrelic/k8s-nri-rabbitmq                 New Relic Infrastructure RabbitMQ Integratio…   0                    
betterweb/rabbitmq-swarm-cluster          https://gitlab.com/BetterCorp/public/rabbitm…   0                    
ibmcom/rabbitmq-java-client                                                                0                    
ibmcom/rabbitmq-java-client-ppc64le                                 
```

**以上输出参数解释：**

| 参数          |                     说明                      |
| :------------ | :-------------------------------------------: |
| `NAME`        |               镜像仓库源的名称                |
| `DESCRIPTION` |                  镜像的描述                   |
| `OFFICIAL`    |             是否 docker 官方发布              |
| `STARS`       | 类似 Github 里面的 star，表示点赞、喜欢的意思 |
| `AUTOMATED`   |                   自动构建                    |

### 拉取镜像

> 现在拉取搜索出的rabbitmq

```shell
[root@lincheng77 ~]# docker pull rabbitmq
Using default tag: latest
latest: Pulling from library/rabbitmq
5544ebdc0c7b: Pull complete 
56fd8067e26d: Pull complete 
50f617f636f4: Pull complete 
dfa68bb7204a: Pull complete 
c55a28a6ac3f: Pull complete 
a680b367e8fe: Pull complete 
6143a430a7ee: Pull complete 
764f38b1467e: Pull complete 
ede980e83395: Pull complete 
5f77f2a5c9cb: Pull complete 
Digest: sha256:e3f4457b812b2633bf32925a4799124a25484340249d35d5949ef73b9731e53c
Status: Downloaded newer image for rabbitmq:latest
docker.io/library/rabbitmq:latest

[root@lincheng77 ~]# docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
rabbitmq      latest    9492b0e4eea5   5 days ago      246MB
ubuntu        latest    08d22c0ceb15   4 weeks ago     77.8MB
hello-world   latest    feb5d9fea6a5   18 months ago   13.3kB
```

### 删除镜像

> hello world 这个镜像我们以后都不会用到了，把它删了吧

```shell
[root@lincheng77 ~]# docker rmi hello-world
Error response from daemon: conflict: unable to remove repository reference "hello-world" (must force) - container ceb9a4299828 is using its referenced image feb5d9fea6a5
```

我们可以看到删除失败了，提示我们不能删除该镜像，因为使用该镜像创建了容器实例，我们下面先把容器实例删除

```shell
[root@lincheng77 ~]# docker ps -a
CONTAINER ID   IMAGE           COMMAND                   CREATED       STATUS                     PORTS     NAMES
ce148270abdc   ubuntu:latest   "/bin/sh -c 'while t…"   9 hours ago   Exited (137) 9 hours ago             xenodochial_shaw
2c24979daa7d   ubuntu:latest   "/bin/bash"               9 hours ago   Exited (127) 9 hours ago             reverent_kapitsa
a9327851ce86   ubuntu:latest   "/bin/echo 'Hello wo…"   9 hours ago   Exited (0) 9 hours ago               affectionate_jepsen
ceb9a4299828   hello-world     "/hello"                  9 hours ago   Exited (0) 9 hours ago               musing_solomon
```

```shell
[root@lincheng77 ~]# docker rm ceb9a4299828
ceb9a4299828
[root@lincheng77 ~]# docker rmi hello-world
Untagged: hello-world:latest
Untagged: hello-world@sha256:ffb13da98453e0f04d33a6eee5bb8e46ee50d08ebe17735fc0779d0349e889e9
Deleted: sha256:feb5d9fea6a5e9606aa995e879d862b825965ba48de054caab5ef356dc6b3412
Deleted: sha256:e07ee1baac5fae6a26f30cabfe54a36d3402f96afda318fe0a96cec4ca393359
```

**以上命令参数解释：**

| 参数  |     说明     |
| :---- | :----------: |
| `rm`  | 删除容器实例 |
| `rmi` |   删除镜像   |

## 创建镜像

> 在容器中，我们可以更新一下容器中的一些软件，下面我们运行一个ubuntu容器实例，然后使用`apt-get update`更新软件

```shell
[root@lincheng77 ~]# docker run -it ubuntu:latest
root@ffeda95cd8a7:/# apt-get update
Get:1 http://archive.ubuntu.com/ubuntu jammy InRelease [270 kB]
Get:2 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]              
Get:3 http://archive.ubuntu.com/ubuntu jammy-updates InRelease [119 kB]
Get:4 http://archive.ubuntu.com/ubuntu jammy-backports InRelease [108 kB]
Get:5 http://security.ubuntu.com/ubuntu jammy-security/restricted amd64 Packages [908 kB]
Get:6 http://archive.ubuntu.com/ubuntu jammy/multiverse amd64 Packages [266 kB]
Get:7 http://archive.ubuntu.com/ubuntu jammy/main amd64 Packages [1792 kB]
Get:8 http://security.ubuntu.com/ubuntu jammy-security/universe amd64 Packages [909 kB]                                 
Get:9 http://archive.ubuntu.com/ubuntu jammy/universe amd64 Packages [17.5 MB]                                          
Get:10 http://security.ubuntu.com/ubuntu jammy-security/multiverse amd64 Packages [23.2 kB]                             
Get:11 http://security.ubuntu.com/ubuntu jammy-security/main amd64 Packages [914 kB]                                    
Get:12 http://archive.ubuntu.com/ubuntu jammy/restricted amd64 Packages [164 kB]                                        
Get:13 http://archive.ubuntu.com/ubuntu jammy-updates/restricted amd64 Packages [963 kB]                                
Get:14 http://archive.ubuntu.com/ubuntu jammy-updates/multiverse amd64 Packages [28.7 kB]                               
Get:15 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 Packages [1251 kB]                                     
Get:16 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 Packages [1149 kB]                                 
Get:17 http://archive.ubuntu.com/ubuntu jammy-backports/main amd64 Packages [49.0 kB]                                   
Get:18 http://archive.ubuntu.com/ubuntu jammy-backports/universe amd64 Packages [23.3 kB]                               
Fetched 26.5 MB in 38s (702 kB/s)                                                                                       
Reading package lists... Done
```

我们通过`docker commit`根据刚才运行的ubuntu容器实例来创建一个新镜像

```shell
[root@lincheng77 ~]# docker commit -m="update test" -a="lincheng77" ffeda95cd8a7 lincheng77/ubuntu:v1.0.1
sha256:c88cb822f7f6f8bb7e8b2cd2ab82689efa638681f0b90e80b9a1feb5da78f9e3
```

可以看到新的镜像创建成功了

```shell
[root@lincheng77 ~]# docker images
REPOSITORY                                             TAG       IMAGE ID       CREATED         SIZE
lincheng77/ubuntu                                      v1.0.1    c88cb822f7f6   9 seconds ago   121MB
rabbitmq                                               latest    9492b0e4eea5   7 days ago      246MB
ubuntu                                                 latest    08d22c0ceb15   4 weeks ago     77.8MB
```

### 构建镜像☆

> 刚才是把一个可能修改过的容器实例提交（创建）为一个新的镜像，我也也可以用`docker build` 命令通过Dockerfile文件构建一个镜像（[Dockerfile 官方文档](https://docs.docker.com/engine/reference/builder/)）

我们来创建一个Dcokerfile文件

```shell
FROM lincheng77/ubuntu:v1.0.1
MAINTAINER      lincheng77@163.com

RUN     /bin/echo 'root:123456' |chpasswd
RUN     useradd lincheng77
RUN     /bin/echo 'lincheng77:123456' |chpasswd
RUN     /bin/echo -e "LANG=\"en_US.UTF-8\"" > /etc/default/local
EXPOSE 22
EXPOSE 80
```

> Dockerfile文件参数说明：
>
> | 参数       | 说明                     |
> | ---------- | ------------------------ |
> | FROM       | 构建镜像基于哪个镜像     |
> | MAINTAINER | 镜像维护者姓名或邮箱地址 |
> | RUN        | 在 docker build 时运行   |
> | EXPOSE     | 声明端口                 |

然后我们通过`docker build` 命令通过Dockerfile文件构建一个镜像

```shell
[root@lincheng77 ~]# docker build -t lincheng77/ubuntu:v2.0.1 .
[+] Building 0.2s (9/9) FINISHED                                                                                         
 => [internal] load .dockerignore                                                                                   0.0s
 => => transferring context: 2B                                                                                     0.0s
 => [internal] load build definition from Dockerfile                                                                0.0s
 => => transferring dockerfile: 308B                                                                                0.0s
 => [internal] load metadata for docker.io/lincheng77/ubuntu:v1.0.1                                                 0.0s
 => [1/5] FROM docker.io/lincheng77/ubuntu:v1.0.1                                                                   0.0s
 => CACHED [2/5] RUN /BIN/ECHO 'root:123456' |chpasswd                                                              0.0s
 => CACHED [3/5] RUN USERADD lincheng77                                                                             0.0s
 => CACHED [4/5] RUN /BIN/ECHO 'lincheng77:123456' |chpasswd                                                        0.0s
 => [5/5] RUN /BIN/ECHO -e "LANG="en_US.UTF-8"" > /etc/default/local                                                0.2s
 => exporting to image                                                                                              0.0s
 => => exporting layers                                                                                             0.0s
 => => writing image sha256:f6b24dd212b918484cf75c481e259d64691984bec7b74c663429bb26cb630e7b                        0.0s
 => => naming to docker.io/lincheng77/ubuntu:v2.0.1                                                                 0.0s
```

> `docker build`参数说明：
>
> | 参数 | 说明                                                   |
> | ---- | ------------------------------------------------------ |
> | `-t` | 指定要创建的目标镜像名                                 |
> | `.`  | Dockerfile 文件所在目录，可以指定Dockerfile 的绝对路径 |

```shell
[root@lincheng77 ~]# docker images
REPOSITORY                                             TAG       IMAGE ID       CREATED          SIZE
lincheng77/ubuntu                                      v2.0.1    f6b24dd212b9   27 seconds ago   121MB
lincheng77/ubuntu                                      v1.0.1    c88cb822f7f6   4 hours ago      121MB
rabbitmq                                               latest    9492b0e4eea5   7 days ago       246MB
ubuntu                                                 latest    08d22c0ceb15   4 weeks ago      77.8MB
```

可以看到构建的镜像已经在列表中了，镜像id为f6b24dd212b9，我们使用新的镜像创建容器，可以看到新的镜像已经包含我们创建的lincheng77用户了

```shell
[root@lincheng77 ~]# docker run -it lincheng77/ubuntu:v2.0.1
root@b07e96c63d53:/# id lincheng77
uid=1000(lincheng77) gid=1000(lincheng77) groups=1000(lincheng77)
root@b07e96c63d53:/# exit 
exit
```

### 镜像标签

> 我们可以使用 `docker tag` 命令，为镜像添加一个新的标签（通常用不同的标签区分不同的版本）
>
> [docker tag 官方文档](https://docs.docker.com/engine/reference/commandline/tag/)

我们通过`docker tag` 命令和`docker images`命令 可以确认已经给生成了一个标签为v3.0.1的新镜像

```shell
[root@lincheng77 ~]# docker tag 8a656bbf2e7a lincheng77/ubuntu:v3.0.1
[root@lincheng77 ~]# images
-bash: images: 未找到命令
[root@lincheng77 ~]# docker images
REPOSITORY                                             TAG       IMAGE ID       CREATED        SIZE
lincheng77/ubuntu                                      v2.0.1    8a656bbf2e7a   13 hours ago   121MB
lincheng77/ubuntu                                      v3.0.1    8a656bbf2e7a   13 hours ago   121MB
lincheng77/ubuntu                                      v1.0.1    c88cb822f7f6   17 hours ago   121MB
rabbitmq                                               latest    9492b0e4eea5   8 days ago     246MB
ubuntu                                                 latest    08d22c0ceb15   4 weeks ago    77.8MB
```

### 镜像导入和导出

> [docker save 官方文档](https://docs.docker.com/engine/reference/commandline/save/)
>
> [docker load 官方文档](https://docs.docker.com/engine/reference/commandline/load/)

#### 镜像导出

```shell
[root@lincheng77 ~]# docker images
REPOSITORY                                             TAG       IMAGE ID       CREATED        SIZE
lincheng77/ubuntu                                      v2.0.1    8a656bbf2e7a   13 hours ago   121MB
[root@lincheng77 ~]# docker save > lincheng77/ubuntu:v3.0.1.tar 8a656bbf2e7a
-bash: lincheng77/ubuntu:v3.0.1.tar: 没有那个文件或目录
[root@lincheng77 ~]# docker save > lincheng77-ubuntu:v3.0.1.tar 8a656bbf2e7a
[root@lincheng77 ~]# ll | grep lincheng
-rw-r--r--  1 root root 123516928 4月   9 15:12 lincheng77-ubuntu:v3.0.1.tar
```

#### 镜像导入

```shell
docker load < lincheng77-ubuntu:v3.0.1.tar
```

## Docker容器

### 容器启动

> 参考：
>
> [Docker run reference 官网](https://docs.docker.com/engine/reference/run/)
>
> Docker手册 - Docker CLI运行相关命令

前面文章运行多次了，这里不再介绍各个参数含义了

```shell
[root@lincheng77 ~]# docker run -it lincheng77/ubuntu:v2.0.1
root@a8e2192b852f:/# 
```

### 容器查看

`-a`表示所有的，默认是运行中的容器

```shell
[root@lincheng77 ~]# docker ps -a
CONTAINER ID   IMAGE                                                         COMMAND                   CREATED              STATUS                        PORTS                                       NAMES
a8e2192b852f   lincheng77/ubuntu:v2.0.1                                      "/bin/bash"               About a minute ago   Exited (127) 14 seconds ago                                               hopeful_fermi
b07e96c63d53   lincheng77/ubuntu:v2.0.1                                      "/bin/bash"               2 hours ago          Exited (0) 2 hours ago                                                    nice_newton
ffeda95cd8a7   ubuntu:latest                                                 "/bin/bash"               18 hours ago         Exited (127) 18 hours ago                                                 gallant_meitner
```

### 容器再启动

> 我们可以看到a8e2192b852f已经停止了（STATUS 状态为 Exited (127) 14 seconds ago），我们如何再次启动呢

```shell
[root@lincheng77 ~]# docker start a8e2192b852f
a8e2192b852f
[root@lincheng77 ~]# docker ps
CONTAINER ID   IMAGE                      COMMAND       CREATED          STATUS         PORTS            NAMES
a8e2192b852f   lincheng77/ubuntu:v2.0.1   "/bin/bash"   15 minutes ago   Up 6 seconds   22/tcp, 80/tcp   hopeful_fermi
```

### 容器停止和重启

```shell
[root@lincheng77 ~]# docker stop a8e2192b852f
a8e2192b852f
[root@lincheng77 ~]# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@lincheng77 ~]# docker start a8e2192b852f
a8e2192b852f
[root@lincheng77 ~]# docker restart a8e2192b852f
a8e2192b852f
[root@lincheng77 ~]# docker ps
CONTAINER ID   IMAGE                      COMMAND       CREATED          STATUS         PORTS            NAMES
a8e2192b852f   lincheng77/ubuntu:v2.0.1   "/bin/bash"   18 minutes ago   Up 3 seconds   22/tcp, 80/tcp   hopeful_fermi
```

### 后台模式与进入

```shell
[root@lincheng77 ~]# docker ps
CONTAINER ID   IMAGE                      COMMAND       CREATED          STATUS         PORTS            NAMES
a8e2192b852f   lincheng77/ubuntu:v2.0.1   "/bin/bash"   18 minutes ago   Up 3 seconds   22/tcp, 80/tcp   hopeful_fermi
[root@lincheng77 ~]# docker attach a8e2192b852f
root@a8e2192b852f:/# echo lincheng77
lincheng77
root@a8e2192b852f:/# exit
exit
[root@lincheng77 ~]# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

```shell
[root@lincheng77 ~]# docker start a8e2192b852f
a8e2192b852f
Execute a command in a running container
[root@lincheng77 ~]# docker exec -it a8e2192b852f /bin/bash
root@a8e2192b852f:/# exit
exit
[root@lincheng77 ~]# docker ps
CONTAINER ID   IMAGE                      COMMAND       CREATED          STATUS          PORTS            NAMES
a8e2192b852f   lincheng77/ubuntu:v2.0.1   "/bin/bash"   20 minutes ago   Up 54 seconds   22/tcp, 80/tcp   hopeful_fermi
```

### 容器导入和导出

### 强制停止容器

### 清理停止的容器

### 容器别名及操作

### 容器错误日志

## Docker 仓库



