import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { commentPlugin } from "vuepress-plugin-comment2";

export default defineUserConfig({

  //指定 vuepress build 命令的输出目录
  //dest: "../dist/docs",

  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "博客演示",
      description: "vuepress-theme-hope 的博客演示",
    },
    "/en/": {
      lang: "en-US",
      title: "Blog Demo",
      description: "A blog demo for vuepress-theme-hope",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,

  plugins: [
    commentPlugin({
      // 插件选项
      provider: "Giscus", //评论服务提供者。
      comment: true, //启用评论功能
      repo: "lincheng77/giscus-repo", //远程仓库
      repoId: "MDEwOlJlcG9zaXRvcnkzNjg1OTk3NDM=", //对应自己的仓库Id
      category: "General",
      categoryId: "DIC_kwDOFfhiv84CWdWk" //对应自己的分类Id
    }),
    ],
});
