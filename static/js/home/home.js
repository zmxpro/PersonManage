;(function ($,win,doc) {
    $(doc).ready(function () {
        //全局变量
        function homePage() {
            this.init();
        }

        homePage.prototype = {
            init:function () {
                this.pie();
                this.noticeSlide();
            },
            //饼图
            pie:function () {
                var myChart = echarts.init(document.getElementById('percent'));
                var option = {
                    legend: {
                        orient : 'vertical',
                        right:"10%",
                        data:['处级以上','处级以下'],
                        textStyle:{
                            fontSize: 14
                        }
                    },
                    backgroundColor: '#fff',
                    series: [{
                        name: 'pie',
                        type: 'pie',
                        radius: ['52%', '68%'],
                        center: ['40%', '50%'],
                        hoverAnimation: false,
                        color: ['#00bcaa', '#00726c'],

                        itemStyle: {
                            normal: {
                                labelLine:{
                                    length:10,
                                    length2:25,
                                    lineStyle:{
                                        color:"#E7E7E7"
                                    }
                                }
                            }
                        },
                        label: {
                            normal: {
                                formatter: function(params) {
                                    return '{total|' + params.value + '}{yellow|'+"人"+'}';
                                },
                                rich: {
                                    total: {
                                        fontSize: 42,
                                        fontFamily:"impact",
                                        align: 'center',
                                        verticalAlign:'bottom'
                                    },
                                    yellow: {
                                        color: "#00726c",
                                        fontSize: 22,
                                        fontWeight:600,
                                        fontFamily:"impact",
                                        margin:[20,0,0,0],
                                        align: 'center',
                                        verticalAlign:'bottom',
                                        padding:[3,3]
                                    }
                                }
                            }
                        },
                        data: [{value: 100,name: '处级以下'},
                               {value: 347,name: '处级以上'}]
                    }]
                };
                myChart.setOption(option);
                win.onresize = function(){
                    myChart.resize();
                }
            },
            //通知消息下拉
            noticeSlide:function () {
                $('#noticeSlide').on('click','li',function () {
                    var content = $(this).find('.content');
                    var icon = $(this).find('.icon-08');
                    $(this).siblings().find('.icon-08').removeClass('square');
                    if(icon.hasClass('square')){
                        icon.removeClass("square");
                    }else {
                        icon.addClass("square");
                    }
                    var content1 = $(this).siblings().find('.content');
                    if(!content.is(":animated")){
                        content.slideToggle();
                        content1.slideUp();
                    }
                })
            }
        };

        new homePage();
    })
})(jQuery,window,document);

