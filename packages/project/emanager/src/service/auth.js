import http from "../js/http";

export function login(user) {
    return http.post("v1/userLogin", user);
}

export function userInfo() {
    return http.get("pmp-eason/sys/user/logger");
}

export function logout() {
    return http.post("pmp-eason/auth/logout");
}

export function changePs(data) {
    return http.post("pmp-eason/sys/user/update_pwd", data);
}
