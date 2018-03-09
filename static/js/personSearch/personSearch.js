(function ($,doc) {
    $(doc).ready(function() {
        var personTab;
        var addSearchModal = $('#addSearchModal');//新增查询条件弹框
        var templateModal = $('#templateModal');//组织机构弹框
        var templateNameModal = $('#templateNameModal');//组织机构模板名称弹框
        var selects = $('#selects');//组织机构selects

        function personSearch() {
            this.init();
        }
        personSearch.prototype = {
            init:function () {
                this.addSearch();//新增查询条件
                this.ContractionIn();//收起查询
                this.checkOrg(); //选择组织机构
                this.loadTable();//加载人员表格
            },
            /******************查询******************/
            //新增查询条件
            addSearch:function () {
                $('#addSearch').click(function () {
                    addSearchModal.modal('show');
                })
            },
            //收起查询
            ContractionIn:function () {
                $('#ContractionIn').click(function () {
                    if(!$('.seaCondition').is(":animated")){
                        $('.seaCondition').slideToggle();
                    }
                })
            },
            //选择组织机构
            checkOrg: function () {
                var self = this;
                selects.click(function () {
                    self.initTree();//初始化树形结构
                    templateModal.modal('show');
                })
            },
            //初始化树形结构
            initTree: function () {
                var self = this;
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
                function onClick(e, treeId, zNodes) {
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    // if (zNodes.level > 0) {
                    zTree.expandNode(zNodes);
                    // }
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
                self.sureOrg();//确定
                self.saveTemplate();//保存为模板
            },
            //获取选中的组织机构
            getTreeDate:function () {
                var self = this;
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var nodes = zTree.getCheckedNodes(true);
                zTree.checkAllNodes(false);//取消选中
                var result = [];//存储
                if (nodes.length == 0){
                    self.errorMsg('请选择机构！');
                }else {
                    for (var i = 0; i < nodes.length; i++) {
                        var item = {};
                        if (nodes[i].isParent) {
                            //txt.replace(nodes[i].Name, "");
                        } else {
                            item.id = nodes[i].id;
                            item.name = nodes[i].name;
                            result.push(item);
                        }
                    }
                }
                return result;

            },
            //报错信息
            errorMsg:function (msg) {
                var htm = '<p class="errorText">'+msg+'</p>';
                var len = $('.errorMsg').find('.errorText').length;
                if (len == 0){
                    $('.errorMsg').append(htm);
                }
                setTimeout(function () {
                    $('.errorMsg .errorText').slideUp(400);
                    setTimeout(function () {
                        $('.errorMsg .errorText').remove();
                    },400)
                },1400)
            },
            //确定
            sureOrg: function () {
                var self = this;
                $('#sureCheck').unbind().click(function () {
                    var treeDate = self.getTreeDate();
                    if (treeDate.length > 0){
                        var val = "";
                        for (var i=0;i<treeDate.length;i++){
                            val += treeDate[i].name+'，'
                        }
                        if(val.length > 16){
                            val = val.substring(0,16)+'...';
                        }else{
                            val = val.substring(0,val.length-1);
                        }
                        selects.val(val);
                        templateModal.modal('hide');
                    }
                })
            },
            //保存为模板
            saveTemplate:function () {
                var self = this;
                $('#saveTemplate').unbind().click(function () {
                    var treeDate = self.getTreeDate();
                    $('#temName').val('');
                    if (treeDate.length > 0){
                        templateModal.modal('hide');
                        setTimeout(function () {
                            templateNameModal.modal('show');
                        },340);
                        self.saveTemName(treeDate);
                    }
                })
            },
            //确定
            saveTemName:function (data) {
                var self = this;
                $('#saveSuccess').unbind().click(function () {
                    var temName = $('#temName').val();
                    console.log(temName)
                    if(temName != ""){
                        $.ajax({
                            type: "GET",
                            url: "../../index.html",
                            success: function (result) {
                                templateNameModal.modal('hide');
                            }
                        })
                    }else {
                        self.errorMsg('请输入模板名称');
                    }

                })
            },

            /******************表格******************/
            //加载人员表格
            loadTable:function () {
                var self = this;
                personTab = $('#tbUserList').DataTable({
                    "dom": '<"top">rt<"bottom"><"clear">p',
                    "bAutoWidth": true,
                    "iDisplayLength" : 20, //默认显示的记录数
                    "bSort": false,
                    "fnDrawCallback": function(){
                        //输入页码跳转
                        var oTable = $('#tbUserList').dataTable();
                        $('#redirect').click(function(){
                            var num = $('#currentText').val();
                            var pageNum;
                            if(num && num>0){
                                pageNum = num-1;
                            }else{
                                pageNum = 0;
                            }
                            oTable.fnPageChange( pageNum );
                        });
                    },
                    ajax: function (data, callback, settings) {
                        //console.log(param);
                        //ajax请求数据
                        $.ajax({
                            type: "GET",
                            url: "../../index.html",
                            cache: false, //禁用缓存
                            success: function (result) {
                                result =  [{id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'11',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'12',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'13',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'14',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'15',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'16',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'17',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'18',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'19',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'111',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1112',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'112',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'113',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'114',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'115',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'116',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'117',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'118',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'119',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'120',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'122',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'123',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'在职',mobile:'13586428745'},
                                    {id:'1',name:'程皓',section:'管理部门',job:'1209',workStatus:'离职',mobile:'13586428745'}];
                                //console.log(result);
                                //setTimeout仅为测试延迟效果
                                setTimeout(function () {
                                    //封装返回数据
                                    var returnData = {};
                                    returnData.total = result.length;
                                    returnData.limit = 20   ;
                                    returnData.page = 10;
                                    returnData.data = result;
                                    //console.log(returnData);
                                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                                    callback(returnData);
                                    //数据加载完成后显示全选框
                                    $('.checkBoxAll').css('visibility','inherit');
                                    self.checkAll();
                                    //调用删除方法
                                    self.deleteItem();
                                }, 1000);
                            }
                        });
                    },
                    //列表表头字段
                    columns: [
                        {
                            "data": "id",
                            "render": function (data, type, full, meta) {
                                var htm = '<div class="checkBox">' +
                                    '<input type="checkbox" id="item' + data + '" name="personItem" class="check" value="' + data + '">' +
                                    '<label for="item' + data + '" class="icon-18"></label>' +
                                    '</div>';
                                return htm;
                            }
                        },
                        { "data": "id" },
                        { "data": "name" },
                        { "data": "section" },
                        { "data": "job" },
                        { "data": "workStatus" },
                        { "data": "mobile" }
                    ],
                    columnDefs:[{
                        targets: 7,
                        render: function (data, type, row) {
                            return '<a class="icon-16" data-id="'+row.id+'" data-toggle="modal" data-target="#myModal"></a>';
                        }
                    }]
                });
            },
            //全选
            checkAll:function () {
                $('input[name="checkAll"]').click(function(){
                    if($(this).is(':checked')){
                        $('input[name="personItem"]').each(function(){
                            $(this).prop("checked",true);
                        });
                    }else{
                        $('input[name="personItem"]').each(function(){
                            $(this).prop("checked",false);
                        });
                    }
                });
            },
            //删除指定通知接收人
            deletePerson: function (result) {
                $('.close').click(function () {
                    var dataId = $(this).attr('dataId');
                    result.splice(dataId, 1);
                    $(this).parent().parent().remove();
                })
            },
            //删除
            deleteItem:function () {
                $('#myModal').on('show.bs.modal', function (event) {
                    var button = $(event.relatedTarget);// 触发事件的按钮
                    var recipient = button.data("id");// 解析出id
                    console.log(recipient);
                })
            }

        };
        new personSearch();
    } );
})(jQuery,document);
