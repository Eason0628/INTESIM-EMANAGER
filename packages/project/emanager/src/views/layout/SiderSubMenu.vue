<template>
    <a-sub-menu :key="menu.menuId">
        <template #icon>
            <component :is="menu.icon" />
        </template>
        <template #title>
            {{ menu.title }}
        </template>
        <template v-for="item in menu.children" :key="item.menuId">
            <template v-if="!item.children">
                <a-menu-item :key="item.menuId">
                    <template #icon>
                        <Icon :icon="item.icon" />
                    </template>
                    <template v-if="item.path">
                        <router-link :to="item.path">{{ item.title }}</router-link>
                    </template>
                    <template v-else>{{ item.title }}</template>
                </a-menu-item>
            </template>
            <template v-else>
                <sider-sub-menu :menu="item" />
            </template>
        </template>
    </a-sub-menu>
</template>

<script setup>
import { Icon } from "@common/components/icons";
defineProps({ menu: { type: Object } });
</script>
