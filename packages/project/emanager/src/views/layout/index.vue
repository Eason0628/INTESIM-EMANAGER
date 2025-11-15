<template>
    <a-layout>
        <Header />
        <a-layout hasSider>
            <Sider />
            <TabPanelView />
        </a-layout>
    </a-layout>

</template>


<script setup>
import Header from "./Header.vue";
import Sider from "./Sider.vue";
import TabPanelView from "./TabPanelView.vue";
</script>

<style lang="less" scoped>
.ant-layout {
    background: #f0f2f5;
    height: 100%;
}

.ant-layout-has-sider {
    height: calc(100% - 70px);
}

.ant-layout-content {
    width: calc(100% - 240px) !important;
    padding: 0;
    background-color: #eaf0f5;
}
</style>