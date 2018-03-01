(function ($, doc) {
    $(document).ready(function () {
        function personDetail() {
            this.init();
        }

        personDetail.prototype = {
            init: function () {
                this.check();
            },
            //全选
            check: function () {
                var self = this;
                $('.edit').click(function () {
                    self.edit();//修改title信息
                });
            },
            //修改title信息，此方法需要菜单列传参后修改状态值
            edit: function () {
                var showForm = $('.showForm')
                var editForm = $('.editForm')
                editForm.removeClass('displayNone')
                showForm.addClass('displayNone')

            },
        };
        new personDetail();
    });
})(jQuery, document);
