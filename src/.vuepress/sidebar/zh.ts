import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "如何使用",
      icon: "creative",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "文章",
      icon: "note",
      prefix: "posts/",
      children: "structure",
    },
    {
      text: "部署",
      icon: "note",
      prefix: "manage-with-deploy/",
      children: "structure",
    },
    "intro",
    "slides",
  ],
});