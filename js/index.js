window.onload = function () {
    /* 1.顶部搜索栏 */
    search();
    /* 2.轮播图 */
    banner();
    /* 3.倒计时 */
    downTime();
};
const search = function () {
    /* 1.设置默认透明 */
    const searchBox = document.querySelector('.search_box');
    const bannerHeight = document.querySelector('.jd_banner').offsetHeight;

    /* 监听页面滚动事件 */
    window.onscroll = function () {
        const scrollTop = document.documentElement.scrollTop;
        let opacity;
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

const banner = function () {
    /* 1.实现图片轮播，无缝切换*/
    /* 2.点跟随图片一起改变*/
    /* 3.根据手指的滑动切换图片，滑动到一定距离切换，未滑动到一定距离恢复*/

    const banner = document.querySelector('.jd_banner');
    const width = banner.offsetWidth;
    const imgBox = banner.querySelector('ul:first-child');
    const pointBox = banner.querySelector('ul:last-child');
    const points = pointBox.querySelectorAll('li');

    //创建添加过渡动画的函数
    const addTransition = function () {
        imgBox.style.transition = 'all 0.5s ease-out';
        imgBox.style.webkitTransition = 'all 0.5s ease-out';
    };
    //创建去除过渡动画的函数
    const removeTransition = function () {
        imgBox.style.transition = 'none';
        imgBox.style.webkitTransition = 'none';
    };
    //创建设置x轴平移的函数
    const setTranslate = function (translateX) {
        imgBox.style.transform = 'translateX(' + translateX + 'px)';
        imgBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    };

    let index = 1;
    let timer = setInterval(function () {
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
    const setPoint = function () {
        //清楚所有点的样式
        for (let i = 0; i < points.length; i++) {
            let obj = points[i];
            obj.classList.remove('now');
        }
        //为当前点加上样式
        points[index - 1].classList.add('now');
    };

    //设置滑动事件
    let startX = 0;
    let distanceX = 0;
    let isMove = false;//设置一个值用于判断是否发生滑动事件
    imgBox.addEventListener('touchstart', function (e) {
        //当手指触摸时，清除轮播定时器
        clearInterval(timer);
        //获取手指触摸的第一个点
        startX = e.touches[0].clientX;

    });
    imgBox.addEventListener('touchmove', function (e) {
        //获取手指移动的点
        let moveX = e.touches[0].clientX;
        //获取手指滑动的距离
        distanceX = moveX - startX;
        //获取图片需要做的位移值
        let translateX = -index * width + distanceX;
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

const downTime = function () {

};
