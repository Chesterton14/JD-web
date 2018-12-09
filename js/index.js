window.onload = function () {
    /* 1.顶部搜索栏 */
    serach();
    /* 2.轮播图 */
    banner();
    /* 3.倒计时 */
    downTime();
};
var serach = function () {
    /* 1.设置默认透明 */
    var serachBox = document.querySelector('.search_box');
    var bannerHeight = document.querySelector('.jd_banner').offsetHeight;

    /* 监听页面滚动事件 */
    window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop;
        var opacity;
        //console.log(scrollTop, bannerHeight, scrollTop / bannerHeight);
        if (scrollTop < bannerHeight) {
            /* 2.随页面滚动，透明度改变 */
            opacity = scrollTop / bannerHeight;
        } else if (scrollTop > bannerHeight) {
            /* 3.滚动到移动高度后，透明度不变 */
            opacity = 1;
        }
        serachBox.style.backgroundColor = 'rgba(201,21,35,' + opacity + ')';
    }
};

var banner = function () {
    /* 1.实现图片轮播，无缝切换*/
    var banner = document.querySelector('.jd_banner');
    var width = banner.offsetWidth;
    var imgBox = banner.querySelector('ul:first-child');
    var pointBox = banner.querySelector('ul:last-child');
    var points = pointBox.querySelectorAll('li');

    var index = 1;
    var timer = setInterval(function () {
        index++;
        /*加过渡*/
        imgBox.style.transition = 'all 0.5s';
        imgBox.style.webkitTransition = 'all 0.5s';
        /*做位移*/
        imgBox.style.transform = 'translateX(' + (-index * width) + 'px)';
        imgBox.style.webkitTransform = 'translateX(' + (-index * width) + 'px)';
    }, 2000);
    imgBox.addEventListener('transitionend',function () {
        /*自动滚动无缝优化*/
        if (index >= 9){
            index =1;
            /*去过渡*/
            imgBox.style.transition = 'none';
            imgBox.style.webkitTransition = 'none';
            /*做位移*/
            imgBox.style.transform = 'translateX(' + (-index * width) + 'px)';
            imgBox.style.webkitTransform = 'translateX(' + (-index * width) + 'px)';
        }
        /*滑动无缝优化*/
    });
    /* 2.点跟随图片一起改变*/
    /* 3.根据手指的滑动切换图片，滑动到一定距离切换，未滑动到一定距离恢复*/

};

var downTime = function () {

};
