window.onload = function () {

    /*区域滚动效果*/
    /*选择大容器，子容器要大于父容器*/
    new IScroll(document.querySelector('.content_left'),{
        scrollX:false,
        scrollY:true
    });

        new IScroll(document.querySelector('.content_right'),{
            scrollX:false,
            scrollY:true
        });


    var liList = document.querySelector('.content_left').querySelectorAll('li');
    console.log(liList);
    for (var i = 0; i < liList.length; i++) {
        liList[i].addEventListener('click',function(e){
            //console.log(e);
            for (var j = 0; j < liList.length; j++) {
                liList[j].classList.remove('now');
            }
             e.path[1].classList.add('now');
            var cid=e.path[1].attributes[0].value;
            var divList = document.querySelectorAll('.content_right_box');
            for (var i = 0; i < divList.length; i++) {
                divList[i].style.display='none';
            }
            //console.log(divList);
            var curDiv =getElementByAttr('div','cid',cid);
            //console.log(curDiv);
            if(cid == curDiv[0].attributes[0].value){
                curDiv[0].style.display='block';
            }

        });
    }


    document.querySelector('.h_input').addEventListener('focus', function (e) {
        //console.log(e);
        document.querySelector('.icon_right').style.display = 'none';
        document.querySelector('.content').style.display = 'none';
        document.querySelector('.in').style.paddingRight = '60px';
        document.querySelector('.btn_right').style.display = 'inline-block';
        document.querySelector('.searchTip').style.display = 'inline-block';
        document.querySelector('.icon_left').setAttribute('onclick', 'iconLeft()');
        document.querySelector('.icon_left').setAttribute('href', 'javascript:');
    }, false);

};
function iconLeft() {
    //console.log('返回');
    document.querySelector('.icon_right').style.display = 'inline-block';
    document.querySelector('.content').style.display = 'block';
    document.querySelector('.in').style.paddingRight = '45px';
    document.querySelector('.btn_right').style.display = 'none';
    document.querySelector('.searchTip').style.display = 'none';
    document.querySelector('.icon_left').removeAttribute('onclick');
    setTimeout(function () {
        document.querySelector('.icon_left').setAttribute('href', 'index.html');
    },0)

}
function getElementByAttr(tag,attr,value)
{
    var aElements=document.getElementsByTagName(tag);
    var aEle=[];
    for(var i=0;i<aElements.length;i++)
    {
        if(aElements[i].getAttribute(attr)==value)
            aEle.push( aElements[i] );
    }
    return aEle;
}