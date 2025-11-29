menus: [
    {
        "name": "工具集成",
        "sortNum": 1,
        "meta": { "closable": true, "icon": "ApartmentOutlined" },
        "menuId": 1,
        "menuParentId": 0,
        "children": [
            {
                "path": "/layout/tool/application",
                "name": "工具应用",
                "sortNum": 2,
                "meta": { "closable": true, "icon": "ApiOutlined" },
                "menuId": 2,
                "menuParentId": 1
            },
            {
                "path": "/layout/sim/tool",
                "name": "工具管理",
                "sortNum": 3,
                "meta": { "closable": true, "icon": "AimOutlined" },
                "menuId": 3,
                "menuParentId": 1
            }
        ]
    },
    {
        "path": "/layout/test/test",
        "name": "多物理场耦合",
        "sortNum": 4,
        "meta": { "closable": true, "icon": "AccountBookOutlined" },
        "menuId": 4,
        "menuParentId": 0
    },
    {
        "name": "系统管理",
        "sortNum": 5,
        "meta": { "closable": true, "icon": "AppleOutlined" },
        "menuId": 5,
        "menuParentId": 0,
        "children": [
            {
                "path": "",
                "name": "菜单管理",
                "sortNum": 6,
                "meta": { "closable": true, "icon": "FormatPainterOutlined" },
                "menuId": 6,
                "menuParentId": 5,
                "children": [
                    {
                        "path": "/layout/menu/pageone",
                        "name": "菜单配置",
                        "sortNum": 7,
                        "meta": { "closable": true, "icon": "AlertOutlined" },
                        "menuId": 7,
                        "menuParentId": 6
                    }
                ]
            },
            {
                "name": "用户管理",
                "sortNum": 8,
                "meta": { "closable": true, "icon": "FilePdfOutlined" },
                "menuId": 8,
                "menuParentId": 5,
                "children": [
                    {
                        "path": "/layout/menu/pagethree",
                        "name": "角色管理",
                        "sortNum": 9,
                        "meta": { "closable": true, "icon": "AuditOutlined" },
                        "menuId": 9,
                        "menuParentId": 8
                    },
                    {
                        "path": "/layout/menu/pagetwo",
                        "name": "权限管理",
                        "sortNum": 10,
                        "meta": { "closable": true, "icon": "AlertOutlined" },
                        "menuId": 10,
                        "menuParentId": 8
                    }
                ]
            }
        ]
    }
]