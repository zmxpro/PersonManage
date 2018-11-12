(function ($, doc) {
    $(document).ready(function () {
        var tabStatus;//0岗位信息  1职称信息  2职业证书信息  3教育履历  4 考核记录  5奖惩记录
        var dataTab;//表格
        var professionInfo = $('#professionInfo');//职业信息
        /**/var station = $('#station');//岗位信息
        /**/var technical = $('#technical');//职称信息
        /**/var vocational = $('#vocational');//职业证书信息
        var eduRecord = $('#eduRecord');//教育履历
        var insRecord = $('#insRecord');//考核记录
        var disRecord = $('#disRecord');//奖惩记录

        var editAddModal = $('#editAddModal');//新增或者编辑弹框
        var editAddContent = $('#editAddModal').find('.modalContent');//新增或者编辑弹框

        var receivedModal = $('#receivedModal');//基本信息
        var modelContent = $('#receivedModal .modelContent');//基本信息

        var deleteModal = $('#deleteModal');//删除提示框
        var sureBtn = deleteModal.find('.sureBtn');//删除提示框的确定按钮

        function personDetail() {
            this.init();
        }

        personDetail.prototype = {
            init: function () {
                this.infoParentNav();//切换
                this.initInfo();//初始化基本信息编辑
            },
            /*******************华丽分割线之公共方法*******************/
            //切换
            infoParentNav:function () {
                var self = this;
                $('#infoParentNav li').click(function () {
                    self.tabAdd();//新增按钮
                    var infoIndex = $(this).index();
                    switch (infoIndex){
                        case 0:
                            break;
                        case 1:
                            self.professionStatus();
                            break;
                        case 2:
                            tabStatus = 3;
                            self.addTab(eduRecord);
                            self.initDataTab();
                            break;
                            /*self.initEduRecord();
                            break;*/
                        case 3:
                            tabStatus = 4;
                            self.addTab(insRecord);
                            self.initDataTab();
                            break;
                            /*self.initInsRecord();
                            break;*/
                        case 4:
                            tabStatus = 5;
                            self.addTab(disRecord);
                            self.initDataTab();
                            break;
                            /*self.initDisRecord();
                            break;*/
                    }
                })
            },
            /**职业信息**/
            professionStatus:function () {
                var self = this;
                tabStatus = professionInfo.find('.childNav li.active').index();
                self.professionInit();
                professionInfo.find('.childNav li').click(function () {
                    tabStatus = $(this).index();
                    self.professionInit();
                })
            },
            professionInit:function () {
                var self = this;
                switch (tabStatus){
                    case 0:
                        self.addTab(station);
                        self.initDataTab();
                        break;
                    case 1:
                        self.addTab(technical);
                        self.initDataTab();
                        break;
                    case 2:
                        self.addTab(vocational);
                        self.initDataTab();
                        break;
                }
            },
            //添加表格
            addTab:function (obj) {
                var tabId = 'tabAll'+tabStatus;
                var tabHtml = '<table class="table tableList" id="'+tabId+'">'+
                    '<thead class="text-center "><tr><th></th></tr></thead>'+
                    '<tbody></tbody>'+
                    '</table>';
                if(obj.find('#'+tabId).length == 0){
                    obj.append(tabHtml);
                }
            },
            //打开删除弹窗
            openModal:function (id) {
                sureBtn.attr('id',id);//添加确定按钮上的ID，用于删除点击
                deleteModal.modal('show');
            },
            //删除成功后3秒后，关闭弹窗
            closeModal:function () {
                var time = 3;
                deleteModal.modal('hide');
                $('#deleteSucModal').find('.modal-title').html('删除成功，'+ time +'秒后自动关闭');
                $('#deleteSucModal').modal({backdrop: 'static', keyboard: false,'show':true});
                var delSuccess = setInterval(function () {
                    time --;
                    if(time == 0){
                        $('#deleteSucModal').modal('hide');
                        clearInterval(delSuccess);
                        return;
                    }
                    $('#deleteSucModal').find('.modal-title').html('删除成功，'+ time +'秒后自动关闭');
                },1000)
            },
            //日期初始化-年月日
            initData:function (obj) {
                obj.datetimepicker({
                    minView: "month", //选择日期后，不会再跳转去选择时分秒
                    language:  'zh-CN',
                    format: 'yyyy-mm-dd',
                    autoclose: 1
                });
            },
            //日期初始化-年
            initYearData:function (obj) {
                var data = new Date().getFullYear();
                obj.datetimepicker({
                    startView: 'decade',
                    minView: 'decade',
                    endDate:data,
                    format: 'yyyy',
                    maxViewMode: 2,
                    minViewMode:2,
                    autoclose: true
                });
            },
            //初始化树形结构
            initTree: function (obj) {
                var self = this;
                editAddModal.modal('hide');
                $('#treeModal').modal({backdrop: 'static', keyboard: false,'show':true});

                var setting = {
                    view: {
                        dblClickExpand: false,
                        selectedMulti: false,
                        showIcon: false,
                        nameIsHTML: true,
                        expandSpeed: "normal"
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

                var s = {
                    "address": {
                        "street": "科技园路.",
                        "city": "江苏苏州",
                        "country": "中国"
                    },
                    "sss": {
                        "street": "科技园路.",
                        "city": "江苏苏州",
                        "country": "中国"
                    }
                };


                var treeAll = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                treeAll.expandAll(true);
                self.sureOrg(obj);
            },
            sureOrg: function (obj) {
                var self = this;
                $('#choiceIns').unbind().click(function () {
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");

                    var node = zTree.getSelectedNodes();

                    console.log(node);
                    zTree.selectNode(node);

                    var name = node[0].name;
                    if(name == undefined){
                        alert('请选择！');
                    }else {
                        editAddModal.modal('show');
                        $('#treeModal').modal('hide');
                        obj.val(name)
                    }
                })
            },


            /*******************华丽分割线之基本信息*******************/
            //初始化基本信息编辑
            initInfo: function () {
                var self = this;
                this.clickDom();
                this.initData($('#inlineData'));
                this.initData($('#approvalData'));
                //基本信息编辑
                $('#editPerson').click(function () {
                    $('#receivedModal').modal('show')
                });
            },
            /*上传图片*/
            clickDom: function () {
                var self = this;
                $('#changeHead').on('change', function () {
                    self.uploading($(this));
                })
            },
            uploading: function (obj) {
                var images = obj.prop('files')[0];
                if (images.size <= 5 * 1024 * 1024) {
                    if (window.FileReader) {
                        var reader = new FileReader();
                        reader.readAsDataURL(images);
                        //监听文件读取结束后事件
                        reader.onloadend = function (e) {
                            $("#head").attr('src', e.target.result);   //e.target.result就是最后的路径地址
                        };
                    }
                } else {
                    alert("图片太大！请重新选择！");
                }
            },

            /*******************华丽分割线之表格操作*******************/
            //表格初始化方法
            initDataTab:function () {
                var self = this;
                var url;
                var tabDom = $('#tabAll'+tabStatus+'');
                switch (tabStatus){
                    case 0:
                        url = '../../index.html';
                        break;
                    case 1:
                        url = '../../index.html';
                        break;
                    case 2:
                        url = '../../index.html';
                        break;
                    case 3:
                        url = '../../index.html';
                        break;
                    case 4:
                        url = '../../index.html';
                        break;
                    case 5:
                        url = '../../index.html';
                        break;
                }
                dataTab = tabDom.DataTable({
                    dom: '<"top">rt<"bottom"><"clear">p',
                    bAutoWidth: true,
                    iDisplayLength : 3, //默认显示的记录数
                    bSort: false,
                    destroy:true,
                    fnDrawCallback: function(){
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
                        //ajax请求数据
                        $.ajax({
                            type: "GET",
                            url: url,
                            cache: false, //禁用缓存
                            success: function (result) {
                                //以教育履历做的数据
                                result =  [{id:'1',schoolName:'浙江大学',startTime:'2015-9-01',eduName:'浙大',endTime:'2018-06-12',eduStatus:'硕士',graduatedWay:'毕业'},
                                    {id:'2',schoolName:'南京大学',startTime:'2015-9-01',eduName:'浙大',endTime:'2018-06-12',eduStatus:'硕士',graduatedWay:'肄业'},
                                    {id:'3',schoolName:'复旦大学',startTime:'2015-9-01',eduName:'浙大',endTime:'2018-06-12',eduStatus:'硕士',graduatedWay:'肄业'},
                                    {id:'4',schoolName:'南京大学',startTime:'2015-9-01',eduName:'浙大',endTime:'2018-06-12',eduStatus:'硕士',graduatedWay:'毕业'},
                                    {id:'5',schoolName:'浙江大学',startTime:'2015-9-01',eduName:'浙大',endTime:'2018-06-12',eduStatus:'硕士',graduatedWay:'毕业'},
                                    {id:'6',schoolName:'浙江大学',startTime:'2015-9-01',eduName:'浙大',endTime:'2018-06-12',eduStatus:'硕士',graduatedWay:'毕业'},
                                    {id:'7',schoolName:'浙江大学',startTime:'2015-9-01',eduName:'浙大',endTime:'2018-06-12',eduStatus:'硕士',graduatedWay:'毕业'}];
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
                                    self.editTabItem(tabDom);//点击编辑
                                    self.deleteTabItem(tabDom);//点击×删除
                                }, 1000);
                            }
                        });
                    },
                    columnDefs:[{
                        targets: 0,
                        render: function (data, type, row) {
                            var htm = '';
                            var rowData = JSON.stringify(row);
                            switch (tabStatus){
                                case 0:
                                    htm = '<div class="infoItem">' +
                                        '<p class="clearfix infoEdit" dataId = '+ row.id +'>' +
                                        '<input type="hidden" value='+ rowData +'>' +
                                        '<span class="pull-left editTab">编辑</span><i class="pull-right deleteTab">×</i>' +
                                        '</p>' +
                                        '<ul class="infoDetail clearfix">' +
                                        '<li><p>在岗时间</p>2017-06-02</li>' +
                                        '<li><p>离岗时间</p>暂无</li>' +
                                        '<li><p>组织机构</p>国家局</li>' +
                                        '<li><p>所属部门</p>教育处</li>' +
                                        '<li><p>岗位类型</p>管理岗位</li>' +
                                        '<li><p>职务属性</p>机关人员</li>' +
                                        '<li><p>职级</p>副处级<i class="pull-right red">升</i></li>' +
                                        '<li><p>职务</p>教育处<i class="pull-right gray">降</i></li></ul></div>';
                                    break;
                                case 1:
                                    htm = '<div class="infoItem">' +
                                        '<p class="clearfix infoEdit" dataId = '+ row.id +'>' +
                                        '<input type="hidden" value='+ rowData +'>' +
                                        '<span class="pull-left editTab">编辑</span><i class="pull-right deleteTab">×</i>' +
                                        '</p>' +
                                        '<ul class="infoDetail clearfix">' +
                                        '<li><p>评定时间</p>2017-06-02</li>' +
                                        '<li><p>过期时间</p>2017-06-08</li>' +
                                        '<li><p>出具单位</p>鉴定处</li>' +
                                        '<li><p>职称</p>高级职称<i class="pull-right red">升</i></li>' +
                                        '<li><p>专业类</p>法律类</li>' +
                                        '<li><p>是否在聘</p>在聘</li>' +
                                        '</ul></div>';
                                    break;
                                case 2:
                                    htm = '<div class="infoItem">' +
                                        '<p class="clearfix infoEdit" dataId = '+ row.id +'>' +
                                        '<input type="hidden" value='+ rowData +'>' +
                                        '<span class="pull-left editTab">编辑</span><i class="pull-right deleteTab">×</i>' +
                                        '</p>' +
                                        '<ul class="infoDetail clearfix">' +
                                        '<li><p>发证时间</p>2017-06-02</li>' +
                                        '<li><p>过期时间</p>2017-06-08</li>' +
                                        '<li><p>出具单位</p>鉴定处</li>' +
                                        '<li><p>职业证书</p>一级证书</li>' +
                                        '<li style="width:100%;"><p>证书编号</p>578764564132132132564851</li>' +
                                        '<li><p>职业工种</p>烟叶工</li>' +
                                        '<li><p>是否在岗</p>在岗</li>' +
                                        '</ul></div>';
                                    break;
                                case 3:
                                    htm = '<div class="infoItem">' +
                                        '<p class="clearfix infoEdit" dataId = '+ row.id +'>' +
                                        '<input type="hidden" value='+ rowData +'>' +
                                        '<span class="pull-left editTab">编辑</span><i class="pull-right deleteTab">×</i>' +
                                        '</p>' +
                                        '<ul class="infoDetail clearfix">' +
                                        '<li><p>学校名称</p>'+ row.schoolName +'</li>' +
                                        '<li><p>开始日期</p>'+ row.startTime +'</li>' +
                                        '<li><p>学历名称</p>'+ row.eduName +'</li>' +
                                        '<li><p>结束日期</p>'+ row.endTime +'</li>' +
                                        '<li><p>学历情况</p>'+ row.eduStatus +'</li>' +
                                        '<li><p>毕业方式</p>'+ row.graduatedWay +'</li></ul></div>';
                                    break;
                                case 4:
                                    htm = '<div class="infoItem">' +
                                        '<p class="infoEdit clearfix" dataId = '+ row.id +'>' +
                                        '<input type="hidden" value='+ rowData +'>' +
                                        '<span class="pull-left editTab">编辑</span><i class="pull-right deleteTab">×</i>' +
                                        '</p>' +
                                        '<ul class="infoDetail clearfix">' +
                                        '<li><p>考核年度</p>优秀</li>' +
                                        '<li><p>考核组织</p>不知道什么组织</li>' +
                                        '<li><p>考核意见人</p>更不知道了</li>' +
                                        '<li><p>考核机构</p>不存在的</li></ul></div>';
                                    break;
                                case 5:
                                    htm = '<div class="infoItem">' +
                                        '<p class="infoEdit clearfix" dataId = '+ row.id +'>' +
                                        '<input type="hidden" value='+ rowData +'>' +
                                        '<span class="pull-left editTab">编辑</span><i class="pull-right deleteTab">×</i>' +
                                        '</p>' +
                                        '<ul class="infoDetail clearfix">' +
                                        '<li><p>奖惩时间</p>2018-02-02</li>' +
                                        '<li><p>奖惩类型</p>2018-02-02</li>' +
                                        '<li><p>奖惩内容</p>2018-02-02</li>' +
                                        '<li><p>奖惩组织</p>2018-02-02</li>' +
                                        '<li><p>备注</p>2018-02-02</li><li></li></ul></div>';
                                    break;
                            }
                            return htm;
                        }
                    }]
                });
            },
            //新增按钮
            tabAdd:function () {
                var self = this;
                $('.addBtn').unbind().click(function () {
                    var formData = "";
                    self.AddEditForm(formData,1);
                });
            },
            //点击编辑
            editTabItem:function (tabDom) {
                var self = this;
                tabDom.on('click','.editTab',function () {
                    var formData = JSON.parse($(this).siblings('input').val());
                    self.AddEditForm(formData,2);
                })
            },
            //新增按钮,点击编辑,saveStu  1是新增，2是编辑
            AddEditForm:function (formData,saveStu) {
                var self = this;
                var form;
                editAddContent.html("");
                switch (tabStatus){
                    case 0:
                        form = self.stationForm(formData);
                        break;
                    case 1:
                        form = self.technicalForm(formData);
                        break;
                    case 2:
                        form = self.vocationalForm(formData);
                        break;
                    case 3:
                        form = self.eduRecordForm(formData);
                        break;
                    case 4:
                        form = self.insRecordForm(formData);
                        break;
                    case 5:
                        form = self.disRecordForm(formData);
                        $('#rpData').click(function () {
                            self.initTree($(this).find('input'));
                        });
                        break;
                }
                editAddContent.html(form);
                //初始化时间
                self.initData($('.initTime'));
                self.initYearData($('.initYear'));
                //初始化组织机构
                $('.initOrg').click(function () {
                    self.initTree($(this).find('input'));
                })
                //显示弹框
                editAddModal.modal({backdrop: 'static', keyboard: false,'show':true});
                //调用保存
                self.saveForm(saveStu);
            },
            //点击×删除
            deleteTabItem:function (tabDom) {
                var self = this;
                tabDom.on('click','.deleteTab',function () {
                    var dataId = $(this).parent().attr('dataId');
                    self.openModal('deleteTabItemSure');
                    self.deleteTabSure(dataId);
                })
            },
            //确定删除
            deleteTabSure:function (dataId) {
                var self = this;
                $('#deleteTabItemSure').unbind().click(function () {
                    var delUrl;
                    switch (tabStatus){
                        case 0:
                            delUrl = '../../index.html';
                            break;
                        case 1:
                            delUrl = '../../index.html';
                            break;
                        case 2:
                            delUrl = '../../index.html';
                            break;
                        case 3:
                            delUrl = '../../index.html';
                            break;
                        case 4:
                            delUrl = '../../index.html';
                            break;
                        case 5:
                            delUrl = '../../index.html';
                            break;
                    }
                    $.ajax({
                        type: "GET",
                        dataId:dataId,
                        url: delUrl,
                        success: function (result) {
                            self.closeModal();
                        }
                    })
                })
            },
            //弹出框表单-岗位信息
            stationForm:function (formData) {
                var onlineTime='';
                var leaveTime='';
                var eduName='';
                var endTime='';
                var eduStatus='';
                var graduatedWay='';
                if(formData!=''){
                }
                var htm = '<form class="form-horizontal clearfix" data-toggle="validator" role="form">'+
                    '<div class="form-group col-sm-6 mustRequired">'+
                    '<label class="control-label col-sm-4">在岗时间：</label>'+
                    '<div class="col-sm-8 dataTime">'+
                    '<input type="text" id="onlineTime" class="form-control initTime" required value="'+onlineTime+'" readonly>'+
                    '<label for="inlineData" class="glyphicon glyphicon-calendar fa fa-calendar"></label>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6">'+
                    '<label class="control-label col-sm-4">离岗时间：</label>'+
                    '<div class="col-sm-8 dataTime">'+
                    '<input type="text" id="leaveTime" class="form-control initTime" value="'+leaveTime+'" readonly>'+
                    '<label for="inlineData" class="glyphicon glyphicon-calendar fa fa-calendar"></label>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6 mustRequired">'+
                    '<label class="control-label col-sm-4">组织机构：</label>'+
                    '<div class="col-sm-8">'+
                    '<div class="input-group initOrg" id="rpData">'+
                    '<input type="text" class="form-control" readonly>'+
                    '<span class="input-group-addon"></span>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6">'+
                    '<label class="control-label col-sm-4">所属部门：</label>'+
                    '<div class="col-sm-8">'+
                    '<div class="input-group">'+
                    '<select class="form-control">'+
                    '<option value="">教育处</option>'+
                    '<option value="">教育处</option>'+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6 mustRequired">'+
                    '<label class="control-label col-sm-4">岗位类型：</label>'+
                    '<div class="col-sm-8">'+
                    '<div class="input-group">'+
                    '<select class="form-control">'+
                    '<option value="">管理类</option>'+
                    '<option value="">专业技术类</option>'+
                    '<option value="">生产操作类</option>'+
                    '<option value="">业务类</option>'+
                    '<option value="">服务类</option>'+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6 mustRequired">'+
                    '<label class="control-label col-sm-4">职务属性：</label>'+
                    '<div class="col-sm-8">'+
                    '<div class="input-group">'+
                    '<select class="form-control">'+
                    '<option value="">信息技术</option>'+
                    '<option value="">国际贸易</option>'+
                    '<option value="">人力资源</option>'+
                    '<option value="">国家局管理</option>'+
                    '<option value="">班子成员</option>'+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6 mustRequired">'+
                    '<label class="control-label col-sm-4">职级：</label>'+
                    '<div class="col-sm-8">'+
                    '<div class="input-group">'+
                    '<select class="form-control">'+
                    '<option value="">正部级</option>'+
                    '<option value="">副部级</option>'+
                    '<option value="">正厅级</option>'+
                    '<option value="">副厅级</option>'+
                    '<option value="">正局级</option>'+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6 mustRequired">'+
                    '<label class="control-label col-sm-4">职级升降：</label>'+
                    '<div class="col-sm-8">'+
                    '<div class="input-group">'+
                    '<select class="form-control">'+
                    '<option value="">升</option>'+
                    '<option value="">降</option>'+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6 mustRequired">'+
                    '<label class="control-label col-sm-4">职务：</label>'+
                    '<div class="col-sm-8">'+
                    '<div class="input-group">'+
                    '<select class="form-control">'+
                    '<option value="">党团职务</option>'+
                    '<option value="">行政职务</option>'+
                    '<option value="">企业职务</option>'+
                    '<option value="">董事会职务</option>'+
                    '<option value="">工会（监事会）职务</option>'+
                    '<option value="">学会职务</option>'+
                    '<option value="">其他职务</option>'+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6 mustRequired">'+
                    '<label class="control-label col-sm-4">职务升降：</label>'+
                    '<div class="col-sm-8">'+
                    '<div class="input-group">'+
                    '<select class="form-control">'+
                    '<option value="">升</option>'+
                    '<option value="">降</option>'+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="modal-footer col-sm-12">'+
                    '<button type="button" class="btn btn-primary saveForm" id="saveInfoBtn">保存</button>'+
                    '</div>'+
                    '</form>';
                return htm;
            },
            //弹出框表单-职称信息
            technicalForm:function (formData) {
                var onlineTime='';
                var leaveTime='';
                var eduName='';
                var endTime='';
                var eduStatus='';
                var graduatedWay='';
                if(formData!=''){
                }
                var htm = '<form class="form-horizontal clearfix" data-toggle="validator" role="form">'+
                    '<div class="form-group col-sm-6">'+
                    '<label class="control-label col-sm-4">评定时间：</label>'+
                    '<div class="col-sm-8 dataTime">'+
                    '<input type="text" id="onlineTime" class="form-control initTime" value="'+onlineTime+'" readonly>'+
                    '<label for="inlineData" class="glyphicon glyphicon-calendar fa fa-calendar"></label>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6 ">'+
                    '<label class="control-label col-sm-4">过期时间：</label>'+
                    '<div class="col-sm-8 dataTime">'+
                    '<input type="text" id="leaveTime" class="form-control initTime" value="'+leaveTime+'" readonly>'+
                    '<label for="inlineData" class="glyphicon glyphicon-calendar fa fa-calendar"></label>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6 mustRequired">'+
                    '<label class="control-label col-sm-4">出具单位：</label>'+
                    '<div class="col-sm-8">'+
                    '<input type="text" class="form-control" value="" required>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6 mustRequired">'+
                    '<label class="control-label col-sm-4">专业类：</label>'+
                    '<div class="col-sm-8">'+
                    '<div class="input-group">'+
                    '<select class="form-control">'+
                    '<option value="">经济类</option>'+
                    '<option value="">管理类</option>'+
                    '<option value="">法律类</option>'+
                    '<option value="">语言类</option>'+
                    '<option value="">理工类</option>'+
                    '<option value="">农业类</option>'+
                    '<option value="">财务类</option>'+
                    '<option value="">信息类</option>'+
                    '<option value="">烟草类</option>'+
                    '<option value="">其他</option>'+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6">'+
                    '<label class="control-label col-sm-4">职称：</label>'+
                    '<div class="col-sm-8">'+
                    '<div class="input-group">'+
                    '<select class="form-control">'+
                    '<option value="">正高级</option>'+
                    '<option value="">副高级</option>'+
                    '<option value="">高级职称</option>'+
                    '<option value="">中级职称</option>'+
                    '<option value="">初级职称</option>'+
                    '<option value="">无职称</option>'+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6">'+
                    '<label class="control-label col-sm-4">职称升降：</label>'+
                    '<div class="col-sm-8">'+
                    '<div class="input-group">'+
                    '<select class="form-control">'+
                    '<option value="">升</option>'+
                    '<option value="">降</option>'+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6 mustRequired">'+
                    '<label class="control-label col-sm-4">是否在聘：</label>'+
                    '<div class="col-sm-8">'+
                    '<div class="input-group">'+
                    '<select class="form-control">'+
                    '<option value="">在聘</option>'+
                    '<option value="">解聘</option>'+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="modal-footer col-sm-12">'+
                    '<button type="button" class="btn btn-primary saveForm" id="saveInfoBtn">保存</button>'+
                    '</div>'+
                    '</form>';
                return htm;
            },
            //弹出框表单-职业证书信息
            vocationalForm:function (formData) {
                var onlineTime='';
                var leaveTime='';
                var eduName='';
                var endTime='';
                var eduStatus='';
                var graduatedWay='';
                if(formData!=''){
                }
                var htm = '<form class="form-horizontal clearfix" data-toggle="validator" role="form">'+
                    '<div class="form-group col-sm-6 mustRequired">'+
                    '<label class="control-label col-sm-4">发证时间：</label>'+
                    '<div class="col-sm-8 dataTime">'+
                    '<input type="text" id="onlineTime" class="form-control initTime" value="'+onlineTime+'" readonly>'+
                    '<label for="inlineData" class="glyphicon glyphicon-calendar fa fa-calendar"></label>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6">'+
                    '<label class="control-label col-sm-4">发证时间：</label>'+
                    '<div class="col-sm-8 dataTime">'+
                    '<input type="text" id="leaveTime" class="form-control initTime" value="'+leaveTime+'" readonly>'+
                    '<label for="inlineData" class="glyphicon glyphicon-calendar fa fa-calendar"></label>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6 mustRequired">'+
                    '<label class="control-label col-sm-4">出具单位：</label>'+
                    '<div class="col-sm-8">'+
                    '<input type="text" class="form-control" value="鉴定处" required>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6">'+
                    '<label class="control-label col-sm-4">职业证书：</label>'+
                    '<div class="col-sm-8">'+
                    '<input type="text" class="form-control" value="一级证书" required>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6 mustRequired">'+
                    '<label class="control-label col-sm-4">证书编号：</label>'+
                    '<div class="col-sm-8">'+
                    '<input type="text" class="form-control" value="" required>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6 mustRequired">'+
                    '<label class="control-label col-sm-4">职业工种：</label>'+
                    '<div class="col-sm-8">'+
                    '<div class="input-group">'+
                    '<select class="form-control">'+
                    '<option value="">储丝工</option>'+
                    '<option value="">切丝工</option>'+
                    '<option value="">切尖工</option>'+
                    '<option value="">切尖解把工</option>'+
                    '<option value="">制烟材料收发工</option>'+
                    '<option value="">加香工</option>'+
                    '<option value="">卷接工</option>'+
                    '<option value="">卷烟包装工</option>'+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group col-sm-6 mustRequired">'+
                    '<label class="control-label col-sm-4">是否在岗：</label>'+
                    '<div class="col-sm-8">'+
                    '<div class="input-group">'+
                    '<select class="form-control">'+
                    '<option value="">在岗</option>'+
                    '<option value="">离岗</option>'+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="modal-footer col-sm-12">'+
                    '<button type="button" class="btn btn-primary saveForm" id="saveInfoBtn">保存</button>'+
                    '</div>'+
                    '</form>';
                return htm;
            },
            //弹出框表单-教育履历
            eduRecordForm:function (formData) {
                var schoolName='';
                var startTime='';
                var eduName='';
                var endTime='';
                var eduStatus='';
                var graduatedWay='';
                if(formData!=''){
                    schoolName = formData.schoolName;
                    startTime = formData.startTime;
                    eduName = formData.eduName;
                    endTime = formData.endTime;
                }
                var htm = '<form class="form-horizontal clearfix" data-toggle="validator" role="form">'+
                        '<div class="form-group col-sm-6 mustRequired">'+
                        '<label class="control-label col-sm-4">学校名称：</label>'+
                        '<div class="col-sm-8">'+
                        '<input type="text" class="form-control" value="'+schoolName+'" required>'+
                        '</div>'+
                        '</div>'+
                        '<div class="form-group col-sm-6">'+
                        '<label class="control-label col-sm-4">开始日期：</label>'+
                        '<div class="col-sm-8 dataTime">'+
                        '<input type="text" id="eduStartData" class="form-control" value="'+startTime+'" readonly>'+
                        '<label for="inlineData" class="glyphicon glyphicon-calendar fa fa-calendar"></label>'+
                        '</div>'+
                        '</div>'+
                        '<div class="form-group col-sm-6 mustRequired">'+
                        '<label class="control-label col-sm-4">学历名称：</label>'+
                        '<div class="col-sm-8">'+
                        '<input type="text" class="form-control" value="'+eduName+'" required>'+
                        '</div>'+
                        '</div>'+
                        '<div class="form-group col-sm-6">'+
                        '<label class="control-label col-sm-4">结束日期：</label>'+
                        '<div class="col-sm-8 dataTime">'+
                        '<input type="text" id="eduEndData" class="form-control" value="'+endTime+'" readonly>'+
                        '<label for="inlineData" class="glyphicon glyphicon-calendar fa fa-calendar"></label>'+
                        '</div>'+
                        '</div>'+
                        '<div class="form-group col-sm-6 mustRequired">'+
                        '<label class="control-label col-sm-4">学历情况：</label>'+
                        '<div class="col-sm-8">'+
                        '<div class="input-group">'+
                        '<select class="form-control">'+
                        '<option value="">博士</option>'+
                        '<option value="" selected>硕士</option>'+
                        '<option value="">本科</option>'+
                        '<option value="">大专</option>'+
                        '<option value="">中专</option>'+
                        '<option value="">技校</option>'+
                        '<option value="">高中</option>'+
                        '<option value="">初中</option>'+
                        '<option value="">其他</option>'+
                        '</select>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="form-group col-sm-6 mustRequired">'+
                        '<label class="control-label col-sm-4">毕业方式：</label>'+
                        '<div class="col-sm-8">'+
                        '<div class="input-group">'+
                        '<select class="form-control">'+
                        '<option value="">毕业</option>'+
                        '<option value="" selected>肄业</option>'+
                        '</select>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="modal-footer col-sm-12">'+
                        '<button type="button" class="btn btn-primary saveForm" id="saveInfoBtn">保存</button>'+
                        '</div>'+
                        '</form>';
                return htm;
            },
            //弹出框表单-考核记录
            insRecordForm:function (formData) {
                var schoolName='';
                var startTime='';
                var eduName='';
                var endTime='';
                var eduStatus='';
                var graduatedWay='';
                if(formData!=''){
                    schoolName = formData.schoolName;
                    startTime = formData.startTime;
                    eduName = formData.eduName;
                    endTime = formData.endTime;
                }
                var htm = '<form class="form-horizontal clearfix" data-toggle="validator" role="form">'+
                        '<div class="form-group col-sm-6 mustRequired">'+
                        '<label class="control-label col-sm-4">考核年度：</label>'+
                        '<div class="col-sm-8 dataTime">'+
                        '<input type="text" id="insYearData" class="form-control initYear" required>'+
                        '<label for="inlineData" class="glyphicon glyphicon-calendar fa fa-calendar"></label>'+
                        '</div>'+
                        '</div>'+
                        '<div class="form-group col-sm-6">'+
                        '<label class="control-label col-sm-4">考核组织：</label>'+
                        '<div class="col-sm-8 dataTime">'+
                        '<div class="input-group initOrg" id="tissueData">'+
                        '<input type="text" class="form-control" readonly>'+
                        '<span class="input-group-addon"></span>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="form-group col-sm-6 mustRequired">'+
                        '<label class="control-label col-sm-4">考核意见人：</label>'+
                        '<div class="col-sm-8">'+
                        '<div class="input-group">'+
                        '<select class="form-control" readonly>'+
                        '<option value="">博士</option>'+
                        '<option value="">硕士</option>'+
                        '<option value="">本科</option>'+
                        '<option value="">大专</option>'+
                        '<option value="">中专</option>'+
                        '<option value="">技校</option>'+
                        '<option value="">高中</option>'+
                        '<option value="">初中</option>'+
                        '<option value="">其他</option>'+
                        '</select>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="form-group col-sm-6">'+
                        '<label class="control-label col-sm-4">考核机构：</label>'+
                        '<div class="col-sm-8 dataTime">'+
                        '<div class="input-group initOrg" id="orgData">'+
                        '<input type="text" class="form-control" readonly>'+
                        '<span class="input-group-addon"></span>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="modal-footer col-sm-12">'+
                        '<button type="button" class="btn btn-primary" id="saveInfoBtn">确定</button>'+
                        '</div>'+
                        '</form>';
                return htm;
            },
            //弹出框表单-奖惩记录
            disRecordForm:function (formData) {
                var schoolName='';
                var startTime='';
                var eduName='';
                var endTime='';
                var eduStatus='';
                var graduatedWay='';
                if(formData!=''){
                    schoolName = formData.schoolName;
                    startTime = formData.startTime;
                    eduName = formData.eduName;
                    endTime = formData.endTime;
                }
                var htm = '<form class="form-horizontal clearfix" data-toggle="validator" role="form">'+
                        '<div class="form-group col-sm-6 mustRequired">'+
                        '<label class="control-label col-sm-4">奖惩时间：</label>'+
                        '<div class="col-sm-8 dataTime">'+
                        '<input type="text" id="disData" class="form-control initTime" required>'+
                        '<label for="inlineData" class="glyphicon glyphicon-calendar fa fa-calendar"></label>'+
                        '</div>'+
                        '</div>'+
                        '<div class="form-group col-sm-6 mustRequired">'+
                        '<label class="control-label col-sm-4">奖惩类型：</label>'+
                        '<div class="col-sm-8">'+
                        '<div class="input-group">'+
                        '<select class="form-control" readonly>'+
                        '<option value="">奖励</option>'+
                        '<option value="">惩罚</option>'+
                        '</select>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="form-group col-sm-6 mustRequired">'+
                        '<label class="control-label col-sm-4">奖惩内容：</label>'+
                        '<div class="col-sm-8">'+
                        '<input type="text" class="form-control" value="" required>'+
                        '</div>'+
                        '</div>'+
                        '<div class="form-group col-sm-6 mustRequired">'+
                        '<label class="control-label col-sm-4">奖惩组织：</label>'+
                        '<div class="col-sm-8 dataTime">'+
                        '<div class="input-group" id="rpData">'+
                        '<input type="text" class="form-control" readonly>'+
                        '<span class="input-group-addon"></span>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="form-group col-sm-6 mustRequired">'+
                        '<label class="control-label col-sm-4">备注：</label>'+
                        '<div class="col-sm-8">'+
                        '<input type="text" class="form-control" value="" required>'+
                        '</div>'+
                        '</div>'+
                        '<div class="modal-footer col-sm-12">'+
                        '<button type="button" class="btn btn-primary" id="saveInfoBtn">确定</button>'+
                        '</div>'+
                        '</form>';
                return htm;
            },
            //保存，saveStu  1是新增，2是编辑
            saveForm:function (saveStu) {
                var url;
                $('#saveInfoBtn').click(function () {
                    switch (tabStatus){
                        case 0:
                            url = '../../index.html';
                            break;
                        case 1:
                            url = '../../index.html';
                            break;
                        case 2:
                            url = '../../index.html';
                            break;
                        case 3:
                            url = '../../index.html';
                            break;
                        case 4:
                            url = '../../index.html';
                            break;
                        case 5:
                            url = '../../index.html';
                            break;
                    }
                    $.ajax({
                        type: "GET",
                        url: url,
                        cache: false, //禁用缓存
                        success: function (result) {
                            editAddModal.modal('hide');
                            dataTab.ajax.reload();
                        }
                    });
                })
            }
        };
        new personDetail();
    });
})(jQuery, document);
