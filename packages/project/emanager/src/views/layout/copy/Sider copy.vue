<template>
    <a-layout-sider :width="width" v-model:collapsed="collapsed" collapsible :collapsedWidth="0" theme="light"
        class="menuLayout">
        <a-menu mode="inline" :openKeys="openKeys" v-model:selectedKeys="selectedKeys" @openChange="onOpenChange">
            <template v-for="item in $store.getters['user/menus'].sort((t1, t2) => t1.sortNum - t2.sortNum)">
                <template v-if="!item.children || !item.children.length">
                    <a-menu-item :key="item.menuId">
                        <template #icon>
                            <Icon :icon="item.meta.icon" />
                        </template>
                        <template v-if="item.path">
                            <a v-if="item.menuType === 5" :href="item.path" target="_blank" rel="noopener noreferrer">{{
                                $t(item.name) }}</a>
                            <router-link v-else :to="item.path">{{ $t(item.name) }}</router-link>
                        </template>
                        <template v-else>{{ $t(item.name) }}</template>
                    </a-menu-item>
                </template>
                <template v-else>
                    <sub-menu :menu="item" :key="item.menuId" />
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
import { Icon } from "@common/components/icons";
import { LeftOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import SubMenu from "./SubMenu.vue";

export default defineComponent({
    components: {
        Icon,
        SubMenu,
        LeftOutlined,
    },
    name: "SiderView",
    props: {
        width: {
            type: Number,
            default: 240,
        },
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

        watch(
            () => store.getters["user/route"],
            (val) => {
                showNowPage(val);
            }
        );
        // 更新选中菜单状态
        watch(() => store.getters['menu/getSelecteKeys'],
            (val) => {
                state.selectedKeys = val
                onOpenChange(state.selectedKeys)
            },
        )
        watch(() => store.getters['menu/getOpenKeys'],
            (val) => {
                state.openKeys = val
            },
        )

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

        const getRootKey = () => {
            store.getters["user/menus"].forEach((val) => state.rootSubmenuKeys.push(val.menuId));
        };

        const onOpenChange = (openKeys) => {
            const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1);

            if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                state.openKeys = openKeys;
            } else {
                state.openKeys = latestOpenKey ? [latestOpenKey] : [];
            }
        };

        getRootKey();

        return {
            ...toRefs(state),
            onOpenChange,
            onCollapsed: () => {
                state.collapsed = !state.collapsed;
            },
        };
    }
});
</script>


<style lang="less" scoped>
.ant-layout-sider {
    box-shadow: 1px 0 6px rgb(0 0 0 / 20%);
}

.menuLayout {
    background: url(/images/menuBack.png);
}

:deep(.ant-menu-root) {
    margin-top: 5px;
    background: transparent;
    height: calc(100% - 5px);
    overflow-x: hidden;
    overflow-y: auto;

    &>.ant-menu-item,
    .ant-menu-submenu-title {
        color: #000;
        background: linear-gradient(to right, #b2e1f8, #7acaf2);
        margin: 5px 20px;
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

    .ant-menu-submenu-title {
        margin-bottom: 0 !important;
    }

    .ant-menu-sub {
        background: transparent;

        .ant-menu-item {
            background: transparent;

            &:hover,
            &:focus {
                color: var(--primary-color);
                background: transparent;

                .ant-menu-title-content a {
                    color: var(--primary-color);
                }
            }

            &.ant-menu-item-selected {
                color: var(--primary-color);

                a {
                    color: #000;
                }

                .router-link-exact-active {
                    color: var(--primary-color);
                }

                &:after {
                    display: none;
                }
            }
        }
    }
}

:deep(.ant-menu-inline) .ant-menu-item::after {
    border: none;
}

:deep(.ant-layout-sider-zero-width-trigger) {
    width: 16px !important;
    height: 32px !important;
    line-height: 32px !important;
    right: -16px !important;
    top: 50% !important;
    transform: translateY(-50%);
    border-radius: 0 16px 16px 0 !important;
    border-top: 1px solid var(--border-color-split);
    border-right: 1px solid var(--border-color-split);
    border-bottom: 1px solid var(--border-color-split);
    transition: all 0.3s;
    font-size: 16px;
    cursor: pointer;
}

:deep(.ant-layout-sider-zero-width-trigger):hover {
    color: var(--primary-color);
}

:deep(.ant-layout-sider-zero-width-trigger) .anticon {
    transform: translate(-3px);
    transition: all 0.3s ease-in-out;
}

.ant-layout-sider-collapsed .ant-layout-sider-zero-width-trigger .anticon {
    transform: rotate(180deg) translateX(5px);
}
</style>