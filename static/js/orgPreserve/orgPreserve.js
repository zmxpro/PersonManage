;(function ($, win, doc) {
    $(doc).ready(function () {
        //全局变量
        var showForm = $('#showForm');//显示基本信息
        var editForm = $('#editForm');//编辑基本信息

        var table;//所属人员表格

        function orgPage() {
            this.init();
        }

        orgPage.prototype = {
            init: function () {
                this.initTree();//初始化树形结构
                this.editInfo();//基本信息编辑
                this.changeNav();//
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

            },
            //基本信息编辑
            editInfo:function () {
                $('#editInfo').click(function () {
                    $(this).addClass('alreadyClick');
                    $('#showForm').addClass('displayNone');
                    $('#editForm').removeClass('displayNone');
                })
            },
            changeNav:function () {
                var self = this;
                $('#parentNav li').click(function () {
                    var  dataId = $(this).attr("dataId");
                    if(dataId == 1){

                    }
                    if(dataId == 2){
                        self.personTable();
                    }
                })
            },
            personTable:function () {
              table = $('#tbUserList').DataTable({
                  "dom": '<"top">rt<"bottom"><"clear">p',
                  "bAutoWidth": true,
                  "iDisplayLength" : 16, //默认显示的记录数
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
                              }, 1000);
                          }
                      });
                  },
                  //列表表头字段
                  columns: [
                      { "data": "id" },
                      { "data": "name" },
                      { "data": "section" },
                      { "data": "job" },
                      { "data": "workStatus" },
                      { "data": "mobile" }
                  ]
              });
            }
        };
        new orgPage();
    })
})(jQuery, window, document);



