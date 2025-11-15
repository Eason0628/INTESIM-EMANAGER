import http from "../js/http";

export function login(user) {
    return http.post("userLogin", user);
}

export function getUserInfo() {
    return http.post("userInfo");
}

export function logout() {
    return http.post("userLogout");
}
