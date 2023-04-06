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

