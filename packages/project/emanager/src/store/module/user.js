import { TOKEN_KEY } from "@/js/constant";
export default {
    namespaced: true,
    state: {
        token: localStorage.getItem(TOKEN_KEY) ? localStorage.getItem(TOKEN_KEY) : "",
        userInfo: {},
        theme: localStorage.getItem("THEME_TYPE") ? localStorage.getItem("THEME_TYPE") : "1",
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
    }, actions: {

    }, getters: {
        token(state) {
            return state.token;
        },
        theme(state) {
            return state.theme;
        },
    }
}