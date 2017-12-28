 



 $(function () {  
     addHistory();
     queryHistory();
     deleteHistory();
     clearHistory();
 });


//  添加历史记录
function addHistory() {
    // 1. 给搜索按钮添加事件
    $('.btn-search').on('click',function () {
        // 2获取输入框输入的搜索内容
         
        // console.log($('.search-input').val());

        var search = $('.search-input').val();
        // 如果搜索的内容为空就判断
        if(!search){
            alert('没有输入内容');
            return;
        }
        // 3.把当前的搜索记录存储到本地存储
            //  3.1获取本地存储的搜索记录
            var historyData = localStorage.getItem('historyData')
        //  判断本地储存的历史记录是否有值
        if (historyData) {
            // 有值就转换为数组
            historyData = JSON.parse(historyData);
        }else{
            // 如果没有就赋值为空数组
            historyData = [];
        }
        // 判断当前搜索的内容是否在数组里面存储(判断以前是否已经有了) 如果存在就返回当前存在的索引 不存在返回
        if(historyData.indexOf(search) == -1) {
            // 不存在就添加
            // 把搜索的内容添加到历史记录数组里面
            historyData.push(search);
            // 把历史记录数组转成字符串存储到本地存储中的setItem('本地存储的键','当前的历史记录的值')localStorage.setItem是找到本地的存储
            // JSON.stringify(转换)
            localStorage.setItem('historyData', JSON.stringify(historyData));
            // 添加了一次历史记录就查询一次 调用下面把下面存储好的记录显示在列表里
            queryHistory();
        }
        //点击搜索清空输入框
        $('.search-input').val("");
      });
  }


//   查询历史记录 显示到历史记录列表里
function queryHistory() {
    // 1. 获取本地存储的搜索历史记录
    // 2.把获取的搜索历史记录转换成数组, 如果为空就赋值为空数组
    // 3.定义模板引擎生成记录模板
    // 4.调用模板引擎生成html
    // 5.把生成的模板放到页面上
    //1.1获取本地存储的搜索历史记录(本地存储里面的值都是字符串)
        //  没有值存储就为空,也可自定为historyData
    var historyData = localStorage.getItem('historyData');
    // 現在存儲的為空直接轉換數組為null轉不了,,需要判斷 (本地存儲都是字符串需轉)
    // 判断本地存储的历史记录是否有值
    if (historyData) {
        // 有值就转成数组
        historyData = JSON.parse(historyData);
    }else {
        // 如果没有值,就赋值为空数组
        historyData = [];
    }
    // 如果要反转 就调用数组反转方法
    historyData = historyData.reverse();
    // 数据必须是一个对象
    // template('searchHistoryTmp',数据)
    // 如果是数组需要包装成一个对象才能调用模板引擎生成模板
    var html = template('searchHistoryTmp', { 'rows': historyData});
    // 把生成的模板放到页面上
    $('.search-history-list ul').html(html);
  }

// 给X添加删除事件
function deleteHistory() {
    //1.给删除的x添加点击事件
    // 因为删除按钮动态生成 ,需要使用委托绑定事件
    $('.search-history-list').on('click','.btn-delete',function () {
        // 获取当前的点击删除的历史记录
        var historyData = $(this).parent().data('history');
        // 获取本地存储的搜索历史记录 (本地存储里面的值都是字符串)
        var historyData = localStorage.getItem('historyData');
        // 判断本地存储的历史记录是否有值
        if (historyData) {
            // 有值就转成数组
            historyData = JSON.parse(historyData);
        }else {
            // 如果没有值 就赋值为空数组
            historyData = [];
        }
        var historyIndex = historyData.indexOf(history + "");
        historyData.splice(historyIndex, 1)
        // console.log(historyData);
        // 删除完毕之后重新把数组保存到本地存储里面
        localStorage.setItem('historyData', JSON.stringify(historyData));
        // 删除了一次历史记录就查询一次
        queryHistory();
      })
  }


//   给删除全部事件
function clearHistory() {
    $('.btn-clear').on('click',function () {
        // 直接把本地存储的historyData的值设置为空字符串
        localStorage.setItem('historyData','');
        // 删除了一次历史记录就查询一次
        queryHistory();
      })
  }