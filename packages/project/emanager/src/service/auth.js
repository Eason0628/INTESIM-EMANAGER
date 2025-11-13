import http from "../js/http";

export function login(user) {
    return http.post("userLogin", user);
}

export function getUserInfo() {
    return http.get("userInfo");
}

export function logout() {
    return http.post("userLogout");
}

export function changePs(data) {
    return http.post("pmp-eason/sys/user/update_pwd", data);
}
