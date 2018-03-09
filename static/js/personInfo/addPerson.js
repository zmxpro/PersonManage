;(function ($, win, doc) {
    $(doc).ready(function () {
        var stepStatus = 0;
        var orgModal = $('#orgModal');//组织模态框

        function addPersonPage() {
            this.init()
        }

        addPersonPage.prototype = {
            init: function () {
                this.stepSwitch();
                this.preStep();
                this.nextStep();
                this.clickDom();
                this.clickBtn();
            },
            /************公共方法************/
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
                orgModal.modal({backdrop: 'static', keyboard: false,'show':true});

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
                    var name = orgModal.find('.curSelectedNode').attr('title');
                    if(name == undefined){
                        alert('请选择！');
                    }else {
                        orgModal.modal('hide');
                        obj.val(name)
                    }
                })
            },
            /************主方法************/
            //步骤切换
            stepSwitch: function () {
                var self = this;
                self.initData($('.initTime'));
                self.initYearData($('.yearTime'));
                $('.initOrg').click(function () {
                    self.initTree($(this).find('input'));
                })

                $('#addPersonBar .addItem').eq(stepStatus).show().siblings().hide();
            },
            //上一步
            preStep: function () {
                var self = this;
                $('.preBtn').click(function () {
                    stepStatus = parseInt($(this).parents('.addItem').index()) - 1;
                    self.stepSwitch();
                })
            },
            //下一步
            nextStep: function () {
                var self = this;
                $('.nextBtn').click(function () {
                    stepStatus = parseInt($(this).parents('.addItem').index()) + 1;
                    self.stepSwitch();
                })
            },
            //新增信息
            clickBtn: function () {
                var self = this;
                $('.clickBtn').click(function () {
                    stepStatus = parseInt($(this).parents('.addItem').index());
                    $(this).prev('form').after(self.choiceTemplate(stepStatus));
                    self.initData($('.dataTime .form-control'));
                    self.delTemplate();
                })
            },
            //删除模板
            delTemplate:function () {
                $('.addContent .icon-22').click(function () {
                    $(this).parent().remove();
                })
            },
            //选择信息模板
            choiceTemplate: function (stepStatus) {
                var infoHtml = "";
                switch (stepStatus) {
                    case 1:
                        infoHtml = '<form class="form-horizontal clearfix" data-toggle="validator" role="form"><i class="icon-22"></i><div class="form-group col-sm-6"><label class="control-label col-sm-4">到岗时间：</label><div class="col-sm-7 dataTime"><input type="text" class="form-control" readonly><label class="glyphicon glyphicon-calendar fa fa-calendar"></label></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">离岗时间：</label><div class="col-sm-7 dataTime"><input type="text" class="form-control" readonly><label class="glyphicon glyphicon-calendar fa fa-calendar"></label></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">组织机构：</label><div class="col-sm-7"><div class="input-group initOrg"><input type="text" class="form-control" readonly=""><span class="input-group-addon"></span></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">所属部门：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option>教育处</option><option>教育处</option><option>教育处</option></select></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">岗位类型：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">管理类</option><option value="">专业技术类</option><option value="">生产操作类</option><option value="">业务类</option><option value="">服务类</option></select></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">职务属性：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">信息技术</option><option value="">国际贸易</option><option value="">人力资源</option><option value="">国家局管理</option><option value="">班子成员</option></select></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">职务：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">党团职务</option><option value="">行政职务</option><option value="">企业职务</option><option value="">董事会职务</option><option value="">工会（监事会）职务</option><option value="">学会职务</option><option value="">其他职务</option></select></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">职务升降：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">升</option><option value="">降</option></select></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">职级：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">正部级</option><option value="">副部级</option><option value="">正厅级</option><option value="">副厅级</option><option value="">正局级</option></select></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">职级升降：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">升</option><option value="">降</option></select></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">党内职务：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">正部级</option><option value="">副部级</option><option value="">正厅级</option><option value="">副厅级</option><option value="">正局级</option></select></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">党内职务升降：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">升</option><option value="">降</option></select></div></div></div></form>'
                        break;
                    case 2:
                        infoHtml = '<form class="form-horizontal clearfix" data-toggle="validator" role="form"><i class="icon-22"></i><div class="form-group col-sm-6"><label class="control-label col-sm-4">评定时间：</label><div class="col-sm-7 dataTime"><input type="text" class="form-control" readonly><label class="glyphicon glyphicon-calendar fa fa-calendar"></label></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">过期时间：</label><div class="col-sm-7 dataTime"><input type="text" class="form-control" readonly><label class="glyphicon glyphicon-calendar fa fa-calendar"></label></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">出具单位：</label><div class="col-sm-7"><input type="text" class="form-control" required></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">专业类：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">经济类</option><option value="">管理类</option><option value="">法律类</option><option value="">语言类</option><option value="">理工类</option><option value="">农业类</option><option value="">财务类</option><option value="">信息类</option><option value="">烟草类</option><option value="">其他</option></select></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">职称：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">高级职称</option><option value="">高级职称</option><option value="">高级职称</option><option value="">高级职称</option><option value="">高级职称</option></select></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">职称升降：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">升</option><option value="">降</option></select></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">是否在聘：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">在聘</option><option value="">解聘</option></select></div></div></div></form>'
                        break;
                    case 3:
                        infoHtml = '<form class="form-horizontal clearfix" data-toggle="validator" role="form"><i class="icon-22"></i><div class="form-group col-sm-6"><label class="control-label col-sm-4">发证时间：</label><div class="col-sm-7 dataTime"><input type="text" class="form-control" readonly><label class="glyphicon glyphicon-calendar fa fa-calendar"></label></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">过期时间：</label><div class="col-sm-7 dataTime"><input type="text" class="form-control" readonly><label class="glyphicon glyphicon-calendar fa fa-calendar"></label></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">出具单位：</label><div class="col-sm-7"><input type="text" class="form-control" required></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">职业证书：</label><div class="col-sm-7"><input type="text" class="form-control" required></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">证书编号：</label><div class="col-sm-7"><input type="text" class="form-control" required></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">职业工种：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">储丝工</option><option value="">切丝工</option><option value="">切尖工</option><option value="">切尖解把工</option><option value="">制烟材料收发工</option><option value="">加香工</option><option value="">卷接工</option><option value="">卷烟包装工</option></select></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">是否在岗：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">在岗</option><option value="">离岗</option></select></div></div></div></form>'
                        break;
                    case 4:
                        infoHtml = '<form class="form-horizontal clearfix" data-toggle="validator" role="form"><i class="icon-22"></i><div class="form-group col-sm-6"><label class="control-label col-sm-4">开始时间：</label><div class="col-sm-7 dataTime"><input type="text" class="form-control" readonly><label class="glyphicon glyphicon-calendar fa fa-calendar"></label></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">结束时间：</label><div class="col-sm-7 dataTime"><input type="text" class="form-control" readonly><label class="glyphicon glyphicon-calendar fa fa-calendar"></label></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">学历情况：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">博士</option><option value="" selected="">硕士</option><option value="">本科</option><option value="">大专</option><option value="">中专</option><option value="">技校</option><option value="">高中</option><option value="">初中</option><option value="">其他</option></select></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">学校名称：</label><div class="col-sm-7"><input type="text" class="form-control" required></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">专业名称：</label><div class="col-sm-7"><input type="text" class="form-control" required></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">毕业方式：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">毕业</option><option value="" selected="">肄业</option></select></div></div></div></form>'
                        break;
                    case 5:
                        infoHtml = '<form class="form-horizontal clearfix" data-toggle="validator" role="form"><i class="icon-22"></i><div class="form-group col-sm-6"><label class="control-label col-sm-4">考核年度：</label><div class="col-sm-7 dataTime"><input type="text" class="form-control" readonly><label class="glyphicon glyphicon-calendar fa fa-calendar"></label></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">考核组织：</label><div class="col-sm-7"><div class="input-group initOrg"><input type="text" class="form-control" readonly=""><span class="input-group-addon"></span></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">考核结果：</label><div class="col-sm-7"><input type="text" class="form-control" required></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">考核意见人：</label><div class="col-sm-7"><input type="text" class="form-control" required></div></div></form>'
                        break;
                    case 6:
                        infoHtml = '<form class="form-horizontal clearfix" data-toggle="validator" role="form"><i class="icon-22"></i><div class="form-group col-sm-6"><label class="control-label col-sm-4">奖惩时间：</label><div class="col-sm-7 dataTime"><input type="text" class="form-control" readonly><label class="glyphicon glyphicon-calendar fa fa-calendar"></label></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">奖惩类型：</label><div class="col-sm-7"><div class="input-group"><select class="form-control"><option value="">博士</option><option value="" selected="">硕士</option><option value="">本科</option><option value="">大专</option><option value="">中专</option><option value="">技校</option><option value="">高中</option><option value="">初中</option><option value="">其他</option></select></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">奖惩单位：</label><div class="col-sm-7 dataTime"><div class="input-group initOrg"><input type="text" class="form-control" readonly=""><span class="input-group-addon"></span></div></div></div><div class="form-group col-sm-6"><label class="control-label col-sm-4">奖惩内容：</label><div class="col-sm-7"><input type="text" class="form-control" required></div></div><div class="form-group col-sm-12" style="margin-left: -20px;"><label class="control-label col-sm-2">奖惩内容：</label><div class="col-sm-8"><textarea class="form-control" id="noticeContent" rows="4"></textarea></div></div></form>'
                        break;
                }
                return infoHtml;
            },


        };

        new addPersonPage();
    })
})(jQuery, window, document)