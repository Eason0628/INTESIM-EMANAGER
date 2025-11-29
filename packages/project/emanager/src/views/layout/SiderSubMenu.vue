<template>
    <a-sub-menu :key="menu.menuId">
        <template #icon>
            <component :is="menu.meta.icon" />
        </template>
        <template #title>
            {{ $t(menu.name) }}
        </template>
        <template v-for="item in menu.children" :key="item.menuId">
            <template v-if="!item.children">
                <a-menu-item :key="item.menuId">
                    <template #icon>
                        <component :is="menu.meta.icon" />
                    </template>
                    <template v-if="item.path">
                        <router-link :to="item.path">{{ $t(item.name) }}</router-link>
                    </template>
                    <template v-else>{{ $t(item.name) }}</template>
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
