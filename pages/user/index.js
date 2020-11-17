var app = getApp();
Page({
    data: {
        userinfo:{},
        uid:{}
    },
    loading(){
        swan.showToast({
            title: '该功能未上线！',
            icon: 'none',
            duration: 1500
        })
    },
    //获取用户信息
    handleGetUserInfo(e){
        console.log(e);

        const {userInfo} = e.detail;
        swan.setStorageSync("userinfo", userInfo);
        swan.startPullDownRefresh({
        });
        const userinfo = swan.getStorageSync("userinfo");
        this.setData({userinfo});

        var username = e.detail.userInfo.nickName
        var headUrl = e.detail.userInfo.avatarUrl
        // console.log('headUrl是：'+headUrl);
        var that = this
        swan.request({
            url: 'https://xanxus.top/api/login.php',
            method:'POST',
            data:{
                username:username,
                headUrl:headUrl
            },
            header: {// 设置请求的 header
                'content-type': 'application/x-www-form-urlencoded'
              },
            success:function(res){
                // console.log('发送成功');
                console.log(res.data[0].id);
                const uid = res.data[0].id
                const status = res.data[0].status
                swan.setStorageSync("uid", uid);
                swan.setStorageSync("status", status);
                  console.log(that);
            }
        });

    },
    //退出登录
    quit(e){
        this.onReady()
        this.setData({
            userinfo:''
        })
        swan.removeStorageSync('userinfo');
        swan.removeStorageSync('uid');
        swan.removeStorageSync('status');
        swan.removeStorageSync('myfavo');
        this.onReady()

    },
    onShow(){
        const userinfo = swan.getStorageSync("userinfo");
        this.setData({userinfo})
        app.globalData.userInfo=userinfo;
    },
    onReady(){

    }
});