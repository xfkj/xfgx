
function dock(minHeight,maxHeight,heightList,cartesProperties) {
    var new_scroll_position = 0;
    var last_scroll_position;
    var dock = document.getElementById("dock");

    window.addEventListener('scroll', function(e) {
        last_scroll_position = window.scrollY;
        // console.log(window.scrollY)

        //底部预约栏根据网页高度而变换是否显示
        if ( maxHeight > last_scroll_position && last_scroll_position > minHeight ) {
            dock.classList.remove("web-dock-hidden");
            dock.classList.add("web-dock-visible");
        } else  {
            dock.classList.remove("web-dock-visible");
            dock.classList.add("web-dock-hidden");
        }

        if(heightList) {
            updateCartesClass(heightList, cartesProperties);
        }

        new_scroll_position = last_scroll_position;
    });

    /**
     * 根据高度修改菜单栏目标样式，即当前在界面在哪个模块，菜单就给那个模块的li添加样式
     * @param heightList 各个菜单指向的高度集合
     * @param cartesProperties 要修改的目标元素和对应样式Class
     */
    function updateCartesClass(heightList,cartesProperties) {
        heightList.forEach(function (h,index) {
            var maxInde = heightList.length;
            var nextH = h+1000;

            if(index < maxInde-1) {
                nextH = heightList[index+1];
            }

            if(h <= last_scroll_position && last_scroll_position < nextH) {
                updateCarte(cartesProperties,index)
            }
        })
    }

    /**
     * 修改元素样式
     * @param cartes 目标元素
     * @param index 添加的样式名
     */
    function updateCarte(cartes,index) {
        cartes.forEach(function (e) {
            $("."+e.className).removeClass(e.className);

            $(e.objetStr).eq(index).addClass(e.className);
        })
    }

    $(function(){
        $(".link-li").click(function(){
            $('.li-onClike').removeClass('li-onClike');
            $('.link-onClike').removeClass('link-onClike');
            $(this).addClass("li-onClike");
            $(this).children('a').addClass("link-onClike");
        });
    });


}

 //给positon：fiexd布局对象根据scrollLeft设定left
function windowOnscroll(ids) {
        var sl=-Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);

        ids.push("dock");
        ids.push("header");
        $.each(ids,function () {
            document.getElementById(this).style.left=sl+'px';
        })
}

 function sumbitMonth(fromName) {
     var d = {};
     var t = $('#'+fromName).serializeArray();
     var mobileReg = /^1(3|4|5|7|8)\d{9}$/;
     $.each(t, function() {
         if(this.name === 'user_leaveWord' && this.value !== undefined){
             d[this.name] = "留言："+this.value;
         }else{
             d[this.name] = this.value;
         }
     });
     if (!mobileReg.test(d.user_telephone)) {
         alertify.error("手机号码不符合格式");
         $('[name="user_telephone"]').focus();
         return false;
     }

     $.post('http://118.31.16.134/leaveWord', d, function(data) {
         alertify.alert(data);
     });
 };

 function sumbitClick(objList) {

 }




