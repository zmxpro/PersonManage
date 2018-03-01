;(function ($,win,doc) {
    $(doc).ready(function () {
        //全局变量

        function indexPage() {
            this.init();
        }

        indexPage.prototype = {
            init:function () {
                this.itemListStatus();
                this.clickItem()
            },
            clickItem:function () {
                var self = this;
                //菜单点击
                $(".listItem .item").click(function () {
                    var index = $(this).index();
                    sessionStorage.setItem("itemList",index);
                    self.itemListStatus();
                });
                //人员查询
                $("#personSearch").click(function () {
                    sessionStorage.setItem("itemList",1);
                    self.itemListStatus();
                });
                //消息通知
                $("#message").click(function () {
                    sessionStorage.setItem("itemList",6);
                    self.itemListStatus();
                });
                //帐号设置
                $("#setAccount").click(function () {
                    sessionStorage.setItem("itemList",0);
                    self.itemListStatus("personSet");
                });
            },
            //菜单的选中状态
            itemListStatus:function (status) {
                var index = sessionStorage.getItem("itemList");
                if(index == null){
                    index = 0;
                }
                $(".listItem .item").each(function () {
                    if($(this).index() == index){
                        $(this).addClass('active');
                        $(this).siblings().removeClass("active");
                        var url = $(this).attr("href");
                        if(status == "personSet"){
                            url = "views/home/accountSet.html"
                        }
                        $('#mainIframe').attr("src",url);
                    }
                })
            }
        };
        new indexPage();
    })
})(jQuery,window,document);

