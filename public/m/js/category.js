/*
 * @Author: zhengwei
 * @Date:   2017-12-26 15:03:37
 * @Last Modified by:   姚展鸿
 * @Last Modified time: 2017-12-28 10:34:38
 */
$(function() {
    
    // 初始化mui的区域滚动 传入父容器的选择器
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.001, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
    getCategoryLeftData();
    categoryLeftClick();
    getCategoryRightData(1);
});
// 获取左侧的分类数据
function getCategoryLeftData() { 
     $.ajax({
         url:'/category/queryTopCategory',
         success:function (data) {
            //  已经取到数据了
            //  console.log(data);
            //  调用template(模板id,数据)
             var html = template('categoryLeftTmp',data);
            //  把生成的模板html放到左侧分类页面 生成的是li反倒ul中
             $(".motion ul").html(html);
            //  给第一个li添加active类名
            $('.motion ul li:eq(0)').addClass('active');
           }
     })
  }




 
    /*1. 给左侧分类菜单添加点击事件
    2. 在点击事件里面 获取到当前点击的元素
    3. 调用右侧分类的接口 
        接口地址 http://localhost:3000/category/querySecondCategory?id=1 
        这个接口地址需要一个参数是分类菜单的id
    4. 拿到当前点击元素对应的分类id 
    5. 在渲染左侧分类菜单的模板的时候同时还要把分类id存起来 （自定义属性）
    6. 通过自定义属性获取点击左侧分类菜单的分类id
    7. 调用ajax发送请求右侧分类商品数据（把分类id作为参数传入）
    8. 定义右侧分类商品的模板引擎 绑定需要渲染的属性
    9. 调用template('模板id',数据)方法生成模板页面
    10 把生成好的的模板页面放到右侧的分类商品容器里面 */
    //给左侧分类菜单绑定点击事件的时候切记不能直接给里面的a绑定因为a是动态生成的
//  获取右侧的数据
function categoryLeftClick() {
    // 给左边点击事件来获取右边数据
    $('.motion').on('click','ul li a',function (e) {
         console.log(e);
        // 清空所有的li的active在给当前点击的a的父元素li添加一个active
        $('.motion ul li').removeClass('active');
        // target 当前意思this   再找父親增加active
        $(e.target.parentNode).addClass('active');
        var id = $(e.target).data('id'); 
        // 调用数据的索引
        getCategoryRightData(id);

      })
  }
//   右侧请求数据 
function getCategoryRightData(id) {
   $.ajax({
       url:'/category/querySecondCategory',
       data:{'id':id},
       success:function (data) {
        //    console.log(data);
           var html = template('categoryRightTmp',data);
        //    判断如果有数据就添加html如果没有数据就添加提示没有数据
        if (data.rows.length) {
            $('.category-right .mui-scroll').html(html);
        }else {
            $('.category-right .mui-scroll').html('<p>没有数据了</p>')
        }
         
           
     }
   })
  }

  /*
  function getCategoryRightData(id) {
    $.ajax({
        url: '/category/querySecondCategory',
        data: { 'id': id },
        success: function(data) {
            console.log(data);
            var html = template('categoryRightTmp', data);
            // 判断如果有数据就添加html如果没有数据添就添加提示没有数据
            if (data.rows.length) {
                $('.category-right .mui-scroll').html(html);
            } else {
                $('.category-right .mui-scroll').html('<p>没有数据</p>')
            }
        }
    })
}
  */