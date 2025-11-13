import { TOKEN_KEY } from "@/js/constant";
import { getUserMenus } from "@/service/menu";
import { list2tree } from "@/js/util";
import { getUserInfo } from "@/service/auth";

const routeAllPathToCompMap = import.meta.glob(`@/views/**/*.vue`);
let permissions = [];

export function tree2list(tree) {
    let data = [];
    while (tree.length) {
        let { children, ...item } = tree.pop();
        if (item.menuType === 4) continue;
        else if (item.menuType === 2) {
            permissions.push(item.menuUrl);
            continue;
        }

        let obj = {
            path: item.menuUrl,
            name: item.menuName,
            component: item.menuWinformName,
            sortNum: item.sortNum,
            meta: { closable: true, icon: item.menuIcon },
            menuId: item.menuId,
            menuParentId: item.menuParentId,
        };
        if (item.menuWinArgs) {
            obj.meta.taskWorkFlowId = item.menuWinArgs.split("&")?.[0].split("=")?.[1];
            obj.meta.diagTitle = item.menuWinArgs.split("&")?.[1].split("=")?.[1];
        }
        data.push(obj);
        if (children) for (let i = children.length - 1; i >= 0; i--) tree.push(children[i]);
    }
    return data;
}

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem(TOKEN_KEY) ? localStorage.getItem(TOKEN_KEY) : "",
        theme: localStorage.getItem("THEME_TYPE") ? localStorage.getItem("THEME_TYPE") : "1",
        userInfo: {},
        menus: [],
        routes: [],
        route: {},
        permissions: permissions,
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
        setMenus(state, val) {
            state.menus = val;
        },
        setRoutes(state, val) {
            state.routes = val;
        },
    }, actions: {
        SetMenus({ commit }) {
            return new Promise((resolve, reject) => {
                getUserMenus()
                    .then((res) => {
                        console.log(res)
                        if (!res.data) return;
                        let data = tree2list(res.data);
                        data.forEach((t) => {
                            if (t.path && !t.path.startsWith("/layout")) t.path = "/layout" + t.path;
                        });
                        commit("setMenus", list2tree(data, "menuId", "menuParentId", "children"));
                        commit("setRoutes", data);
                        data.forEach((r) => {
                            if (r.component) {
                                try {
                                    r.component = routeAllPathToCompMap[`/src/views/${r.component}`];
                                } catch {
                                    r.component = null;
                                }
                            }
                        });
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                    });

                getUserInfo().then((res) => {
                    if (!res.data) return;
                    commit("setUserInfo", res.data);
                });
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
        }, permissions(state) {
            return state.permissions;
        },
    }
}