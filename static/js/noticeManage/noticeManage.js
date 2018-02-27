(function ($,doc) {
    $(document).ready(function() {
        var table;
        var status = 1;
        function personInfo() {
            this.init();
        }
        personInfo.prototype = {
            init:function () {
                this.addNotice();//新增通知
                this.loadTable();//加载人员表格
                this.tab();//切换已发通知，已收通知
            },
            //新增通知
            addNotice:function () {
                $('#addNotice').click(function () {
                    location.href = 'addNotice.html'
                })
            },
            //切换已发通知，已收通知
            tab:function () {
                var self = this;
                $('#myTab a').click(function () {
                    var dataId = $(this).attr("dataId");
                    if(status !=dataId){
                        status = dataId;
                        table.ajax.reload();
                    }
                })
            },
            //加载人员表格
            loadTable:function () {
                var self = this;
                table = $('#tbUserList').DataTable({
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
                        //console.log(param);
                        //ajax请求数据
                        console.log(status);
                        $.ajax({
                            type: "GET",
                            url: "../../index.html",
                            cache: false, //禁用缓存
                            success: function (result) {
                                result =  [{id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息,请在1月31日之前完成人员信息,请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
                                    {id:'1',title:'通知：请尽快完善人员信息',content:'内容：各收到通知的管理员，请在1月31日之前完成人员信息。',time:'2018-01-12 09:45:59',already:'100',none:'120'},
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
                                    self.lookDetail();
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
                            return '<p class="title">'+ row.title +'</p>' +
                                '<p class="content">'+ content +'</p>' +
                                '<p class="showDetail displayNone">'+row.content+'</p>' +
                                '<p class="time clearfix">' +
                                    '<span class="pull-left">'+row.time+'</span>' +
                                    '<span class="detail pull-right">' +
                                        '<i>已收到&nbsp;'+row.already+'</i>' +
                                        '<i>未收到&nbsp;'+row.none+'</i>' +
                                    '</span>' +
                                '</p>';
                        }
                    }]
                });
            },
            //查看消息通知详情
            lookDetail:function () {
                $('#tbUserList tbody tr').on('click', function (event) {
                    var titles = $(this).find(".title").html();
                    var content = $(this).find(".showDetail").html();
                    $("#noticeModalTitle").html(titles);
                    $("#noticeModalContent").html(content);
                    $('#noticeModal').modal('show');
                });
            }
        };
        new personInfo();
    } );
})(jQuery,document);
