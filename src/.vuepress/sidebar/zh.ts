import {sidebar} from "vuepress-theme-hope";

import {microService} from "./zh/micro-service/micro-service";
import {ManageWithDeploy} from "./zh/manage-with-deploy/manage-with-deploy";
export const zhSidebar = sidebar(
    Object.assign(
        microService,
        ManageWithDeploy,
    {
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
}))


// export const zhSidebar = sidebar({
//   "/": [
//     "",
//     {
//       text: "如何使用",
//       icon: "creative",
//       prefix: "demo/",
//       link: "demo/",
//       children: "structure",
//     },
//     {
//       text: "文章",
//       icon: "note",
//       prefix: "posts/",
//       children: "structure",
//     },
//     {
//       text: "部署",
//       icon: "note",
//       prefix: "manage-with-deploy/",
//       children: "structure",
//     },
//     "intro",
//     "slides",
//   ],
// });
