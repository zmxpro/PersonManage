(function ($,doc) {
    $(document).ready(function() {
        function personInfo() {
            this.init();
        }
        personInfo.prototype = {
            init:function () {
                this.loadTable();//加载权限配置表格
                this.refresh();//刷新
                this.checkAll();//全选
                this.addAuthority()//
            },
            //刷新
            refresh:function () {
                var num = 0;
                $('#refresh').click(function () {
                    //动画
                    if(!$(this).is(":animated")){
                        num++;
                        var deg = 180*num;
                        $(this).css({"transform": "rotate("+deg+"deg)"},
                            {"-webkit-transform": "rotate("+deg+"deg)"},
                            {"-moz-transform": "rotate("+deg+"deg)"},
                            {"-o-transform": "rotate("+deg+"deg)"},
                            {"-ms-transform": "rotate("+deg+"deg)"});
                    }
                })
            },
            //新增权限
            addAuthority:function () {
                $('#addAuthority').click(function () {
                    location.href = 'addAuthority.html';
                })
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
            //加载权限配置表格
            loadTable:function () {
                var self = this;
                $('#tbUserList').DataTable({
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
                        //ajax请求数据
                        $.ajax({
                            type: "GET",
                            url: "../../index.html",
                            cache: false, //禁用缓存
                            success: function (result) {
                                result =  [{id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'11',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'12',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'13',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'14',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'15',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'16',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'17',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'18',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'19',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'111',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1112',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'112',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'113',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'114',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'115',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'116',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'117',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'118',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'119',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'120',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'122',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'123',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'15248753264',mobile:'13586428745'},
                                    {id:'1',name:'JXXY2018',section:'远程培训处',job:'程皓',workStatus:'19345685201',mobile:'13586428745'}];
                                //setTimeout仅为测试延迟效果
                                setTimeout(function () {
                                    //封装返回数据
                                    var returnData = {};
                                    returnData.total = result.length;
                                    returnData.limit = 20   ;
                                    returnData.page = 10;
                                    returnData.data = result;
                                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                                    callback(returnData);
                                    //数据加载完成后显示全选框
                                    $('.checkBoxAll').css('visibility','inherit');
                                    //调用删除方法
                                    self.deleteItem();
                                }, 1000);
                            }
                        });
                    },
                    //列表表头字段
                    columns: [
                        {
                            "sClass": "text-center",
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
            //删除
            deleteItem:function () {
                $('#myModal').on('show.bs.modal', function (event) {
                    var button = $(event.relatedTarget);// 触发事件的按钮
                    var recipient = button.data("id");// 解析出id
                    console.log(recipient);
                })
            }
        };
        new personInfo();
    } );
})(jQuery,document);
