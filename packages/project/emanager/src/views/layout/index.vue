<template>
    <a-layout>
        <Header />
        <a-layout>
            <!-- <a-layout-content >Content</a-layout-content>
                    <a-layout-footer >Footer</a-layout-footer> -->
        </a-layout>
    </a-layout>

</template>


<script setup>
import Header from "./Header.vue";
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