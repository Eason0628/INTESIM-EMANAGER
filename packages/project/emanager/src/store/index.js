import { createStore } from 'vuex';

import tabs from "./module/tabs";
import user from "./module/user";
import menu from "./module/menu";

export default createStore({
    modules: {
        tabs,
        user,
        menu
    },
});
