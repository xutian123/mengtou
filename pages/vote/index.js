Page({
    data: {
        charas:[

        ],
        flag1:false,
        flag2:false,
        flag3:false,
        userinfo:{}
    },
    getMess:function(){
        var that = this
        // var uid = swan.getStorageSync("uid")
        // console.log(uid);

        swan.request({
            url: 'https://xanxus.top/api/vote.php',
            data:{},
            header:{
              'content-type':'application/json'
            },
            success:function(res){
            //   console.log(res.data);
              that.setData({
                charas:res.data
              })
              swan.setStorageSync("charas", res.data);
              swan.request({
                  url:'https://xanxus.top/api/myfavo.php',
                  method:'POST',
                  data:{
                      uid:swan.getStorageSync("uid")
                  },
                  header:{
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success:function(res){
                    console.log(res.data);
                    swan.setStorageSync("myfavo", res.data);
                    var myfavo = swan.getStorageSync("myfavo")
                    var charas = swan.getStorageSync("charas")
                    myfavo.forEach(function(item,index){
                        var myfavoid = item.charasid
                        charas.forEach(function(item,index){
                            // console.log(item.id);
                            if(myfavoid == item.id ){
                                // console.log(item.status);
                                item.status = 1
                            }
                        })
                    })
                    swan.setStorageSync('charas', charas);
                    that.setData({
                        charas:charas
                    })
                    // console.log(that.data);

                  },
                  fail:function(err){
                    console.log(err);
                  }
              })
            },
            fail:function(err){
              console.log(err);
            }
          })
    },
    cancel(){
        this.setData({
            flag1:false,
            flag2:false
        })
    },
    //获取用户信息
    handleGetUserInfo(e){
        console.log(e);
        this.setData({
            flag1:false,
            flag2:false
        })
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
                swan.setStorageSync("uid", uid);
                  console.log(that);
            }
        });

    },
    love(e){
        var user = swan.getStorageSync("userinfo")
        if(!user){
            this.setData({
                flag1:true,
                flag2:true
            })
        }else{
        var that = this
        var id = e.target.dataset.id
        console.log(id);
        var chara = this.data.charas;
        var uid = swan.getStorageSync("uid")
        chara.forEach(function(item,index){
            if(id == item.id){
                // console.log(item.status);
                var favo = item.favo
                //点赞
                if(item.status==0){
                    console.log('id是：'+id);
                    console.log(item.status);
                    item.status=1
                    item.favo=parseInt(item.favo)+1
                    swan.request({
                        url: 'https://xanxus.top/api/change.php',
                        method:'POST',
                        data:{
                           num:1,
                           charaid:id,
                           uid:uid
                        },
                        header: {// 设置请求的 header
                            'content-type': 'application/x-www-form-urlencoded'
                          },
                        success:function(res){
                            console.log('发送成功');
                            console.log(res.data);
                        }
                    });
                    //取消点赞
                }else{
                    item.status=0
                    item.favo=parseInt(item.favo)-1
                    console.log(item.favo);
                    swan.request({
                        url: 'https://xanxus.top/api/change.php',
                        method:'POST',
                        data:{
                           num:-1,
                           charaid:id,
                           uid:uid
                        },
                        header: {// 设置请求的 header
                            'content-type': 'application/x-www-form-urlencoded'
                          },
                        success:function(res){
                            console.log('发送成功');
                            console.log(res.data);
                        }
                    });
                }
            }
        })

        swan.setStorageSync("charas", chara);
        // console.log(this.data.charas);
        this.setData({
            charas:swan.getStorageSync('charas')
        })


        }
    },
    onLoad: function () {
        // 监听页面加载的生命周期函数
        this.getMess();
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function() {
        // 监听页面显示的生命周期函数
        this.getMess();
        const userinfo = swan.getStorageSync("userinfo");
        this.setData({userinfo})
    },
    onHide: function() {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function() {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function () {
        this.getMess()
        setTimeout(() => {
            swan.stopPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});