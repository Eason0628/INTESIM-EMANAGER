import http from "../js/http";

export function getUserMenus() {
    return http.post("/menus");
}