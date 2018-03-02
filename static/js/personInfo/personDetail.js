(function ($, doc) {
    $(document).ready(function () {
        var eduRecord,//教育履历
            insRecord,//考核记录
            disRecord;//奖惩记录
        function personDetail() {
            this.init();
        }

        personDetail.prototype = {
            init: function () {
                this.infoParentNav();//切换
                this.check();
                this.clickDom();
                this.initData($('#inlineData'));
                this.initData($('#approvalData'));
                this.eduRecordTab();
                this.insRecordTab();
                this.disRecordTab();
            },
            /*******************华丽分割线之公共方法*******************/
            //切换
            infoParentNav:function () {
                var self = this;
                $('#infoParentNav li').click(function () {
                    var infoIndex = $(this).index();
                    switch (infoIndex){
                        case 0:
                            break;
                        case 1:
                            break;
                        case 2:
                            eduRecord.ajax.reload();
                            break;
                        case 3:
                            insRecord.ajax.reload();
                            break;
                        case 4:
                            disRecord.ajax.reload();
                            break;

                    }
                })
            },
            /*******************华丽分割线之tab-pane0*******************/

            /*******************华丽分割线之tab-pane1*******************/

            /*******************华丽分割线之tab-pane2*******************/
            eduRecordTab:function () {
                var self = this;
                eduRecord = $('#eduRecord .table').DataTable({
                    "dom": '<"top">rt<"bottom"><"clear">p',
                    "bAutoWidth": true,
                    "iDisplayLength" : 10, //默认显示的记录数
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
                        //ajax请求数据
                        $.ajax({
                            type: "GET",
                            url: "../../index.html",
                            cache: false, //禁用缓存
                            success: function (result) {
                                result =  [{id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'}];
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
                                }, 1000);
                            }
                        });
                    },
                    columnDefs:[{
                        targets: 0,
                        render: function (data, type, row) {
                            var content = row.content;
                            if(row.content.length > 50){
                                content  = row.content.substring(0,50) + "……";
                            }
                            return '<div class="infoItem">' +
                                '<p class="infoEdit clearfix" dataId = '+ row.id +'>' +
                                '<span class="pull-left">编辑</span><i class="pull-right">×</i>' +
                                '</p>' +
                                '<ul class="infoDetail clearfix">' +
                                '<li><p>学校名称</p>2018-02-02</li>' +
                                '<li><p>开始日期</p>2018-02-02</li>' +
                                '<li><p>学历名称</p>2018-02-02</li>' +
                                '<li><p>结束日期</p>2018-02-02</li>' +
                                '<li><p>学历情况</p>2018-02-02</li>' +
                                '<li><p>毕业方式</p>2018-02-02</li></ul></div>';
                        }
                    }]
                });
            },

            /*******************华丽分割线之tab-pane3*******************/
            insRecordTab:function () {
                var self = this;
                insRecord = $('#insRecord .table').DataTable({
                    "dom": '<"top">rt<"bottom"><"clear">p',
                    "bAutoWidth": true,
                    "iDisplayLength" : 10, //默认显示的记录数
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
                        //ajax请求数据
                        $.ajax({
                            type: "GET",
                            url: "../../index.html",
                            cache: false, //禁用缓存
                            success: function (result) {
                                result =  [{id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'}];
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
                                }, 1000);
                            }
                        });
                    },
                    columnDefs:[{
                        targets: 0,
                        render: function (data, type, row) {
                            return '<div class="infoItem">' +
                                '<p class="infoEdit clearfix" dataId = '+ row.id +'>' +
                                '<span class="pull-left">编辑</span><i class="pull-right">×</i>' +
                                '</p>' +
                                '<ul class="infoDetail clearfix">' +
                                '<li><p>考核年度</p>优秀</li>' +
                                '<li><p>考核组织</p>不知道什么组织</li>' +
                                '<li><p>考核意见人</p>更不知道了</li>' +
                                '<li><p>考核机构</p>不存在的</li></ul></div>';
                        }
                    }]
                });
            },

            /*******************华丽分割线之tab-pane4*******************/
            disRecordTab:function () {
                var self = this;
                disRecord = $('#disRecord .table').DataTable({
                    "dom": '<"top">rt<"bottom"><"clear">p',
                    "bAutoWidth": true,
                    "iDisplayLength" : 10, //默认显示的记录数
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
                        //ajax请求数据
                        $.ajax({
                            type: "GET",
                            url: "../../index.html",
                            cache: false, //禁用缓存
                            success: function (result) {
                                result =  [{id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'}];
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
                                }, 1000);
                            }
                        });
                    },
                    columnDefs:[{
                        targets: 0,
                        render: function (data, type, row) {
                            return '<div class="infoItem">' +
                                '<p class="infoEdit clearfix" dataId = '+ row.id +'>' +
                                '<span class="pull-left">编辑</span><i class="pull-right">×</i>' +
                                '</p>' +
                                '<ul class="infoDetail clearfix">' +
                                '<li><p>奖惩时间</p>2018-02-02</li>' +
                                '<li><p>奖惩类型</p>2018-02-02</li>' +
                                '<li><p>奖惩内容</p>2018-02-02</li>' +
                                '<li><p>奖惩组织</p>2018-02-02</li>' +
                                '<li><p>备注</p>2018-02-02</li><li></li></ul></div>';
                        }
                    }]
                });
            },
            //全选
            check: function () {
                var self = this;
                $('#editPerson').click(function () {
                    $('#receivedModal').modal('show')
                });
            },
            //日期初始化
            initData:function (obj) {
                obj.datetimepicker({
                    minView: "month",//选择日期后，不会再跳转去选择时分秒
                    language:  'zh-CN',  //日期
                    autoclose: true,
                    format: 'yyyy-mm-dd'
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
            }
        };
        new personDetail();
    });
})(jQuery, document);
