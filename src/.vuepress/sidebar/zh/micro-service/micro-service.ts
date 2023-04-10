import {sidebar, SidebarOptions} from "vuepress-theme-hope";
import {nacos} from "./nacos/nacos"
// import {error} from "./nacos/error"




export const microService: SidebarOptions ={
        "/micro-service/nacos/": nacos,
        // "/micro-service/nacos/error": error,
};