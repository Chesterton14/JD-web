window.onload = function () {
    /* 1.顶部搜索栏 */
    search();
    /* 2.轮播图 */
    banner();
    /* 3.倒计时 */
    downTime();
};
var search = function () {
    /* 1.设置默认透明 */
    var searchBox = document.querySelector('.search_box');
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
        searchBox.style.backgroundColor = 'rgba(201,21,35,' + opacity + ')';
    }
};

var banner = function () {
    /* 1.实现图片轮播，无缝切换*/
    /* 2.点跟随图片一起改变*/
    /* 3.根据手指的滑动切换图片，滑动到一定距离切换，未滑动到一定距离恢复*/

    var banner = document.querySelector('.jd_banner');
    var width = banner.offsetWidth;
    var imgBox = banner.querySelector('ul:first-child');
    var pointBox = banner.querySelector('ul:last-child');
    var points = pointBox.querySelectorAll('li');

    //创建添加过渡动画的函数
    var addTransition = function () {
        imgBox.style.transition = 'all 0.5s ease-out';
        imgBox.style.webkitTransition = 'all 0.5s ease-out';
    };
    //创建去除过渡动画的函数
    var removeTransition = function () {
        imgBox.style.transition = 'none';
        imgBox.style.webkitTransition = 'none';
    };
    //创建设置x轴平移的函数
    var setTranslate = function (translateX) {
        imgBox.style.transform = 'translateX(' + translateX + 'px)';
        imgBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    };

    var index = 1;
    var timer = setInterval(function () {
        index++;
        /*加过渡*/
        addTransition();
        /*做位移*/
        setTranslate(-index * width);
    }, 1500);

    imgBox.addEventListener('transitionend', function () {
        /*自动滚动无缝优化*/
        if (index >= 9) {
            index = 1;
            /*去过渡*/
            removeTransition();
            /*做位移*/
            setTranslate(-index * width);
        }
        /*滑动无缝优化*/
        else if (index <= 0) {
            index = 8;
            /*去过渡*/
            removeTransition();
            /*做位移*/
            setTranslate(-index * width);
        }
        setPoint();
    });

    //创建点移动函数
    var setPoint = function () {
        //清楚所有点的样式
        for (var i = 0; i < points.length; i++) {
            var obj = points[i];
            obj.classList.remove('now');
        }
        //为当前点加上样式
        points[index - 1].classList.add('now');
    };

    //设置滑动事件
    var startX = 0;
    var distanceX = 0;
    var isMove = false;//设置一个值用于判断是否发生滑动事件
    imgBox.addEventListener('touchstart', function (e) {
        //当手指触摸时，清除轮播定时器
        clearInterval(timer);
        //获取手指触摸的第一个点
        startX = e.touches[0].clientX;

    });
    imgBox.addEventListener('touchmove', function (e) {
        //获取手指移动的点
        var moveX = e.touches[0].clientX;
        //获取手指滑动的距离
        distanceX = moveX - startX;
        //获取图片需要做的位移值
        var translateX = -index * width + distanceX;
        removeTransition();
        setTranslate(translateX);
        isMove = true;//发生滑动，赋值true
    });

    imgBox.addEventListener('touchend', function (e) {
        //当发生滑动事件时才执行
        if (isMove) {
            //根据手指滑动，判断滑动的距离，不够1/3恢复，超过则切换
            //不够1/3恢复
            if (Math.abs(distanceX) < width / 3) {
                addTransition();
                setTranslate(-index * width);
            } else {
                //超过则切换
                //右滑，切换上一张
                if (distanceX > 0) {
                    index--;
                } else {
                    //左滑，切换下一张
                    index++;
                }
                addTransition();
                setTranslate(-index * width);
            }
        }
        //参数重置
        startX = 0;
        distanceX = 0;
        isMove = false;
        //加上定时器(1.先清除 2.后加上)
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            /*加过渡*/
            addTransition();
            /*做位移*/
            setTranslate(-index * width);
        }, 1500);
    });
};

var downTime = function () {
    //倒计时时间
    var time = 24*60*60;
    var spans = document.querySelector('.sk_time').querySelectorAll('span');
    var timer = setInterval(function () {
        time--;
        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=time%60;

        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=h%10;
        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=m%10;
        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=s%10;
        //console.log(time,h,m,s);
    },1000);

};
