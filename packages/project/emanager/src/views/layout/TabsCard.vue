<template>
    <a-tabs v-model:activeKey="activeKey" type="editable-card" hideAdd @edit="tabEdit">
        <a-tab-pane key="1" tab="Tab 1"></a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2"></a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3"></a-tab-pane>
    </a-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
    setup() {
        function tabEdit(targetKey, action) {
            console.log(targetKey, action);
        }

        return {
            activeKey: ref('1'),
            tabEdit,
        };
    },
});
</script>