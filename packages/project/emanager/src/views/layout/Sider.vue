<template>
    <a-layout-sider width="256px" :collapsed="collapsed" collapsible collapsedWidth="80px" class="menuLayout"
        :trigger="null">
        <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="dark"
            :inline-collapsed="collapsed">
            <template v-for="item in $store.getters['user/menus'].sort((t1, t2) => t1.sortNum - t2.sortNum)">
                <template v-if="!item.children || !item.children.length">
                    <a-menu-item :key="item.menuId">
                        <template #icon>
                            <component :is="item.meta.icon" />
                        </template>
                        <template v-if="item.path">
                            <router-link :to="item.path">{{ $t(item.name) }}</router-link>
                        </template>
                        <template v-else>{{ $t(item.name) }}</template>
                    </a-menu-item>
                </template>
                <template v-else>
                    <sider-subMenu :menu="item" :key="item.menuId" />
                </template>
            </template>
        </a-menu>
        <template #trigger>
            <left-outlined></left-outlined>
        </template>
    </a-layout-sider>
</template>

<script>
import { useStore } from "vuex";
import { tree2list } from "@common/ts/util";
import { reactive, watch, toRefs, onMounted } from 'vue';
import SiderSubMenu from './SiderSubMenu.vue';
import {
    LeftOutlined,
} from '@ant-design/icons-vue';

export default {
    components: {
        SiderSubMenu,
        LeftOutlined,
    },
    setup() {
        const store = useStore();
        let state = reactive({
            collapsed: false,
            openKeys: [],
            rootSubmenuKeys: [],
            selectedKeys: [],
            menuList: [],
        });

        onMounted(() => {
            let menuList = JSON.parse(JSON.stringify(store.getters["user/menus"]));
            state.menuList = tree2list(menuList);
            state.selectedKeys = store.getters["menu/getSelecteKeys"];
            state.openKeys = store.getters["menu/getOpenKeys"];
            showNowPage(store.getters["user/route"]);
        });

        

        const showNowPage = (val) => {
            if (!val) return;
            let selectMenu = state.menuList.find((value) => val.path == value.path);
            if (selectMenu) {
                state.selectedKeys = [selectMenu?.menuId];
                store.dispatch('menu/updateSelectedKeys', [selectMenu?.menuId])
                // 菜单打开状态更新
                state.openKeys = [];
                store.dispatch('menu/updateOpendKeys', [])
                let menuParentId = selectMenu?.menuParentId;
                while (menuParentId) {
                    state.openKeys.unshift(menuParentId);
                    store.dispatch('menu/updateOpendKeys', state.openKeys)
                    menuParentId = state.menuList.find((value) => value.menuId == menuParentId)?.menuParentId;
                }
            } else {
                state.selectedKeys = [];
                state.openKeys = [];
                store.dispatch('menu/updateSelectedKeys', [])
                store.dispatch('menu/updateOpendKeys', [])
            }
        };


        return {
            ...toRefs(state)
        }
    }
}

</script>

<style lang="less" scoped>
.ant-layout-sider {
    box-shadow: 1px 0 6px rgb(0 0 0 / 20%);
    background: url(/images/menuBack.png);
    position: relative;
}

.custom-trigger {
    position: absolute;
    top: 200px;
    right: -16px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 0 6px rgba(0, 0, 0, .2);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 10;
}

/* 所有菜单项: 默认渐变背景（非最后一层） */
:deep(.ant-menu-item),
:deep(.ant-menu-submenu-title) {
    color: #000;
    background: linear-gradient(to right, #b2e1f8, #7acaf2);
    margin: 5px 20px !important;
    width: calc(100% - 40px);
    border-radius: 8px;

    &:hover,
    &:focus {
        background: linear-gradient(to right, #45b7f0, #1591d0);
        color: #000;
    }

    .ant-menu-title-content a {
        color: #000;
    }

    &.ant-menu-item-selected {
        background: linear-gradient(to right, #45b7f0, #1591d0);
        color: #fff;

        .router-link-active {
            color: #fff;
        }
    }
}

/*  最后一层菜单项（叶子节点）背景透明 + 保留 hover 和选中效果 */
:deep(.ant-menu-sub .ant-menu-item) {
    background: transparent !important;
    color: #000 !important;

    &:hover,
    &:focus {
        background: transparent !important;
        color: var(--primary-color) !important;

        .ant-menu-title-content a {
            color: var(--primary-color) !important;
        }
    }

    &.ant-menu-item-selected {
        background: transparent !important;
        color: var(--primary-color) !important;

        .router-link-active,
        .router-link-exact-active {
            color: var(--primary-color) !important;
        }

        &:after {
            display: none !important;
        }
    }
}

/* 次级菜单容器透明 */
:deep(.ant-menu-sub) {
    background: transparent !important;
}

/* 根菜单容器透明 */
:deep(.ant-menu-root) {
    margin-top: 5px;
    background: transparent;
    height: calc(100% - 5px);
    overflow-x: hidden;
    overflow-y: auto;
}
</style>
