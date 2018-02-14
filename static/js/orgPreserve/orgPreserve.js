;(function ($, win, doc) {
    $(doc).ready(function () {
        //全局变量

        function orgPage() {
            this.init();
        }

        orgPage.prototype = {
            init: function () {
                this.initTree();//初始化树形结构
            },
            //初始化树形结构
            initTree: function () {
                var setting = {
                    view: {
                        dblClickExpand: false,
                        selectedMulti: false,
                        showIcon: false,
                        fontCss: getFont,
                        nameIsHTML: true,
                        expandSpeed: "normal"
                    },
                    check: {
                        enable: false
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    edit: {
                        enable: false
                    },
                    callback: {
                        onClick: onClick
                    }
                };

                function onClick(e, treeId, treeNode) {
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    if (treeNode.level > 0) {
                        zTree.expandNode(treeNode);
                    }
                }

                function getFont(treeId, node) {
                    return node.font ? node.font : {};
                }

                function dblClickExpand(treeId, treeNode) {
                    return treeNode.level > 0;
                }

                var zNodes = [
                    {
                        id: 1,
                        pId: 0,
                        name: "<span style='font-weight:bold;font-size:14px !important;'>全行业</span>",
                        open: true
                    },
                    {id: 11, pId: 1, name: "国家局、总公司", open: true},
                    {id: 111, pId: 11, name: "省级局"},
                    {id: 112, pId: 11, name: "北京烟草"},
                    {id: 1121, pId: 112, name: "北京烟草市局（公司）"},
                    {id: 1121, pId: 112, name: "北京烟草市局（公司）"},
                    {id: 1121, pId: 112, name: "北京烟草市局（公司）"},
                    {id: 1121, pId: 112, name: "北京烟草市局（公司）"},
                    {id: 1121, pId: 112, name: "北京烟草市局（公司）"},
                    {id: 1121, pId: 112, name: "北京烟草市局（公司）"},
                    {id: 1121, pId: 112, name: "北京烟草市局（公司）"},
                    {id: 1121, pId: 112, name: "北京烟草市局（公司）"},
                    {id: 1121, pId: 112, name: "北京烟草市局（公司）"},
                    {id: 12, pId: 1, name: "天津烟草", open: true},
                    {id: 121, pId: 12, name: "天津市局(公司)"},
                    {id: 121, pId: 12, name: "市区一局"},
                    {id: 121, pId: 12, name: "市区二局"},
                    {id: 121, pId: 12, name: "市区三局  "},
                    {id: 121, pId: 12, name: "东丽区局"},
                    {id: 121, pId: 12, name: "津南区局"},
                    {id: 121, pId: 12, name: "西青区局"},
                    {id: 121, pId: 12, name: "北辰区局"},
                    {id: 121, pId: 12, name: "滨海新区局塘沽分局"},
                    {id: 13, pId: 1, name: "河北烟草", isParent: true, open: true},
                    {id: 121, pId: 13, name: "河北省局(公司)"},
                    {id: 121, pId: 13, name: "邯郸烟草"},
                    {id: 121, pId: 13, name: "石家庄烟草"},
                    {id: 121, pId: 13, name: "保定烟草"},
                    {id: 121, pId: 13, name: "张家口烟草"},
                    {id: 121, pId: 13, name: "承德烟草"},
                    {id: 121, pId: 13, name: "唐山烟草"},
                    {id: 121, pId: 13, name: "廊坊烟草"},
                    {id: 121, pId: 13, name: "沧州烟草"},

                ];


                $.fn.zTree.init($("#treeDemo"), setting, zNodes);

            }
        };
        new orgPage();
    })
})(jQuery, window, document);



