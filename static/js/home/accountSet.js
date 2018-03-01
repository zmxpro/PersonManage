;(function ($,win,doc) {
    $(doc).ready(function () {
        var editBtn = $('#editBtn');
        var personForm = $('#personForm').find('.form-control');
        var saveBtn = $('#saveBtn');
        //全局变量
        function personSetPage() {
            this.init();
        }
        personSetPage.prototype = {
            init:function () {
                this.changePassword();//修改密码
                this.clickDom();/*上传图片*/
                this.editPerson()
            },
            //编辑
            editPerson:function () {
                var self = this;
                editBtn.click(function(){
                    $(this).addClass('alreadyClick');
                    personForm.removeAttr('readonly');
                    saveBtn.removeClass('displayNone');
                    self.savePerson();
                })
            },
            //保存
            savePerson:function () {
                saveBtn.find('.btn').click(function(){
                    editBtn.removeClass('alreadyClick');
                    personForm.attr('readonly','readonly');
                    saveBtn.addClass('displayNone');
                })
            },
            //修改密码
            changePassword:function () {
              $("#changePassword").click(function () {
                  $('#passwordModal').modal('show');
              })
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

        new personSetPage();
    })
})(jQuery,window,document);

