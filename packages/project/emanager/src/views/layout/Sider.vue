<template>
    <a-layout-sider width="256px" :collapsed="collapsed" collapsible collapsedWidth="80px" class="menuLayout"
        :trigger="null" @collapse="onCollapse">
        <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="dark"
            :inline-collapsed="collapsed">
            <template v-for="item in items">
                <template v-if="!item.children || !item.children.length">
                    <a-menu-item :key="item.key">
                        <template #icon>
                            <component :is="item.icon" />
                        </template>
                        <template v-if="item.path">
                            <router-link :to="item.path">{{ item.title }}</router-link>
                        </template>
                        <template v-else>{{ item.title }}</template>
                    </a-menu-item>
                </template>
                <template v-else>
                    <sider-subMenu :menu="item" :key="item.key" />
                </template>
            </template>
        </a-menu>
        <div class="custom-trigger" @click="toggleCollapsed">
            <RightOutlined v-if="collapsed" />
            <LeftOutlined v-else />
        </div>
    </a-layout-sider>
</template>

<script>
import { reactive, watch, toRefs } from 'vue';
import SiderSubMenu from './SiderSubMenu.vue';
import {
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
    RightOutlined,
    LeftOutlined,
} from '@ant-design/icons-vue';

export default {
    components: {
        SiderSubMenu,
        RightOutlined,
        LeftOutlined,
    },
    setup() {
        const state = reactive({
            collapsed: false,
            selectedKeys: ['1'],
            openKeys: ['sub1'],
            preOpenKeys: ['sub1'],
        });
        const items = reactive([
            {
                key: '1',
                icon: PieChartOutlined,
                label: 'Option 1',
                title: 'Option 1',
                path: '/testA',
            },
            {
                key: '2',
                icon: DesktopOutlined,
                label: 'Option 2',
                title: 'Option 2',
                path: '/testB',
            },
            {
                key: '3',
                icon: InboxOutlined,
                label: 'Option 3',
                title: 'Option 3',
            },
            {
                key: 'sub1',
                icon: MailOutlined,
                label: 'Navigation One',
                title: 'Navigation One',
                children: [
                    {
                        key: '5',
                        label: 'Option 5',
                        title: 'Option 5',
                    },
                    {
                        key: '6',
                        label: 'Option 6',
                        title: 'Option 6',
                    },
                    {
                        key: '7',
                        label: 'Option 7',
                        title: 'Option 7',
                    },
                    {
                        key: '8',
                        label: 'Option 8',
                        title: 'Option 8',
                    },
                ],
            },
            {
                key: 'sub2',
                icon: AppstoreOutlined,
                label: 'Navigation Two',
                title: 'Navigation Two',
                children: [
                    {
                        key: '9',
                        label: 'Option 9',
                        title: 'Option 9',
                    },
                    {
                        key: '10',
                        label: 'Option 10',
                        title: 'Option 10',
                    },
                    {
                        key: 'sub3',
                        label: 'Submenu',
                        title: 'Submenu',
                        icon: AppstoreOutlined,
                        children: [
                            {
                                key: '11',
                                label: 'Option 11',
                                title: 'Option 11',
                            },
                            {
                                key: '12',
                                label: 'Option 12',
                                title: 'Option 12',
                            },
                        ],
                    },
                ],
            },
        ]);

        watch(
            () => state.openKeys,
            (_val, oldVal) => {
                state.preOpenKeys = oldVal;
            },
        );

        const toggleCollapsed = () => {
            onCollapse(!state.collapsed);
        };

        const onCollapse = (collapsed) => {
            state.collapsed = collapsed;
            state.openKeys = collapsed ? [] : state.preOpenKeys;
        };
        return {
            ...toRefs(state),
            items,
            toggleCollapsed
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
</style>