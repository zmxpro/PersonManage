;(function ($, win, doc) {
    $(doc).ready(function () {

        function addNoticePage() {
            this.init();
        }
        addNoticePage.prototype = {
            init: function () {
                this.checkPerson(); //选择通知接收人
            },
            //选择通知接收人
            checkPerson:function () {
                var self = this;
                $('#checkPerson').click(function () {
                    self.initTree();//初始化树形结构
                    $('#receivedModal').modal('show');
                    self.surePerson();//确定选择通知接收人
                })
            },
            //初始化树形结构
            initTree: function () {
                var setting = {
                    view: {
                        dblClickExpand: false,
                        selectedMulti: false,
                        showIcon: false,
                        nameIsHTML: true,
                        expandSpeed: "normal"
                    },
                    check: {
                        enable: true
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
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

                var zNodes = [
                    {
                        id: 1,
                        pId: 0,
                        name: "<span style='font-weight:bold;font-size:14px !important;'>全行业</span>",
                        open: true
                    },
                    {id: 11, pId: 1, name: "国家局、总公司"},
                    {id: 111, pId: 11, name: "省级局"},
                    {id: 112, pId: 11, name: "北京烟草"},
                    {id: 10121, pId: 112, name: "北京烟草市局（公司）"},
                    {id: 10122, pId: 112, name: "北京烟草市局（公司）"},
                    {id: 12, pId: 1, name: "天津烟草"},
                    {id: 121, pId: 12, name: "天津市局(公司)"},
                    {id: 122, pId: 12, name: "市区一局"},
                    {id: 123, pId: 12, name: "市区二局"},
                    {id: 124, pId: 12, name: "市区三局  "},
                    {id: 125, pId: 12, name: "东丽区局"},
                    {id: 126, pId: 12, name: "津南区局"},
                    {id: 127, pId: 12, name: "西青区局"},
                    {id: 128, pId: 12, name: "北辰区局"},
                    {id: 129, pId: 12, name: "滨海新区局塘沽分局"},
                    {id: 13, pId: 1, name: "河北烟草"},
                    {id: 131, pId: 13, name: "河北省局(公司)"},
                    {id: 132, pId: 13, name: "邯郸烟草"},
                    {id: 133, pId: 13, name: "石家庄烟草"},
                    {id: 134, pId: 13, name: "保定烟草"},
                    {id: 135, pId: 13, name: "张家口烟草"},
                    {id: 136, pId: 13, name: "承德烟草"},
                    {id: 137, pId: 13, name: "唐山烟草"},
                    {id: 138, pId: 13, name: "廊坊烟草"},
                    {id: 139, pId: 13, name: "沧州烟草"}
                ];


                $.fn.zTree.init($("#treeDemo"), setting, zNodes);

            },
            //确定选择通知接收人
            surePerson:function () {
                var self = this;
                $('#surePerson').unbind().click(function () {
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    var nodes = zTree.getChangeCheckedNodes(true);
                    var result= [];//存储接收人
                    for (var i = 0; i < nodes.length; i++) {
                        var item = {};
                        var halfCheck = nodes[i].getCheckStatus();
                        if (!halfCheck.half){
                            item.id = nodes[i].id;
                            item.name = nodes[i].name;
                            result.push(item);
                        }
                    }
                    console.log(result);

                    //已选择单位
                    var htm = "";
                    for(var i = 0 ;i < result.length;i++){
                        htm += '<li><p>'+result[i].name+'<i class="close icon-22" dataId="'+i+'"></i></p></li>';
                    }
                    $('#checkList').html(htm);
                    self.deletePerson(result);
                    //隐藏模态框
                    $("#receivedModal").modal('hide');
                })
            },
            //删除指定通知接收人
            deletePerson:function (result) {
                $('.close').click(function () {
                    var dataId = $(this).attr('dataId');
                    result.splice(dataId,1);
                    console.log(result);
                    $(this).parent().parent().remove();
                })
            }
        };
        new addNoticePage();
    })
})(jQuery, window, document);



