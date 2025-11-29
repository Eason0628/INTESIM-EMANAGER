import { TOKEN_KEY } from "@/js/constant";
import { getUserMenus } from "@/service/menu";
import { list2tree } from "@common/ts/util";
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
        }
    }, actions: {
        async SetMenus({ commit }) {
            let menuData = [
                {
                    "menuId": 1,
                    "menuName": "menu.tool_integration",
                    "menuIcon": "ApartmentOutlined",
                    "menuType": 0,
                    "menuUrl": "",
                    "menuWinformName": "",
                    "sortNum": 1,
                    "menuParentId": 0,
                    "children": [
                        {
                            "menuId": 2,
                            "menuName": "menu.tool_application",
                            "menuIcon": "ApiOutlined",
                            "menuType": 1,
                            "menuUrl": "/tool/application",
                            "menuWinformName": "system/tool/application/index.vue",
                            "sortNum": 2,
                            "menuParentId": 1,
                            "children": []
                        },
                        {
                            "menuId": 3,
                            "menuName": "menu.tool_management",
                            "menuIcon": "AimOutlined",
                            "menuType": 1,
                            "menuUrl": "/tool/management",
                            "menuWinformName": "system/tool/management/index.vue",
                            "sortNum": 3,
                            "menuParentId": 1,
                            "children": []
                        }
                    ]
                },
                {
                    "menuId": 4,
                    "menuName": "menu.system",
                    "menuIcon": "AppleOutlined",
                    "menuType": 0,
                    "menuUrl": "",
                    "menuWinformName": "",
                    "sortNum": 4,
                    "menuParentId": 0,
                    "children": [
                        {
                            "menuId": 5,
                            "menuName": "menu.data_management",
                            "menuIcon": "FormatPainterOutlined",
                            "menuType": 0,
                            "menuUrl": "",
                            "menuWinformName": "",
                            "sortNum": 5,
                            "menuParentId": 4,
                            "children": [
                                {
                                    "menuId": 6,
                                    "menuName": "menu.data_copy",
                                    "menuIcon": "AlertOutlined",
                                    "menuType": 1,
                                    "menuUrl": "/data/management",
                                    "menuWinformName": "system/data/management/index.vue",
                                    "sortNum": 6,
                                    "menuParentId": 5,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "menuId": 7,
                            "menuName": "menu.user_management",
                            "menuIcon": "FilePdfOutlined",
                            "menuType": 0,
                            "menuUrl": "",
                            "menuWinformName": "",
                            "sortNum": 7,
                            "menuParentId": 4,
                            "children": [
                                {
                                    "menuId": 8,
                                    "menuName": "menu.user_authority",
                                    "menuIcon": "AuditOutlined",
                                    "menuType": 1,
                                    "menuUrl": "/user/authority",
                                    "menuWinformName": "system/user/authority/index.vue",
                                    "sortNum": 8,
                                    "menuParentId": 7,
                                    "children": []
                                },
                                {
                                    "menuId": 9,
                                    "menuName": "menu.user_rule",
                                    "menuIcon": "AlertOutlined",
                                    "menuType": 1,
                                    "menuUrl": "/user/rule",
                                    "menuWinformName": "system/user/rule/index.vue",
                                    "sortNum": 9,
                                    "menuParentId": 7,
                                    "children": []
                                }
                            ]
                        }
                    ]
                }
            ];

            let data = tree2list(menuData);
            data.forEach((t) => {
                if (t.path && !t.path.startsWith("/layout")) {
                    t.path = "/layout" + t.path;
                }
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

            const res = await getUserInfo();
            if (res?.data) commit("setUserInfo", res.data);
            return data;
        }

        // SetMenus({ commit }) {
        //     return new Promise((resolve, reject) => {
        //         getUserMenus()
        //             .then((res) => {
        //                 debugger;
        //                 console.log(res);
        //                 if (!res.data) return;
        //                 let data = tree2list(res.data);
        //                 data.forEach((t) => {
        //                     if (t.path && !t.path.startsWith("/layout")) t.path = "/layout" + t.path;
        //                 });
        //                 commit("setMenus", list2tree(data, "menuId", "menuParentId", "children"));
        //                 commit("setRoutes", data);
        //                 data.forEach((r) => {
        //                     if (r.component) {
        //                         try {
        //                             r.component = routeAllPathToCompMap[`/src/views/${r.component}`];
        //                         } catch {
        //                             r.component = null;
        //                         }
        //                     }
        //                 });
        //                 resolve(data);
        //             })
        //             .catch((error) => {
        //                 reject(error);
        //             });
        //         getUserInfo().then((res) => {
        //             if (!res.data) return;
        //             commit("setUserInfo", res.data);
        //         });
        //     });
        // },
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
        },
        userInfo(state) {
            return state.userInfo;
        },
        permissions(state) {
            return state.permissions;
        },
        menus(state) {
            return state.menus;
        },
    }
}