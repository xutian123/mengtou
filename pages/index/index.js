/**
 * @file index.js
 * @author swan
 */
const app = getApp()

Page({
    data: {
        userinfo: {},
        hasUserInfo: false,
        canIUse: swan.canIUse('button.open-type.getUserInfo'),
        messList:[],
        isShow:false,
        flag1:false,
        flag2:false,
        flag3:false,
        status:'',
        deleteid:''
    },
    // handleGetUserInfo(e){
    //     const {userInfo} = e.detail;
    //     swan.setStorageSync("userinfo", userInfo);
    //     swan.startPullDownRefresh({
    //     });
    //     const userinfo = swan.getStorageSync("userinfo");
    //     this.setData({userinfo})
    // },
    getMess:function(){
        var that = this
        swan.request({
            url: 'https://xanxus.top/api/db.php',
            data:{},
            header:{
              'content-type':'application/json'
            },
            success:function(res){
            //   console.log(res.data);
              that.setData({
                messList:res.data
              })
            },
            fail:function(err){
              console.log(err);
            }
          })
    },
    more(e){
        console.log(this.data.deleteid);
        console.log(this.data.userinfo.nickName);

        console.log(e.currentTarget.dataset.id);
        this.setData({
            flag1:true,
            flag2:true
        })
        this.setData({
            deleteid:e.currentTarget.dataset.id
        })
        // console.log(this.data.deleteid);

        swan.hideTabBar({});
    },
    cancle(){
        this.setData({
            flag1:false,
            flag2:false
        })
        swan.showTabBar({});
    },
    delete(){
        this.setData({
            flag1:true,
            flag2:false,
            flag3:true
        })
    },
    close(e){
        var that = this
        that.setData({
            flag1:false,
            flag2:false,
            flag3:false
        })
        var deleteid = that.data.deleteid
        // console.log(e.currentTarget.dataset.index);
        if(e.currentTarget.dataset.index==1){
            console.log('确定删除');
            // console.log(deleteid);

            swan.request({
                url: 'https://xanxus.top/api/delete.php',
                method:'POST',
                data:{
                    deleteid:deleteid
                },
                header: {// 设置请求的 header
                'content-type': 'application/x-www-form-urlencoded'
                },
                success:function(res){
                  console.log(res.data);
                //   that.setData({
                //     messList:res.data
                //   })
                that.getMess()
                },
                fail:function(err){
                  console.log(err);
                }
              })
        }else{
            console.log('取消');
        }
        swan.showTabBar({});
    },
    onLoad() {

        // 监听页面加载的生命周期函数
        this.getMess();
        // console.log(this);
        const userinfo = swan.getStorageSync("userinfo");
        this.setData({
            userinfo:userinfo
        });
    },
    // getUserInfo(e) {
    //     this.setData({
    //         userInfo: e.detail.userInfo,
    //         hasUserInfo: true
    //     });
    // },
    onShow(){
        this.getMess()
        this.setData({
            'userinfo':swan.getStorageSync('userinfo'),
            'status':swan.getStorageSync('status')
        })
    },
    onRefresh(){

    },
    onPullDownRefresh: function () {
        this.getMess()
        setTimeout(() => {
            swan.stopPullDownRefresh();
        }, 500);
    }
})
