const commonColor = {
    // common包单独涉及的颜色
    "primary-1": "#e6f4ff",
    "primary-2": "#bae0ff",
    "primary-3": "#91caff",
    "primary-5": "#4096ff",
    "text-color-secondary": "rgba(0, 0, 0, 0.65)",
    "border-color-split": "var(--border-color-base)",
    "border-radius-base": 6,
    "error-color": "#ff4d4f",
    "warning-color": "#faad14",
    "warning-color-outline": "fade(var(--warning-color), var(--outline-fade))",
    "disabled-color": "rgba(0, 0, 0, 0.25)",
    "slider-rail-background-color-hover": "#e1e1e1",
    "layout-footer-background": "#f0f2f5",
    "system-bg": "#eff4ff",
    "component-background": "#fff",
    "card-shadow": `0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)`,
    "item-active-bg": "#e7f2f3",
    "body-background": "#fff",
    "table-header-bg": "hsv(0, 0, 98%)",
    "titlebar-gradient-bg": "to right, #1f9cdc, #0793d9",
    black: "#000",
    white: "#fff",
    colortableStriped: "#EAEDF1",

    "primary-color": "#1f9cdc",
    "text-color": "rgba(0, 0, 0, 0.88)",
    "menu-item-height": "32px",
    "ease-in-out": "cubic-bezier(0.645, 0.045, 0.355, 1)",
    "animation-duration-base": "0.2s",
    "animation-duration-slow": "0.3s",
    "index-tmplate-color": "#e6fbff",
    "layout-trigger-height": "48px",
    "border-color-base": "#d9d9d9",
    "border-hover-color": "#daf4fe",
    "menu-select-bg-start": "#caeffe",
    "tree-select-bg": "#c7f4ff",
    "outline-fade": "20%",
    "popupWinHeaderHeight":"56px",
};

export const theme1Color = Object.assign({}, commonColor);

export function themeStyle(themeColor) {
    return {
        components: {
            Button: {
                lineHeight: 1,
                controlHeight: 32,
                controlTmpOutline: "transparent",
                controlOutlineWidth: 0,
                colorText: themeColor["primary-color"],
                colorPrimaryHover: themeColor["primary-color"],
                colorBgTextActive: "transparent",
                colorBgTextHover: "transparent",
                colorLink: themeColor["primary-color"],
            },
            Layout: {
                colorBgContainer: themeColor["primary-color"],
                colorBgHeader: themeColor["primary-color"],
            },
            Menu: {
                colorItemBg: themeColor["primary-color"],
                colorItemTextHover: themeColor["primary-color"],
                radiusItem: 0,

                colorItemBgHover: "transparent",
                itemMarginInline: 0,
            },
            Tabs: {
                colorPrimary: themeColor["primary-color"],
                margin: 0,
                lineWidth: 1,
                controlHeightLG: 32,
            },
            Table: {
                colorTextHeading: themeColor["text-color"],
                colorBorderSecondary: themeColor["border-color-base"],
            },
            Drawer: {
                colorSplit: themeColor["primary-color"],
                colorText: themeColor["text-color"],
            },
            Form: {
                colorTextHeading: themeColor["text-color"],
            },
            Modal: {
                colorTextHeading: themeColor["text-color"],
                marginXS: 16,
                padding: 24,
                paddingLG: "24px",
            },
            Card: {
                colorTextHeading: themeColor["text-color"],
                colorBorderSecondary: themeColor["border-color-base"],
            },
            Tree: {
                controlItemBgActive: themeColor["tree-select-bg"],
            },
            Select: {
                controlItemBgActive: themeColor["tree-select-bg"],
            },
            TreeSelect: {
                controlItemBgActive: themeColor["tree-select-bg"],
            },
            Collapse: {
                colorFillAlter: themeColor["tree-select-bg"],
            },
            DatePicker: {
                colorLink: themeColor["primary-color"],
            },
        },
        token: {
            colorPrimary: themeColor["primary-color"],
            colorTextBase: themeColor["text-color"],
            borderRadius: 2,
            lineWidth: 1,
            fontWeightStrong: 500,
        },
    };
}
