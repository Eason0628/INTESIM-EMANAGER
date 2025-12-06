<template>
    <div class="user-layout">
        <div class="title">仿真数据管理平台</div>
        <a-row class="formRow">
            <a-col :offset="16" :span="8">
                <div class="login-panel-form">
                    <img class="titlePic" :src="imgSrc" />
                    <div class="topTitle">{{ $t("login.userLogin") }}</div>
                    <a-form :model="user" :rules="rules" ref="formRef" layout="vertical">
                        <a-form-item>
                            <a-input v-model:value="user.user" :placeholder="$t('login.inputUserName')">
                                <template #prefix>
                                    <Icon icon="UserOutlined" />
                                    <a-divider type="vertical" />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item class="rememberMeBefore">
                            <a-input-password v-model:value="user.password" :placeholder="$t('login.inputPassWord')">
                                <template #prefix>
                                    <Icon icon="LockOutlined" />
                                    <a-divider type="vertical" />
                                </template>
                            </a-input-password>
                        </a-form-item>
                        <a-form-item name="rememberMe" class="rememberMe">
                            <a-checkbox v-model:checked="rememberMe">{{ $t("login.remeberPass") }}</a-checkbox>
                        </a-form-item>
                        <a-form-item class="between">
                            <a-button class="commitButton" block @click="onSubmit">{{ $t("login.login") }}</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { reactive, ref, toRefs } from "vue";
import { encrypt, decrypt } from "@/js/aes";
import { Icon } from "@common/components/icons";
import { login } from "@/service/auth";

export default {
    components: { Icon },
    name: "Login",
    setup() {
        const { t } = useI18n();
        const formRef = ref();
        const router = useRouter();

        let state = reactive({
            curYear: new Date().getFullYear(),
            user: {
                user: "",
                password: "",
            },
            rememberMe: false,
            rules: {
                user: [{ required: true, message: t("login.inputUserNameCheck"), trigger: "blur", },],
                password: [{ required: true, message: t("login.inputPassWordCheck"), trigger: "blur", },],
            },
            title: "",
            imgSrc: "/images/Logo_p.png",
        });

        const onSubmit = () => {
            formRef.value.validate().then(() => {
                login(state.user).then((res) => {
                    if (state.rememberMe)
                        setCookit(state.user.user, state.user.password, 7);
                    else setCookit("", "", -1);
                    if (router.currentRoute.value.query.redirect) {
                        router.push(router.currentRoute.value.query.redirect);
                    }
                    else {
                        router.push("/");
                    }
                    sessionStorage.removeItem("ROUTES");
                    localStorage.setItem('userIp', res.data.userIp)
                });
            })
                .catch(() => { });
        };

        const getCookie = () => {
            if (document.cookie.length > 0) {
                let arr = document.cookie.split("; ");
                for (let i = 0; i < arr.length; i++) {
                    let arr2 = arr[i].split("=");
                    if (arr2[0] === "user") state.user.user = arr2[1];
                    else if (arr2[0] === "password")
                        state.user.password = decrypt(arr2[1]);
                }
                state.rememberMe = true;
            }
        };
        const setCookit = (name, password, exdays) => {
            let exDate = new Date();
            exDate.setTime(exDate.getTime() + 24 * 60 * 60 * 1000 * exdays);
            document.cookie = `user=${name};path=/;expires=${exDate.toGMTString()}`;
            document.cookie = `password=${encrypt(password)};path=/;expires=${exDate.toGMTString()}`;
        };

        getCookie();
        return {
            ...toRefs(state),
            formRef,
            getCookie,
            setCookit,
            onSubmit
        }
    }
};
</script>

<style lang="less" scoped>
.user-layout {
    display: flex;
    flex-direction: column;
    background: url(/images/loginBack.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;

    .title {
        flex: 2;
        color: #fff;
        font-size: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .formRow {
        flex: 3;

        .login-panel-form {
            border-radius: 4px;
            box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
            padding: 16px;
            width: 340px;
            background: #fff;
            height: 360px;

            .titlePic {
                height: 0px;
                margin-bottom: 10px;
            }

            .topTitle {
                font-size: 18px;
                margin: 10px 0;
                text-align: center;
                letter-spacing: 2px;
                font-weight: 600;
            }

            .ant-form {
                margin: 0 20px;

                .ant-input-affix-wrapper {
                    border-color: var(--primary-color);
                }

                .rememberMeBefore {
                    margin-bottom: 4px;
                }

                .rememberMe {
                    margin-bottom: 10px;

                    .ant-checkbox-wrapper {
                        color: #aaa;
                    }
                }

                .ant-input-prefix {
                    .anticon {
                        color: var(--primary-color);
                    }
                }

                :deep(.ant-input) {
                    height: 30px;
                }
            }

            .commitButton {
                width: 100%;
                background-image: linear-gradient(to right, #589eff, #7bc1ff) !important;
                border-radius: 4px;
                height: 40px;
                font-size: 16px;
                color: #fff !important;
                border-color: #ccc;
            }

            .commitButton:hover {
                background-image: linear-gradient(to right, #589eff, #7bc1ff) !important;
                color: #fff !important;
                border-color: #ccc;
            }
        }
    }
}
</style>
