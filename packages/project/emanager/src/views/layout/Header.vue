<template>
    <a-layout-header>
        <div class="logo">
            <img class="titlePic" :src="imgSrc" />
            <h1>{{ title }}</h1>
        </div>
        <div>
            <!-- <div>
                <Icon icon="FullscreenExitOutlined" v-if="isFull" @click="full"></Icon>
                <Icon icon="FullscreenOutlined" v-else @click="full"></Icon>
            </div> -->
            <!-- <div>
                {{ $store.getters["user/userInfo"].userRealname }}
                <Icon icon="UserOutlined"></Icon>
            </div> -->
            <div @click="logout" class="logout">{{ $t("header.exit") }}<Icon icon="PoweroffOutlined"></Icon>
            </div>
        </div>
    </a-layout-header>

</template>


<script>
import { useStore } from "vuex";
import { logout } from "@/service/auth"; 
import { Icon } from "@common/components/icons"; 
import { defineComponent, nextTick, onMounted, reactive, toRefs } from "vue";

export default defineComponent({
    components: { Icon },
    name: "HeaderView",
    setup() {
        let state = reactive({
            isFull: false,
            imgSrc: "/images/Logo_p.png",
            title: "仿真数据管理平台", 
        });

        return {
            ...toRefs(state),
        };
    },
});
</script>

<style scoped lang="less">
.ant-layout-header {
    background-image: linear-gradient(to right, #26c0eb, var(--primary-color));
    padding: 0 0 0 24px;
    display: flex;
    color: #fff;
    justify-content: space-between;
    height: 70px;
    line-height: 70px;

    h1 {
        margin: 0 0 0 4px;
        font-weight: 500;
        font-size: 22px;
        line-height: 70px;
        max-height: 70px;
        animation: fade-in;
        animation-duration: var(--animation-duration-slow);
        white-space: nowrap;
        color: #fff;
    }

    &>div {
        display: flex;

        &>div {
            margin-left: 16px;
            cursor: pointer;
        }
    }

    .logo img {
        width: 150px;
        height: 80px;
    }

    .anticon {
        font-size: 18px;
        transition: all 0.3s;
        margin: 2px 0 0 4px;
        vertical-align: sub;

        &:hover {
            transform: scale(1.2);
        }
    }
}

.themeChange {
    .ant-dropdown-trigger {
        color: #fff;
    }
}

.logout {
    background: #0774ab;
    z-index: 1;
    margin-left: 0 !important;
    width: 120px;
    padding-left: 50px;
    background: linear-gradient(-300deg, transparent 29%, transparent, 1%, transparent, 1%, #0774ab 67%);
}

.titlePic {
    height: 150px;
}
</style>
