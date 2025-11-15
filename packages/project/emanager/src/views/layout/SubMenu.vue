<template>
    <a-sub-menu :key="menu.menuId">
        <template #icon>
            <Icon :icon="menu.meta.icon" />
        </template>
        <template #title>
            <template v-if="menu.path && menu.page">
                <router-link :to="menu.path">{{ $t(menu.name) }}</router-link>
            </template>

            <template v-else>
                <template v-if="menu.name.includes('knowledge')">
                    <a-tooltip placement="topLeft" autoAdjustOverflow :overlayInnerStyle="{'width': '380px'}">
                        <template #title>
                            <span >{{$t(menu.name)}}</span>
                        </template>
                        {{ $t(menu.name) }}
                    </a-tooltip>
                </template>
                <template v-else>
                    {{ $t(menu.name) }}
                </template>
            </template>
        </template>
        <template v-for="item in menu.children" :key="item.menuId">
            <template v-if="!item.children">
                <a-menu-item :key="item.menuId">
                    <template #icon>
                        <Icon :icon="item.meta.icon" />
                    </template>
                    <template v-if="item.path">
                        <router-link :to="item.path">{{ $t(item.name) }}</router-link>
                    </template>
                    <template v-else>{{ $t(item.name) }}</template>
                </a-menu-item>
            </template>
            <template v-else>
                <sub-menu :menu="item" />
            </template>
        </template>
    </a-sub-menu>
</template>

<script setup>
import { Icon } from "@common/components/icons";
defineProps({ menu: { type: Object } });
</script>
