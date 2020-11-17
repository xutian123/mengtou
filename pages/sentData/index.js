Page({
    data: {
        color:"rgb(219, 211, 211)",
        message:'',
        userinfo:{}
    },
    sent(e){
        if(e.detail.value.trim().length != 0){
            this.data.color = 'red'
        }
    },
    sentMsg(e){
        var that = this;
        // console.log(that.data.message);
        var mess = that.data.message;
        var username = that.data.userinfo.nickName;
        var headUrl = that.data.userinfo.avatarUrl;
        swan.request({
            url: 'https://xanxus.top/api/save.php',
            method:'POST',
            data:{
                mess:mess,
                username:username,
                headUrl:headUrl
            },
            header: {// 设置请求的 header
                'content-type': 'application/x-www-form-urlencoded'
              },
            success:function(res){
                console.log('发送成功');
                // console.log(res.data);
            }
        });
        swan.navigateBack({
            detail:1
        });
    },
    back(){
        swan.navigateBack({
            detail:1
        });
    },
    messageInput(e){
        this.setData({
            message:e.detail.value,
            userInfo:getApp().globalData.userInfo
        })
        // console.log(this.data.message);
    },
    onLoad: function () {
        // 监听页面加载的生命周期函数
        this.setData({
            userInfo:getApp().globalData.userInfo
        });

        const userinfo = swan.getStorageSync("userinfo");
        // console.log(userinfo);
        this.setData({
            userinfo:userinfo
        });
        // console.log(this.data);

    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function() {
        // 监听页面显示的生命周期函数
    },
    onHide: function() {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function() {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function() {
        // 监听用户下拉动作
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});