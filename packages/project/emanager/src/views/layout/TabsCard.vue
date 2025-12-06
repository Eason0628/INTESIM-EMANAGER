<template>
    <a-tabs v-model:activeKey="path" type="editable-card" hideAdd @edit="tabEdit">
        <a-tab-pane v-for="item in $store.getters['tabs/routes'].filter((val) => val.name != 'digitalTwinsMain')"
            :key="item.fullPath" :closable="item.closable">
            <template #tab>
                <a-dropdown :trigger="['contextmenu']">
                    <span>{{ $t(item.name) }}</span>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="reload"
                                @click="() => $store.commit(`tabs/updateComponent`, item.fullPath)">
                                <template #icon>
                                    <ReloadOutlined />
                                </template>{{ $t("tabBar.refreshPage") }}
                            </a-menu-item>
                            <a-menu-divider />
                            <a-menu-item key="closeOthers"
                                @click="() => $store.dispatch(`tabs/closeOthers`, item.fullPath)">
                                <template #icon>
                                    <CloseCircleOutlined />
                                </template>{{ $t("tabBar.closeOther") }}
                            </a-menu-item>
                            <a-menu-item key="closeAll" @click="() => $store.dispatch(`tabs/closeAll`, item.fullPath)">
                                <template #icon>
                                    <StopOutlined />
                                </template>{{ $t("tabBar.closeAll") }}
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </template>
        </a-tab-pane>
    </a-tabs>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { StopOutlined, CloseCircleOutlined, ReloadOutlined } from "@ant-design/icons-vue";
import { defineComponent, onBeforeUnmount, reactive, toRefs, watch, onMounted } from "vue";

export default defineComponent({
    components: {
        StopOutlined,
        CloseCircleOutlined,
        ReloadOutlined,
    },
    name: "TabsCard",
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        onMounted(() => {
            store.commit("tabs/refreshRoute");
            window.addEventListener("beforeunload", () => store.commit("tabs/saveRoute"));
        });

        onBeforeUnmount(() => {
            window.removeEventListener("beforeunload", () => store.commit("tabs/saveRoute"));
        });

        let state = reactive({
            path: route.fullPath,
        });

        const openTab = (r) => {
            store.dispatch("tabs/open", r);
        };

        const location = (path) => {
            router.push(path);
        };

        const tabEdit = (k, action) => {
            if (action !== "remove") return;
            store.dispatch("tabs/close", k);
        };

        openTab(route);

        watch(route, (newVal) => {
            openTab(newVal);
        });

        watch(
            () => store.getters["tabs/path"],
            (val) => {
                location(val);
                state.path = val;
            }
        );

        watch(
            () => state.path,
            (val) => {
                location(val);
            }
        );

        return {
            tabEdit,
            ...toRefs(state),
        };
    },
});
</script>