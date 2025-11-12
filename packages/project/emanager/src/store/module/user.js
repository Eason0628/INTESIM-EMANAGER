import { TOKEN_KEY } from "@/js/constant";
import { getUserMenus } from "@/service/menu";
export default {
    namespaced: true,
    state: {
        token: localStorage.getItem(TOKEN_KEY) ? localStorage.getItem(TOKEN_KEY) : "",
        theme: localStorage.getItem("THEME_TYPE") ? localStorage.getItem("THEME_TYPE") : "1",
        userInfo: {},
        menus: [],
        routes: [],
        route: {},
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            if (token) localStorage.setItem(TOKEN_KEY, token);
            else {
                localStorage.removeItem(TOKEN_KEY);
                location.href = "/login";
            }
        },
        setTheme(state, val) {
            state.theme = val;
        },
        setRoute(state, val) {
            state.route = val;
        },
        setRoutes(state, val) {
            state.routes = val;
        },
        setUserInfo(state, val) {
            state.userInfo = val;
        },
    }, actions: {
        SetMenus({ commit }) {
            return new Promise((resolve, reject) => {
                getUserMenus()
                    .then((res) => {
                        console.log(res)
                        // if (!res.data) return;
                        // let data = tree2list(res.data);
                        // data.forEach((t) => {
                        //     if (t.path && !t.path.startsWith("/layout")) t.path = "/layout" + t.path;
                        // });
                        // commit("setMenus", list2tree(data, "menuId", "menuParentId", "children"));
                        // commit("setRoutes", data);
                        // data.forEach((r) => {
                        //     if (r.component) {
                        //         try {
                        //             r.component = routeAllPathToCompMap[`/src/views/${r.component}`];
                        //         } catch {
                        //             r.component = null;
                        //         }
                        //     }
                        // });
                        // resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                // userInfo().then((res) => {
                //     if (!res.data) return;
                //     commit("setUserInfo", res.data);
                // });
            });
        },
    }, getters: {
        token(state) {
            return state.token;
        },
        theme(state) {
            return state.theme;
        },
        routes(state) {
            return state.routes;
        },
        route(state) {
            return state.route;
        }, userInfo(state) {
            return state.userInfo;
        },
    }
}