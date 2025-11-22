<template>
    <div class="dashboard flexDiv">
        <a-card hoverable class="topDiv">
            <div class="needCenterDiv">
                <a-avatar :size="100" :src="$store.getters['user/userInfo'].avatar">USER</a-avatar>
            </div>
            <div class="info">
                <div style="font-size: 26px; margin-bottom: 10px">{{ $t("dashboard.hello") }}，{{ $store.getters["user/userInfo"].userRealname }}。</div>
                <span style="color: #8c8c8c">{{ $t("dashboard.greeting") }}!</span>
            </div>
        </a-card>
        <div class="bottomDiv flexDiv">
            <a-card class="left" hoverable>
                <template #title>
                    {{ $t("dashboard.userDefine") }}
                    <Icon class="iconIcon" icon="SettingOutlined" />
                </template>
                <div v-for="(data, index) in list1" :key="index" class="oneSetting">
                    <div class="label">{{ data.label }}</div>
                    <div class="imgDiv needCenterDiv">
                        <div class="img needCenterDiv">
                            <img :src="data.customSrc || data.img" />
                        </div>
                    </div>
                </div>
            </a-card>
            <div class="right flexDiv">
                <a-card class="rightTop" hoverable>
                    <template #title>
                        {{ $t("dashboard.commonComs") }}
                        <Icon class="iconIcon" icon="SettingOutlined" />
                    </template>
                    <div v-for="(data, index) in list2" :key="index" class="oneComponent needCenterDiv">
                        <img :src="data.customSrc || data.img" />
                        <div class="label">{{ data.label }}</div>
                    </div>
                </a-card>
                <a-card class="rightBottom" hoverable>
                    <template #title>
                        AB{{ $t("dashboard.curve") }}
                        <Icon class="iconIcon" icon="SettingOutlined" />
                    </template>
                    <div ref="container" style="width: 100%; height: 100%"></div>
                </a-card>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from "@common/components/icons";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
// import Plotly from "plotly.js/dist/plotly";

export default defineComponent({
    name: "dashboardView",
    components: { Icon },
    setup() {
        let state = reactive({
            container: undefined,
            list1: [],
            list2: [],
        });

        onMounted(() => {
            var trace1 = {
                x: [1, 2],
                y: [1.3, 2.1],
                type: "scatter",
            };

            var trace2 = {
                x: [1, 2],
                y: [1, 2],
                type: "scatter",
            };

            var trace3 = {
                x: [1, 2],
                y: [1, 2],
                type: "scatter",
                xaxis: "x2",
                yaxis: "y2",
            };

            var trace4 = {
                x: [1, 2],
                y: [1.3, 2.1],
                type: "scatter",
                xaxis: "x2",
                yaxis: "y2",
            };

            var data = [trace1, trace2, trace3, trace4];

            var layout = {
                xaxis: {
                    domain: [0, 0.45],
                    anchor: "y1",
                    showgrid: true,
                    zeroline: true,
                    showline: true,
                    range: [1, 2],
                },
                yaxis: {
                    domain: [0, 1],
                    anchor: "x1",
                    showgrid: true,
                    zeroline: true,
                    showline: true,
                    overlaying: "y",
                    range: [1, 2.1],
                },
                xaxis2: {
                    domain: [0.55, 1],
                    anchor: "y2",
                    showgrid: true,
                    zeroline: true,
                    showline: true,
                    range: [1, 2],
                },
                yaxis2: {
                    domain: [0, 1],
                    anchor: "x2",
                    showgrid: true,
                    zeroline: true,
                    showline: true,
                    range: [1, 2.1],
                },
                showlegend: false,
                dragmode: false,
                margin: { t: 40, r: 1, l: 20, b: 20 },
                annotations: [{
                    text: "T",
                    font: {
                        size: 20,
                        weight: "bold",
                    },
                    showarrow: false,
                    align: "center",
                    x: 0.22,
                    y: 1.11,
                    xref: "paper",
                    yref: "paper",
                }, {
                    text: "X4",
                    font: {
                        size: 20,
                        weight: "bold",
                    },
                    showarrow: false,
                    align: "center",
                    x: 0.78,
                    y: 1.11,
                    xref: "paper",
                    yref: "paper",
                }, ],
            };

            // Plotly.newPlot(state.container, data, layout, {
            //     displayModeBar: false,
            // });
        });

        onMounted(() => {
            let baseList = localStorage.getItem("COMPONENTS_lIST_BASE") ? JSON.parse(localStorage.getItem("COMPONENTS_lIST_BASE")) : [];

            state.list1 = baseList.filter((val) => val.comType == 2).slice(0, 4);
            state.list2 = baseList.slice(0, 6);
        });

        return {
            ...toRefs(state),
        };
    },
});
</script>

<style lang="less" scoped>
.iconIcon {
    color: var(--primary-color);
    display: inline-block;
    margin-left: 10px;
    cursor: pointer;
}

.flexDiv {
    display: flex;
}

.dashboard {
    flex-direction: column;
    height: 100%;
    overflow-y: hidden;
}

:deep(.ant-card) {
    .ant-card-head {
        padding: 0 16px;
    }

    .ant-card-body {
        padding: 16px;
        overflow-y: auto;
        height: calc(100% - 64px);
        width: 100%;
        display: flex;
    }
}

.topDiv {
    width: 100%;
    margin-bottom: 10px;
    flex: 2;
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
    padding-left: 30px;

    .info {
        margin-left: 60px;
        flex-direction: column;
        display: flex;
        justify-content: center;
    }
}

.bottomDiv {
    width: 100%;
    flex-direction: row;
    flex: 8;

    .left {
        flex: 1;
        margin-right: 10px;

        :deep(.ant-card-body) {
            height: calc(100% - 58px);
            flex-direction: column;
        }

        .oneSetting + .oneSetting {
            margin-top: 16px;
        }

        .oneSetting {
            flex: 1;
            max-height: 25%;
            background: var(--index-tmplate-color);
            width: 100%;
            display: flex;
            padding: 0 20px;
            height: calc(25% - 20px);
            align-content: center;
            justify-content: space-between;

            .label {
                flex: 1;
                font-size: 20px;
                display: flex;
                align-items: center;
            }

            .imgDiv {
                height: 100%;
                width: 100px;

                .img {
                    height: 100px;
                    width: 100%;
                    background: #fff;
                    border-radius: 50%;

                    img {
                        width: 60px;
                        height: 60px;
                    }
                }
            }
        }
    }

    .right {
        flex: 4;
        flex-direction: column;

        .rightTop {
            margin-bottom: 10px;
            flex: 3;

            .oneComponent {
                flex: 1;
                flex-direction: column;

                img {
                    width: 60px;
                    height: 60px;
                    margin-bottom: 10px;
                }

                div {
                    font-size: 16px;
                }
            }
        }

        .rightBottom {
            flex: 5;
        }
    }
}

:deep(.ant-card-head-title) {
    font-weight: 600;
    font-size: 20px;
}

.needCenterDiv {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
