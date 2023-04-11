import {sidebar, SidebarOptions} from "vuepress-theme-hope";
import {nacos} from "./nacos/nacos"
// import {error} from "./nacos/error"




export const microService: SidebarOptions ={
        "/micro-service/nacos/": nacos, //在当前目录配置的erroe中的内容会嵌套在当前sidebar
        // "/micro-service/nacos/error": error, //error配置的erroe中的内容会开启一个新的sidebar
};