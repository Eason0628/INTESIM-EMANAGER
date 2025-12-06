import router from "@/js/router";
import { DASHBOARD_URL } from "@/js/constant";

const getRouteIndex = (path, routes) => {
    return routes.findIndex((t) => t.fullPath == path || t.fullPath == path + "/");
};

export default {
    namespaced: true,
    state: {
        routes: [],
        path: undefined,
        openSort: 0,
    },
    mutations: {
        setOpenSort(state) {
            state.openSort++;
        },
        setPath(state, val) {
            state.path = val;
        },
        addRoute(state, val) {
            state.routes.push(val);
        },
        saveRoute(state) {
            sessionStorage.setItem("ROUTES", JSON.stringify(state.routes));
        },
        refreshRoute(state) {
            let route = sessionStorage.getItem("ROUTES");
            if (route) {
                state.routes = JSON.parse(route);
                console.log('state.routes',state.routes)
            }
        },
        updateRouteComponent(state, val) {
            let index = getRouteIndex(val, state.routes);
            if (index < 0) return;
            state.routes[index].component = val;
        },
        removeRoute(state, index) {
            if (index < 0) return;
            state.routes.splice(index, 1);
        },
        updateComponent(state, val) {
            let index = getRouteIndex(val, state.routes);
            if (index < 0) return;
            state.routes[index].time = new Date().getTime();
        },
        updateRouteOpenSort(state, val) {
            let index = getRouteIndex(val.fullPath, state.routes);
            if (index < 0) return;
            state.routes[index].openSort = val.openSort;
        },
    },
    actions: {
        open({ getters, commit }, route) {
            if (/\/*login\?*/.test(route.fullPath) || !route.matched.length) return;
            const r = getters["routes"].find((t) => t.fullPath == route.fullPath || t.fullPath == route.fullPath + "/");
            commit("setOpenSort");
            if (!route.matched[route.matched.length - 1].components.default.name) route.matched[route.matched.length - 1].components.default.name = route.matched[route.matched.length - 1].components.default.__name;
            if (!r) {
                commit("addRoute", {
                    fullPath: route.fullPath,
                    name: route.query && route.query.name ? route.query.name : route.name,
                    closable: route.meta.closable,
                    component: route.matched[route.matched.length - 1].components.default.name,
                    time: new Date().getTime(),
                    openSort: "/digitalTwins" == route.fullPath ? -1 : getters["openSort"],
                });
                const routes = getters["routes"];
                console.log(routes)
                commit("setPath", route.fullPath);
            } else {
                commit("updateRouteComponent", {
                    ...r,
                    component: route.matched[route.matched.length - 1].components.default.name,
                });
                commit("updateRouteOpenSort", {
                    fullPath: r.fullPath,
                    openSort: getters["openSort"],
                });
                commit("setPath", r.fullPath);
            }
        },
        openDefault() {
            router.push(DASHBOARD_URL);
        },
        close({ commit, getters, dispatch }, path) {
            const r = getRouteIndex(path, getters["routes"]);
            commit("removeRoute", r);

            if (getters["routes"].length == 0) {
                dispatch("openDefault");
                return;
            }
            let routes = JSON.parse(JSON.stringify(getters["routes"]));
            let routeBySort = routes.sort((a, b) => b.openSort - a.openSort);
            if (routeBySort.length > 0) router.push(routeBySort[0].fullPath);
            else dispatch("openDefault");
        },
        closeOthers({ getters, commit }, path) {
            const r = getRouteIndex(path, getters["routes"]);
            for (let i = getters["routes"].length - 1; i >= 0; i--) {
                if (getters["routes"][i].closable && r !== i) commit("removeRoute", i);
            }
            router.push(path);
        },
        closeAll({ commit, getters, dispatch }) {
            for (let i = getters["routes"].length - 1; i >= 0; i--) {
                if (getters["routes"][i].closable) commit("removeRoute", i);
            }
            dispatch("openDefault");
        },
    },
    getters: {
        path(state) {
            return state.path;
        },
        routes(state) {
            return state.routes;
        },
        routeKey(state) {
            let r = state.routes.find((t) => t.fullPath == state.path || t.fullPath == state.path + "/");
            if (!r) return new Date().getTime();
            return r.time;
        },
        openSort(state) {
            return state.openSort;
        },
    },
};
