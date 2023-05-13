import { arraySidebar } from "vuepress-theme-hope";


export const nacos = arraySidebar([
    "",
    {
        text: "安装部署",
        icon: "module",
        collapsible: true,  // 可选的, 设置分组是否可以折叠，默认值是 false,
        children: [
            {
                text: "Nacos单机集群部署搭建",
                link: "Nacos单机集群部署搭建"
            },
            {
                text: "Nacos单机集群部署搭建1",
                link: "Nacos单机集群部署搭建1"
            },
        ]
    },
    {
        text: "错误总结",
        icon: "module",
        collapsible: true,

        //link: "/micro-service/nacos/error",// 可选的, 分组标题(错误总结)对应的链接

        prefix: "error/",// 可选的，会添加到每个children item 链接地址之前

        children: [
            {
                text: "Nacos2.2版本Tomcat启动报错",
                link: "Nacos2.2版本Tomcat启动报错"
            },
            {
                text: "Nacos2.2版本Tomcat启动报错",
                link: "Nacos2.2版本Tomcat启动报错"
            },
        ]
    },
    {
        text: "快速搭建",
        icon: "module",
        children: [
            {
                text: "Nacos2.2版本Tomcat启动报错",
                link: "error/Nacos2.2版本Tomcat启动报错"
            },
            "windows/",
             "github/"
        ]
    },    
]);