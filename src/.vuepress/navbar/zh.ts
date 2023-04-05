import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "演示", icon: "discover", link: "/demo/" },
  {
    text: "博文",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "苹果",
        icon: "edit",
        prefix: "apple/",
        children: [
          { text: "苹果1", icon: "edit", link: "1" },
          { text: "苹果2", icon: "edit", link: "2" },
          "3",
          "4",
        ],
      },
      {
        text: "香蕉",
        icon: "edit",
        prefix: "banana/",
        children: [
          {
            text: "香蕉 1",
            icon: "edit",
            link: "1",
          },
          {
            text: "香蕉 2",
            icon: "edit",
            link: "2",
          },
          "3",
          "4",
        ],
      },
      { text: "樱桃", icon: "edit", link: "cherry" },
      { text: "火龙果", icon: "edit", link: "dragonfruit" },
      "tomato",
      "strawberry",
    ],
  },
  {
    text: "管理|部署",
    icon: "edit",
    prefix: "/manage-with-deploy/",
    children: [
      {
        text: "苹果",
        icon: "edit",
        prefix: "docker/",
        children: [
         
          { text: "Docker基础 - Overview", icon: "edit", link: "Docker基础 - Overview" },
          { text: "Docker基础 - Docker Vs. 虚拟机", icon: "edit", link: "Docker基础 - Docker Vs. 虚拟机" },
          { text: "Docker基础 - 入门基础和Hello World", icon: "edit", link: "Docker基础 - 入门基础和Hello World" },
          ],
      },
      ],
  },
  {
    text: "V2 文档",
    icon: "note",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);