import store from "@/store/index";
import { message } from "ant-design-vue";
import { TOKEN_KEY, THING_CODE } from "@/js/constant";
import axios from "axios";
import router from "@/js/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const service = axios.create({
    baseURL: "/api",
    timeout: 100000,
});

let loadingNum = 0;

function startLoading() {
    if (loadingNum === 0) NProgress.start();
    loadingNum++;
}

function endLoading() {
    loadingNum--;
    if (loadingNum <= 0) NProgress.done();
}

service.defaults.headers["Content-Type"] = "application/json; charset=utf-8";
service.defaults.headers["intesim_thing_code"] = THING_CODE;

service.interceptors.request.use(
    (config) => {
        if (config.method === 'post' && config.data) {
            const timestamp = new Date().toISOString();
            config.data = {
                ...config.data,
                a1: "APP-V1vGmHA-7833111139458675592-2",
                a2: "KEY035UvyhbsvXDuoopaM2b3H4jRRnjnBpt53gOXsdbj3",
                t1: timestamp,
            };
        }

        config.headers[TOKEN_KEY] = store.getters["user/token"];
        startLoading();
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        endLoading();
        const token = response?.data?.data?.token || "";
        if (token) {
            store.commit("user/setToken", token);
        }

        // *** ORIGINAL CODE
        // if (response.headers[TOKEN_KEY]) store.commit("user/setToken", response.headers[TOKEN_KEY]);
        return response.data;
    },
    (error) => {
        endLoading();
        if (error.response) {
            if (error.response.status === 401) {
                store.commit("user/setToken", "");
                router.push({
                    path: "/login",
                    query: {
                        redirect: router.currentRoute.value.path !== "/login" ? router.currentRoute.value.path : undefined,
                    },
                });
            } else if (error.response.status === 404) {
                message.error("Not Found!");
            } else message.error(error.response.data.message);
        }
        return Promise.reject(error);
    }
);
export default service;
