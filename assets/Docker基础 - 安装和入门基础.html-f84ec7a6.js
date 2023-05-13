import{_ as o,W as r,X as l,Y as e,Z as t,$ as a,a2 as s,C as d}from"./framework-6199cc12.js";const i={},c=e("h1",{id:"docker基础-安装和入门基础",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#docker基础-安装和入门基础","aria-hidden":"true"},"#"),t(" Docker基础 - 安装和入门基础")],-1),u=e("blockquote",null,[e("p",null,"在了解了虚拟化技术和Docker之后，让我们上手Docker，看看Docker是怎么工作的。这里会介绍CentOS环境下Docker的安装和配置，以及会给你展示两个实例，给你一个直观的理解。再啰嗦下，有条件的情况下直接看官网在新窗口打开, 网上资料鱼龙混杂，版本也更新不及时。")],-1),p=e("h2",{id:"docker-架构",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#docker-架构","aria-hidden":"true"},"#"),t(" Docker 架构")],-1),g=e("blockquote",null,[e("p",null,"理解如下的一些概念，你才知道安装什么")],-1),h=e("li",null,[e("p",null,"Docker 使用客户端-服务器（C/S）架构模式，使用远程API来管理和创建Docker容器。")],-1),b={href:"https://docs.docker.com/develop/sdk/",target:"_blank",rel:"noopener noreferrer"},k=s('<p>Docker包括三个基本概念：</p><ul><li><strong>镜像（Image）</strong>：相当于是一个root文件系统，比如官方镜像Ubuntu16.04就包含了完整的一套Ubuntu16.04最小系统的root文件系统。</li><li><strong>容器（Container）</strong>：镜像和容器的关系，就像是面向对象设计中的类和实例一样，1镜像是静态的定义，容器是镜像运行时的实体，容器可以被<u>创建</u>、<u>启动</u>、<u>停止</u>、<u>删除</u>、<u>暂停</u>等。</li><li><strong>仓库（Repository）</strong>：仓库是用来存放镜像的空间（例如Maven仓库，在本地找不到以来就会去远程仓库找）。</li></ul><figure><img src="http://image.edkso.cn/blog/docker-x-1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="docker安装" tabindex="-1"><a class="header-anchor" href="#docker安装" aria-hidden="true">#</a> Docker安装</h2><blockquote><p>从 2017 年 3 月开始 docker 在原来的基础上分为两个分支版本: Docker CE 和 Docker EE：Docker CE 即社区免费版；Docker EE 即企业版，强调安全，但需付费使用；按照官网上Docker Engine - Community包现在就是叫做Docker CE。这里将展示在CentOS上安装Docker。</p></blockquote><h3 id="安装要求" tabindex="-1"><a class="header-anchor" href="#安装要求" aria-hidden="true">#</a> 安装要求</h3>',6),m={href:"https://docs.docker.com/get-docker/",target:"_blank",rel:"noopener noreferrer"},f=e("li",null,"Centos7稳定版",-1),v={href:"https://docs.docker.com/desktop/install/linux-install/",target:"_blank",rel:"noopener noreferrer"},x=s(`<h3 id="卸载老的docker及依赖" tabindex="-1"><a class="header-anchor" href="#卸载老的docker及依赖" aria-hidden="true">#</a> 卸载老的Docker及依赖</h3><blockquote><p>为什么你可能还需要删除较低的Docker安装？因为较旧版本的Docker被称为docker或docker-engine（它是一个简化Docker安装的命令行工具，通过一个简单的命令行即可在相应的平台上安装Docker，比如VirtualBox、 Digital Ocean、Microsoft Azure）</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> yum remove <span class="token function">docker</span> <span class="token punctuation">\\</span>
                  docker-client <span class="token punctuation">\\</span>
                  docker-client-latest <span class="token punctuation">\\</span>
                  docker-common <span class="token punctuation">\\</span>
                  docker-latest <span class="token punctuation">\\</span>
                  docker-latest-logrotate <span class="token punctuation">\\</span>
                  docker-logrotate <span class="token punctuation">\\</span>
                  docker-engine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装一些依赖库" tabindex="-1"><a class="header-anchor" href="#安装一些依赖库" aria-hidden="true">#</a> 安装一些依赖库</h3><blockquote><p>如果没有安装yum请先安装yum</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils <span class="token punctuation">\\</span>
  device-mapper-persistent-data <span class="token punctuation">\\</span>
  lvm2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置下载docker的仓库</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> yum-config-manager <span class="token punctuation">\\</span>
    --add-repo <span class="token punctuation">\\</span>
    https://download.docker.com/linux/centos/docker-ce.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装docker-ce" tabindex="-1"><a class="header-anchor" href="#安装docker-ce" aria-hidden="true">#</a> 安装Docker CE</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="启动docker-ce" tabindex="-1"><a class="header-anchor" href="#启动docker-ce" aria-hidden="true">#</a> 启动Docker CE</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl start <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>测试是否安装成功</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl status <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="http://image.edkso.cn/blog/image-20230406174221906.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="仓库配置" tabindex="-1"><a class="header-anchor" href="#仓库配置" aria-hidden="true">#</a> 仓库配置</h2><blockquote><p>Docker 安装好以后，我们就要开始为拉取镜像准备了；国内从 DockerHub 拉取镜像有时会特别慢，此时可以<strong>配置镜像加速器</strong>。</p></blockquote><p>Docker 官方和国内很多云服务商都提供了国内加速器服务，比如：</p>`,18),y={href:"https://help.aliyun.com/document_detail/60750.html",target:"_blank",rel:"noopener noreferrer"},_={href:"http://hub-mirror.c.163.com",target:"_blank",rel:"noopener noreferrer"},D={href:"https://registry.docker-cn.com",target:"_blank",rel:"noopener noreferrer"},E={href:"https://docker.mirrors.ustc.edu.cn",target:"_blank",rel:"noopener noreferrer"},q={href:"https://www.daocloud.io/mirror#accelerator-doc%EF%BC%88%E6%B3%A8%E5%86%8C%E5%90%8E%E4%BD%BF%E7%94%A8%EF%BC%89",target:"_blank",rel:"noopener noreferrer"},w=s(`<p><strong>这里配置以 Docker官方中国的加速器</strong>：</p><p>对于使用Centos7系统，请在 /etc/docker/daemon.json 中写入如下内容（如果文件不存在请新建该文件）</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span><span class="token property">&quot;registry-mirrors&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&quot;https://registry.docker-cn.com&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后重新启动服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl daemon-reload
<span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="镜像查看和拉取" tabindex="-1"><a class="header-anchor" href="#镜像查看和拉取" aria-hidden="true">#</a> 镜像查看和拉取</h2><p>拉取hello world</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull hello-world:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@lincheng77 ~<span class="token punctuation">]</span><span class="token comment"># docker pull hello-world:latest</span>
latest: Pulling from library/hello-world
2db29710123e: Pull complete 
Digest: sha256:ffb13da98453e0f04d33a6eee5bb8e46ee50d08ebe17735fc0779d0349e889e9
Status: Downloaded newer image <span class="token keyword">for</span> hello-world:latest
docker.io/library/hello-world:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看本地仓库中的镜像（images）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@lincheng77 ~<span class="token punctuation">]</span><span class="token comment"># docker images</span>
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
hello-world   latest    feb5d9fea6a5   <span class="token number">18</span> months ago   <span class="token number">13</span>.3kB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行hello-world这个镜像</p><figure><img src="http://image.edkso.cn/image-20230406185703200.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p>注意, 如果你在没有镜像的时候，直接<code>docker run hello-world</code>也是可以的；它会先检查本地是否有这个镜像，没有的话会先从指定仓库中拉取。</p></blockquote><h2 id="容器实例-ubuntu实例" tabindex="-1"><a class="header-anchor" href="#容器实例-ubuntu实例" aria-hidden="true">#</a> 容器实例-ubuntu实例</h2><blockquote><p>Hello-world是一个官方的容器实例，然后再通过介绍运行ubuntu的实例来全面理解如何跑一个Docker实例</p></blockquote><h3 id="在ubuntu容器中跑hello-world" tabindex="-1"><a class="header-anchor" href="#在ubuntu容器中跑hello-world" aria-hidden="true">#</a> 在Ubuntu容器中跑Hello world</h3><p>Docker 允许你在容器内运行应用程序， 使用 docker run 命令来在容器内运行一个应用程序。这里同样是个Hello World，不同在于它是在容器内部运行的。</p><figure><img src="http://image.edkso.cn/blog/image-20230406190617353.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>命令参数解释：</strong></p><table><thead><tr><th style="text-align:left;">参数</th><th style="text-align:center;">解释</th></tr></thead><tbody><tr><td style="text-align:left;"><strong><code>docker</code></strong></td><td style="text-align:center;">Docker 的二进制执行文件</td></tr><tr><td style="text-align:left;"><strong><code>run</code></strong></td><td style="text-align:center;">运行一个容器</td></tr><tr><td style="text-align:left;"><strong><code>ubuntu:latest</code></strong></td><td style="text-align:center;">指定要运行的镜像，Docker 首先从本地主机上查找镜像是否存在，如果不存在，Docker 就会从镜像仓库 Docker Hub 下载公共镜像</td></tr><tr><td style="text-align:left;"><strong><code>/bin/echo &quot;Hello world&quot;</code></strong></td><td style="text-align:center;">在启动的容器里执行的命令</td></tr></tbody></table><h3 id="在ubuntu容器中交互" tabindex="-1"><a class="header-anchor" href="#在ubuntu容器中交互" aria-hidden="true">#</a> 在Ubuntu容器中交互</h3><blockquote><p>以上面例子，容器跑的是Ubuntu是一个系统实例，能否进入系统进行交互呢？</p></blockquote><p>下面是一个在ubuntu容器中交互的例子：</p><figure><img src="http://image.edkso.cn/blog/image-20230406191159347.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>命令参数解释：</strong></p><table><thead><tr><th style="text-align:left;">参数</th><th style="text-align:center;">解释</th></tr></thead><tbody><tr><td style="text-align:left;"><strong><code>-t</code></strong></td><td style="text-align:center;">在新容器内指定一个伪终端或终端</td></tr><tr><td style="text-align:left;"><strong><code>-i</code></strong></td><td style="text-align:center;">允许你对容器内的标准输入 (STDIN) 进行交互</td></tr></tbody></table><h3 id="让ubuntu容器在后台运行" tabindex="-1"><a class="header-anchor" href="#让ubuntu容器在后台运行" aria-hidden="true">#</a> 让Ubuntu容器在后台运行</h3><blockquote><p>我们先来看, 当我们跑完上面例子之后，我们看下后台是否有docker容器实例？</p></blockquote><p>我们可以看到没有容器实例</p><figure><img src="http://image.edkso.cn/blog/image-20230406192744363.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>我们运行下面命令：</p><figure><img src="http://image.edkso.cn/blog/image-20230406192900195.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>仅仅输出了一个长长的无规律的字符串，这个字符串叫做<strong>容得ID</strong>，对每个容器来说都是唯一的，我们可以通过<strong>容器ID</strong>来查看对应的容器发生了什么</p><p>我们再次输入<code>docker ps</code>命令可以看到有在运行的容器实例</p><figure><img src="http://image.edkso.cn/blog/image-20230406193138048.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>然后我们再输入**<code>docker logs ce148270abdc</code>**来查看容器运行日志（ce148270abdc注意替换为自己对应的容器ID）</p><img src="http://image.edkso.cn/blog/image-20230406193520885.png" alt="image-20230406193520885" style="zoom:67%;"><p>最后我们看下，如何关闭后台实例</p><figure><img src="http://image.edkso.cn/blog/image-20230406193634215.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>以上命令参数解释：</strong></p><table><thead><tr><th style="text-align:left;">参数</th><th style="text-align:center;">解释</th></tr></thead><tbody><tr><td style="text-align:left;"><strong><code>ps</code></strong></td><td style="text-align:center;">查看运行中的实例</td></tr><tr><td style="text-align:left;"><strong><code>-d</code></strong></td><td style="text-align:center;">让容器实例在后台运行</td></tr><tr><td style="text-align:left;"><strong><code>logs</code></strong></td><td style="text-align:center;">查看容器实例运行日志</td></tr><tr><td style="text-align:left;"><strong><code>stop</code></strong></td><td style="text-align:center;">停止一个容器</td></tr></tbody></table><p><strong>以上输出参数解释：</strong></p><table><thead><tr><th style="text-align:left;">参数</th><th style="text-align:center;">解释</th></tr></thead><tbody><tr><td style="text-align:left;"><strong><code>CONTAINER ID</code></strong></td><td style="text-align:center;">容器 ID</td></tr><tr><td style="text-align:left;"><strong><code>IMAGE</code></strong></td><td style="text-align:center;">使用的镜像</td></tr><tr><td style="text-align:left;"><strong><code>COMMAND</code></strong></td><td style="text-align:center;">启动容器时运行的命令</td></tr><tr><td style="text-align:left;"><strong><code>CREATED</code></strong></td><td style="text-align:center;">容器的创建时间</td></tr><tr><td style="text-align:left;"><strong><code>STATUS</code></strong></td><td style="text-align:center;">容器状态(状态有7种)<br>created（已创建）<br>restarting（重启中）<br> running（运行中）<br> removing（迁移中）<br> paused（暂停）<br> exited（停止）<br> dead（死亡）</td></tr><tr><td style="text-align:left;"><strong><code>PORTS</code></strong></td><td style="text-align:center;">容器的端口信息和使用的连接类型（tcp\\udp）</td></tr><tr><td style="text-align:left;"><strong><code>NAMES</code></strong></td><td style="text-align:center;">自动分配的容器名称</td></tr></tbody></table>`,44);function C(I,S){const n=d("ExternalLinkIcon");return r(),l("div",null,[c,u,p,g,e("ul",null,[h,e("li",null,[e("p",null,[t("Docker客户端（Client）：Docker客户端通过命令行或者其他工具（如Docker SDK["),e("a",b,[t("https://docs.docker.com/develop/sdk/"),a(n)]),t("]）与Docker的守护进程通信。")])])]),k,e("p",null,[t("这里以Centos举例：（其他Linux操作参考官网文档："),e("a",m,[t("Get Docker"),a(n)]),t("）[我个人不推荐使用Windows安装]")]),e("ul",null,[f,e("li",null,[t("安装遇到问题再参考"),e("a",v,[t("Install Docker Desktop on Linux "),a(n)]),t("中的System requirements")])]),x,e("ul",null,[e("li",null,[t("阿里云的加速器："),e("a",y,[t("https://help.aliyun.com/document_detail/60750.html"),a(n)])]),e("li",null,[t("网易加速器："),e("a",_,[t("http://hub-mirror.c.163.com"),a(n)])]),e("li",null,[t("Docker官方中国加速器："),e("a",D,[t("https://registry.docker-cn.com"),a(n)])]),e("li",null,[t("ustc 的镜像："),e("a",E,[t("https://docker.mirrors.ustc.edu.cn"),a(n)])]),e("li",null,[t("daocloud："),e("a",q,[t("https://www.daocloud.io/mirror#accelerator-doc（注册后使用）"),a(n)])])]),w])}const z=o(i,[["render",C],["__file","Docker基础 - 安装和入门基础.html.vue"]]);export{z as default};
