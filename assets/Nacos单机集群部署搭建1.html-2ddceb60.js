import{_ as c,W as t,X as r,Y as e,Z as a,$ as s,a1 as d,a2 as i,C as n}from"./framework-6199cc12.js";const u={},p=i('<h1 id="nacos-单机-集群部署搭建" tabindex="-1"><a class="header-anchor" href="#nacos-单机-集群部署搭建" aria-hidden="true">#</a> Nacos 单机&amp;集群部署搭建</h1><blockquote><p>本文介绍为Nacos2.2 版本配置，其他版本请注意根据情况而定</p></blockquote><h2 id="nacos部署环境" tabindex="-1"><a class="header-anchor" href="#nacos部署环境" aria-hidden="true">#</a> Nacos部署环境</h2><blockquote><p>Nacos定义为一个IDC内部应用组件，并非面向公网环境的产品，建议在内部隔离网络环境中部署，强烈不建议部署在公共网络环境。</p></blockquote><h2 id="nacos部署模式" tabindex="-1"><a class="header-anchor" href="#nacos部署模式" aria-hidden="true">#</a> Nacos部署模式</h2><ul><li>单机模式 - 用于测试和单机试用。</li><li>集群模式 - 用于生产环境，确保高可用。</li><li>多集群模式 - 用于多数据中心场景。</li></ul><h2 id="nacos环境准备" tabindex="-1"><a class="header-anchor" href="#nacos环境准备" aria-hidden="true">#</a> Nacos环境准备</h2><ul><li>安装好 JDK，需要 1.8 及其以上版本</li><li>建议: 2核 CPU / 4G 内存 及其以上</li><li>建议: 生产环境 3 个节点 及其以上</li></ul><h2 id="nacos配置准备" tabindex="-1"><a class="header-anchor" href="#nacos配置准备" aria-hidden="true">#</a> Nacos配置准备</h2>',9),h=e("p",null,[e("code",null,"conf"),a("目录下的"),e("code",null,"application.properties"),a("文件")],-1),m=e("code",null,"nacos.core.auth.plugin.nacos.token.secret.key=SecretKey012345678901234567890123456789012345678901234567890123456789",-1),b={href:"https://nacos.io/zh-cn/docs/v2/guide/plugin/auth-plugin.html",target:"_blank",rel:"noopener noreferrer"},v=i(`<blockquote><p>注意，文档中的默认值<code>SecretKey012345678901234567890123456789012345678901234567890123456789</code>和<code>VGhpc0lzTXlDdXN0b21TZWNyZXRLZXkwMTIzNDU2Nzg=</code>为公开默认值，可用于临时测试，实际使用时请<strong>务必</strong>更换为自定义的其他有效值。</p></blockquote><h2 id="nacos单机模式" tabindex="-1"><a class="header-anchor" href="#nacos单机模式" aria-hidden="true">#</a> Nacos单机模式</h2><h3 id="单机模式启动" tabindex="-1"><a class="header-anchor" href="#单机模式启动" aria-hidden="true">#</a> 单机模式启动</h3><ul><li><strong>Linux/Unix/Mac</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sh</span> startup.sh <span class="token parameter variable">-m</span> standalone
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>Windows</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ cmd startup.cmd <span class="token parameter variable">-m</span> standalone
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="配置mysql数据库" tabindex="-1"><a class="header-anchor" href="#配置mysql数据库" aria-hidden="true">#</a> 配置mysql数据库</h3><p>在0.7版本之前，在单机模式时nacos使用嵌入式数据库实现数据的存储，不方便观察数据存储的基本情况。0.7版本增加了支持mysql数据源能力，具体的操作步骤：</p><ul><li>1.安装数据库，版本要求：5.6.5+</li><li>2.初始化mysql数据库，数据库初始化文件：mysql-schema.sql（在conf目录下）</li><li>3.修改conf/application.properties文件，增加支持mysql数据源配置（目前只支持mysql，官方文档在2023年4月还是这样写的，大家可以看下配置文件），添加mysql数据源的url、用户名和密码。</li></ul><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.datasource.platform</span><span class="token punctuation">=</span><span class="token value attr-value">mysql</span>
<span class="token key attr-name">db.num</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">db.url.0</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc:mysql://11.162.196.16:3306/nacos_devtest?characterEncoding=utf8&amp;connectTimeout=1000&amp;socketTimeout=3000&amp;autoReconnect=true</span>
<span class="token key attr-name">db.user</span><span class="token punctuation">=</span><span class="token value attr-value">nacos_devtest</span>
<span class="token key attr-name">db.password</span><span class="token punctuation">=</span><span class="token value attr-value">youdontknow</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再以单机模式启动nacos，nacos所有写嵌入式数据库的数据都写到了mysql</p><blockquote><p>官方在2.2（具体哪一个版本不清楚，我在2.2版本的配置文件中看到）版本推荐，spring.sql.init.platform =mysql 这样来配置mysql启动</p></blockquote><figure><img src="http://image.edkso.cn/blog/image-20230410230112943.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="nacos集群模式" tabindex="-1"><a class="header-anchor" href="#nacos集群模式" aria-hidden="true">#</a> Nacos集群模式</h2><blockquote><p>3个或3个以上Nacos节点才能构成集群。</p></blockquote><h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h3><ul><li>在nacos的解压目录nacos/的conf目录下，有配置文件cluster.conf，请每行配置成ip:port。（请配置3个或3个以上节点）</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># ip:port</span>
<span class="token number">200.8</span>.9.16:8848
<span class="token number">200.8</span>.9.17:8848
<span class="token number">200.8</span>.9.18:8848
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>如果是单台机器部署集群模式，还要修改<code>conf</code>目录下的<code>application.properties</code>文件，把server.port=8848 分别修改为不同的端口，同时不要使用连续的端口，至于为什么可以参考我的这篇文章//TODO</li><li>application.properties的数据源配置注意保持一致</li></ul><h3 id="集群模式启动" tabindex="-1"><a class="header-anchor" href="#集群模式启动" aria-hidden="true">#</a> 集群模式启动</h3><h4 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h4><blockquote><p>使用内置数据源</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sh</span> startup.sh <span class="token parameter variable">-p</span> embedded
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>使用外置数据源</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sh</span> startup.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="停止" tabindex="-1"><a class="header-anchor" href="#停止" aria-hidden="true">#</a> 停止</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sh</span> shutdown.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,28);function k(g,f){const l=n("RouterLink"),o=n("ExternalLinkIcon");return t(),r("div",null,[p,e("p",null,[a("这里说的配置单机模式，集群模式都要配置，为什么要配置参考我的另外一篇文章 "),s(l,{to:"/micro-service/nacos/Nacos2.2%E7%89%88%E6%9C%ACTomcat%E5%90%AF%E5%8A%A8%E6%8A%A5%E9%94%99.html"},{default:d(()=>[a("Nacos2.2版本Tomcat启动报错.md")]),_:1}),a(" //TODO")]),h,e("p",null,[a("设置其中的"),m,a("值，详情可查看"),e("a",b,[a("官方文档：鉴权-自定义密钥 "),s(o)]),a(".")]),v])}const q=c(u,[["render",k],["__file","Nacos单机集群部署搭建1.html.vue"]]);export{q as default};
