import {sidebar, SidebarOptions} from "vuepress-theme-hope";
import {nacos} from "./nacos/nacos"




export const microService: SidebarOptions ={
        "/micro-service/nacos/": nacos,
};