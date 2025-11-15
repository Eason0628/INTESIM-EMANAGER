<template>
    <div class="content">
        <div class="container">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in" appear>
                    <component :is="Component" :key="$route.fullPath" />
                </transition>
            </router-view>
        </div>
    </div>
</template>

<style lang="less" scoped>
.content {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px 10px;
    height: calc(100% - 32px);
    overflow-y: auto;
    overflow-x: hidden;

    .container {
        flex: 1;
    }

    .footer {
        flex: 0;
        width: 100%;
        text-align: center;
        height: var(--layout-trigger-height);
        font-size: 12px;
        color: var(--text-color-secondary);
        padding: calc(var(--layout-trigger-height) / 2 - 6px);
    }
}

.fade-leave-to {
    display: none;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: all var(--animation-duration-base) var(--ease-in-out);
}

.fade-enter-active {
    animation: bounce var(--animation-duration-base) var(--ease-in-out);
}

.fade-leave-active {
    animation: bounce var(--animation-duration-base) var(--ease-in-out) reverse;
}

@keyframes bounce {
    0% {
        transform: scale(0.8);
    }

    100% {
        transform: scale(1);
    }
}
</style>
