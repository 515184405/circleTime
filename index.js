/**
 * Created by kuben on 2018/5/22.
 */

$(function(){

    var M = {
        init : function(){
            M.subTime();
        },
        subTime : function(){
            $('#fancyClock').tzineClock({
                // 圆的类名并且是当前圆圈的颜色图
                colors : ['circle1','circle2','circle3','circle4'],
                //圆内显示的文本
                words : ['Days','Hours','Minutes','Seconds'],
            });
            $('#fancyClock1').tzineClock({
                colors : ['circle2','circle3','circle4'],
                words : ['小时','分钟','秒'],
            });
            //默认样式
            $('#fancyClock2').tzineClock();

            // //如果是ie浏览器则默认显示全圈
            // //兼容ie做处理
            // if(M.isIE()){
            //     for(var i = 0; i < $(".fancyClock .clock").length; i++){
            //         $($(".fancyClock .clock")[i]).css({
            //             'background':$($(".fancyClock .clock")[i]).children('.left').children('.left').css('background-image')
            //         })
            //     }
            //     $('.fancyClock .rotate .bg,.fancyClock .front ').remove();
            // }
        },
        //判断是否为ie浏览器
        // isIE : function() { //ie?
        //     if (!!window.ActiveXObject || "ActiveXObject" in window){
        //         return true;
        //     }else{
        //         return false;
        //     }
        // }
    }
    M.init();
})