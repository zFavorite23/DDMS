<template>
    <el-container class="wrapper">
        <el-scrollbar class="container-left" wrap-class="container-left-wrap" :class="{ 'slide-hide': isCollapse, 'slide-in-left': menuShow }">
            <div class="logo">
                <!--图片logo-->
                <img src="../../assets/DDMS.png" />
                <!--文字logo-->
                <span>后台</span>
            </div>
            <el-menu
                class="menu"
                :default-active="onRoutes"
                :collapse="isCollapse"
                style="border: none;"
                text-color="rgb(191, 203, 217)"
                background-color="rgb(48, 65, 86)"
                active-text-color="rgb(64, 158, 255)"
                unique-opened
                router
            >
                <sidebar-item v-for="item in routers" :key="item.path" :item="item"></sidebar-item>
            </el-menu>
        </el-scrollbar>

        <el-container
            class="container-box"
            v-bind:class="{
                'slide-hide': isCollapse,
                'slide-in-left': menuShow
            }"
        >
            <el-header class="header">
                <div class="header-left">
                    <div
                        class="header-toggle"
                        @click="
                            menuShow = !menuShow;
                            showSideBar();
                        "
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div class="slide-toggle" :class="{ 'slide-toggle-open': isCollapse }" @click="toggleSideBar">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="header-tabs-box">
                    <el-breadcrumb class="app-levelbar" separator="/">
                        <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
                            <span v-if="item.redirect === 'noredirect' || index == levelList.length - 1" class="no-redirect">{{ item.name }}</span>
                            <router-link v-else :to="item.redirect || item.path">{{ item.name }}</router-link>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>

                <div class="header-right">
                    <el-popover placement="bottom" width="350" trigger="hover">
                        <!--                        <avue-crud :data="data" :option="option"></avue-crud>-->
                        <div style="margin-left: 45%;">暂无数据</div>
                        <div slot="reference" class="top-bar__item top-bar__item--show">
                            <i class="el-icon-bell"></i>
                            <el-badge is-dot class="dot"></el-badge>
                        </div>
                    </el-popover>

                    <el-dropdown trigger="click">
                        <!--                        <el-avatar style="margin-top: 14px;margin-right: 6px;" size="medium" :src="avatar"></el-avatar>-->
                        <!--                        <span>{{username}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></span>-->

                        <div>
                            <img :src="avatar" style="width: 35px;margin-bottom: 12.5px;border-radius: 50%;margin-right: 10px" />
                            <span>{{ username }}</span>
                            <span class="el-icon-arrow-down" style="line-height: 60px;margin-left: 5px"></span>
                        </div>

                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="isShow = !isShow"><span>实时监控</span></el-dropdown-item>
                            <el-dropdown-item @click.native="See()"><span>软件产品</span></el-dropdown-item>
                            <el-dropdown-item @click.native="See()"><span>物联网平台</span></el-dropdown-item>
                            <el-dropdown-item @click.native="handleUserInfo()"><span>基本资料</span></el-dropdown-item>
                            <!--                            <el-dropdown-item @click.native="handlePassword()"><span>个人主页</span></el-dropdown-item>-->
                            <!--                            <el-dropdown-item @click.native="handlePassword()"><span>更换密码</span></el-dropdown-item>-->
                            <el-dropdown-item @click.native="loginOut()"><span>退出</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>

                <!--新增界面-->
                <el-dialog title="修改密码" :visible.sync="passwordFormVisible" top="5vh">
                    <el-form :model="passwordFormData" :rules="passwordFormDataRules" ref="passwordFormData">
                        <el-form-item label="原始密码" prop="old_password">
                            <el-input type="password" v-model="passwordFormData.old_password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="new_password">
                            <el-input type="password" v-model="passwordFormData.new_password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="check_new_password">
                            <el-input type="password" v-model="passwordFormData.check_new_password" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="passwordFormVisible = !passwordFormVisible">取消</el-button>
                        <el-button type="primary" @click.native="addSubmit('passwordFormData')" :loading="passwordLoading">提交</el-button>
                    </div>
                </el-dialog>
            </el-header>
            <div class="play" v-if="isShow">
                <video id="my-video" class="video-js vjs-default-skin" controls preload="auto" >
                    <source src="http://192.168.115.51:10800/hls/stream_1/stream_1_live.m3u8" type="application/x-mpegURL" />
                </video>

                <!-- <videoPlayer class="video-player vjs-custom-skin" :options="videoOptions"></videoPlayer> -->
            </div>
            <!--遮板-->
            <div class="main-mask" v-show="menuShow" @click="menuShow = !menuShow"></div>

            <el-main class="main">
                <transition name="move" mode="out-in"><router-view></router-view></transition>
                <el-button type="primary" class="upload-exception" icon="el-icon-edit" circle @click="setImage"></el-button>
                <el-dialog title="测试" @click="dialogVisible = true" :visible.sync="dialogVisible"><img id="downImg" :src="dataurl" alt="" style="width: 100%;" /></el-dialog>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem.vue';
import { password } from '../../api/auth/login';
import { getUserId } from '../../utils/auth';
import html2canvas from 'html2canvas';

// import 'video.js/dist/video-js.css';
// import 'vue-video-player/src/custom-theme.css';
// import { videoPlayer } from 'vue-video-player';
// import 'videojs-flash';

import videojs from 'video.js';
import 'videojs-contrib-hls';
export default {
    name: 'top-mag',

    data() {
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (!/^[0-9A-Za-z]{6,15}$/.test(value)) {
                    callback(new Error('密码少于6位'));
                }
                if (this.passwordFormData.check_new_password !== '') {
                    this.$refs.passwordFormData.validateField('check_new_password');
                }
                callback();
            }
        };
        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.passwordFormData.new_password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            isShow: false,
            dataurl: '',
            dialogVisible: false,
            menuShow: false,
            levelList: null,
            passwordLoading: false,
            passwordFormVisible: false,
            passwordFormData: {
                old_password: '',
                new_password: '',
                check_new_password: ''
            },
            passwordFormDataRules: {
                old_password: [
                    {
                        required: true,
                        message: '请输入原始密码',
                        trigger: 'blur'
                    }
                ],
                new_password: [
                    {
                        required: true,
                        message: '请输入新密码',
                        trigger: 'blur'
                    },
                    { validator: validatePass, trigger: 'blur' }
                ],
                check_new_password: [
                    {
                        required: true,
                        message: '请再次输入密码',
                        trigger: 'blur'
                    },
                    { validator: validatePass2, trigger: 'blur' }
                ]
            },
            // 视频播放
            videoOptions: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                techOrder: ['flash', 'html5'], // 兼容顺序
                sources: [
                    {
                        // 流配置，数组形式，会根据兼容顺序自动切换
                        type: 'rtmp/hls',
                        src: 'rtmp://211.154.252.186:10935/hls/stream_1'
                    }
                ],
                poster: '', //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true //全屏按钮
                },
                autoplay: true
            }
        };
    },
    components: {
        SidebarItem
        // videoPlayer
    },
    computed: {
        ...mapGetters({
            routers: 'routers'
        }),
        onRoutes() {
            return this.$route.path;
        },
        username() {
            let username = this.$store.state.admin.userName;
            return !username ? this.name : username;
        },
        avatar() {
            let avatar = this.$store.state.admin.avatar;
            return !avatar ? this.name : avatar;
        },
        isCollapse() {
            return this.$store.state.app.sidebar.opened;
        }
    },
    mounted() {},
    methods: {
        See(e) {
            window.open('https://www.baidu.com', '_blank');
        },
        open() {
            videojs(
                'my-video',
                {
                    bigPlayButton: false,
                    textTrackDisplay: false,
                    posterImage: true,
                    errorDisplay: false,
                    controlBar: true
                },
                function() {
                    this.play();
                }
            );
        },

        toggleSideBar() {
            this.$store.dispatch('ToggleSideBar');
        },
        showSideBar() {
            this.$store.dispatch('ShowSideBar');
        },
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.name);
            const first = matched[0];
            if (first && (first.name !== '首页' || first.path !== '')) {
                matched = [{ name: '首页', path: '/' }].concat(matched);
            }
            this.levelList = matched;
            console.log(this.levelList);
        },
        loginOut() {
            console.log('2');
            this.$confirm('此操作将退出系统, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$store.dispatch('loginOut').then(() => {
                        //this.setCookie("ddmsAutoLogin","")
                        window.localStorage.setItem('ddmsAutoLogin', '');
                        location.reload(); // 为了重新实例化vue-router对象 避免bug
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'error',
                        message: '操作失败'
                    });
                });
        },
        // 保存cookie
        setCookie: function(cName, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = cName + '=' + decodeURIComponent(value) + (expiredays == null ? '' : ';expires=' + exdate.toGMTString());
        },
        handleUserInfo() {
            this.$router.push({
                path: '/admin/user/info'
            });
        },
        // 显示修改密码界面
        handlePassword() {
            this.passwordFormVisible = true;
            this.passwordFormData = {
                old_password: '',
                new_password: '',
                check_new_password: ''
            };
        },
        addSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    //this.passwordLoading = true;
                    let data = Object.assign({});
                    data.userId = getUserId();
                    data.password = this.passwordFormData.old_password;
                    data.newpassword1 = this.passwordFormData.new_password;
                    console.log(data);
                    password(data)
                        .then(res => {
                            //this.passwordLoading = false;
                            console.log(res.data.data);
                            if (res.data.data) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                // 刷新表单
                                this.$refs['passwordFormData'].resetFields();
                                this.passwordFormVisible = false;
                                this.$store.dispatch('loginOut').then(() => {
                                    location.reload(); // 为了重新实例化vue-router对象 避免bug
                                });
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        })
                        .catch(() => {
                            this.$message({
                                type: 'error',
                                message: '操作失败'
                            });
                        });
                }
            });
        },
        setImage() {
            let that = this;
            //   event.preventDefault();
            var canvas2 = document.createElement('canvas');
            // let _canvas = document.getElementById('child');
            let _canvas = document.getElementById('app');

            var w = parseInt(window.getComputedStyle(_canvas).width);
            var h = parseInt(window.getComputedStyle(_canvas).height);
            //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
            canvas2.width = w * 2;
            canvas2.height = h * 2;
            canvas2.style.width = w + 'px';
            canvas2.style.height = h + 'px';
            //可以按照自己的需求，对context的参数修改,translate指的是偏移量
            //  var context = canvas.getContext("2d");
            //  context.translate(0,0);
            var context = canvas2.getContext('2d');
            context.scale(2, 2);
            // html2canvas(document.getElementById('child'), {
            html2canvas(document.getElementById('app'), {
                canvas: canvas2
            }).then(function(canvas) {
                var blob = that.getBlob(canvas);
                var oMyForm = new FormData();
                var fileName = 'mobile' + '.jpg';
                oMyForm.append('file', blob, fileName);
                //				oMyForm.append("fileName", fileName);
                oMyForm.append('fileType', 'image');
                oMyForm.append('user_id', that);
            });
            this.dialogVisible = true;
        },
        getBlob(canvas) {
            //获取blob对象
            var data = canvas.toDataURL('image/jpeg', 1);
            this.dataurl = data;
            //console.log(this.dataurl)
            data = data.split(',')[1];
            data = window.atob(data);
            var ia = new Uint8Array(data.length);
            for (var i = 0; i < data.length; i++) {
                ia[i] = data.charCodeAt(i);
            }
            return new Blob([ia], {
                type: 'image/jpeg'
            });
        }
    },
    created() {
        this.getBreadcrumb();
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    }
};
</script>

<style type="text/scss" lang="scss" scoped>
.el-icon-bell:before {
    font-size: 20px;
}
.dot {
    margin-left: -4px;
    margin-right: 15px;
    margin-top: -22px;
}
@import '../../styles/mixin';
.el-header {
    /*background-color: #eef1f6;*/
    color: #333;
    padding: 0 10px;
}

.el-aside {
    color: #333;
}

.el-main {
    position: relative;
    padding: 0 10px 10px;
    background-color: #fff;
    margin-left: 7px;
    margin-top: 5px;
}
.main-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    z-index: 100;
    background-color: #000;
    opacity: 0.3;
}

.move-enter-active,
.move-leave-active {
    transition: opacity 0.5s;
}

.move-enter,
.move-leave {
    opacity: 0;
}

.wrapper {
    height: 100%;
    overflow-y: hidden;
    background-color: #f5f7f9;
}

.container-box {
    height: 100%;
    transition: -webkit-transform 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
    overflow-y: auto;
}

.container-left {
    background-color: rgb(48, 65, 86);
    transition: left 0.23s ease-in-out;
    height: 100%;
    flex: 0 0 auto;
}
.container-left-wrap {
    overflow-x: hidden !important;
}

.container-left .svg-icon {
    font-size: 20px;
    margin-right: 5px;
}

.container-left:not(.slide-hide) {
    width: 200px;
}

.container-left.slide-hide {
    .logo img {
        display: none;
    }
    .logo span {
        display: inline-block;
    }
}

.menu {
    width: 100% !important;
}

/*.menu::-webkit-scrollbar{*/
/*display: none;*/
/*}*/

.header {
    position: relative;
    text-align: left;
    font-size: 12px;
    line-height: $header-height;
    border-bottom: 1px solid #d8dce5;
    background-color: #fff;
}

.logo {
    display: block;
    width: 100%;
    line-height: 80px;
    text-align: center;
    color: #fff;
    transition: display 0.7s ease-in-out;
    img {
        vertical-align: middle;
        width: 70px;
    }
    span {
        display: none;
    }
}

.header-left {
    display: inline-block;
    height: $header-height;
    overflow: hidden;
}

.header-tabs-box {
    display: inline-block;
    height: $header-height;
    max-width: 60%;
    overflow: hidden;
}

.header-right {
    display: flex;
    height: 100%;
    margin-left: 10px;
    float: right;
    .el-dropdown {
        display: flex;
        cursor: pointer;
    }
    span {
        display: inline-block;
        @include text-overflow;
    }
    i {
        line-height: $header-height;
        margin-top: 2px;
    }
}

.app-levelbar {
    margin-left: 20px;
    line-height: 57px !important;
}

/*宽屏时出现*/
.slide-toggle {
    display: inline-block;
    height: $header-height;
    line-height: $header-height;
    text-align: center;
    cursor: pointer;
}

.slide-toggle span {
    display: inline-block;
    width: 2px;
    height: 12px;
    background-color: rgba(135, 141, 153, 0.8);
    margin-left: 5px;
}
.slide-toggle-open span {
    display: block;
    margin-left: 4px;
    margin-top: 4px;
    width: 16px;
    height: 2px;
}
.slide-toggle-open {
    padding-top: 17px;
}

@media screen and (min-width: 768px) {
    .main-mask {
        display: none;
    }
}

/*.slide-hide {*/
/*width: 64px !important;*/
/*}*/

@media screen and (max-width: 768px) {
    .main {
        overflow-y: scroll !important;
        -webkit-overflow-scrolling: touch;
    }

    .slide-hide.slide-in-left {
        -webkit-transform: translate3d(64px, 0, 0) !important;
        transform: translate3d(64px, 0, 0) !important;
    }
    .container-left.slide-hide.slide-in-left {
        left: -64px;
        width: 64px;
    }
    .container-left.slide-in-left {
        left: 0;
    }
    .container-left {
        margin-right: 0;
        opacity: 1;
        position: absolute !important;
        top: 0;
        left: -225px;
        z-index: 10;
        padding: 0;
    }

    .container-box.slide-in-left {
        min-width: 0;
        opacity: 1;
        -webkit-transform: translate3d(187px, 0, 0);
        transform: translate3d(187px, 0, 0);
        overflow: initial;
    }
    .header-toggle {
        display: block;
        /*background-color: #26a2ff;*/
        border-radius: 4px;
        /*border: 1px solid #fff;*/
        height: 40px;
        margin: 10px 0;
        padding: 2px 6px;
        outline: none;
        width: 40px;
        z-index: 10;
    }

    .header-toggle span {
        display: block;
        width: 100%;
        height: 4px;
        margin: 5px auto;
        background-color: rgba(135, 141, 153, 0.8);
    }

    .logo {
        display: none;
    }
    .slide-toggle {
        display: none;
    }
    .top-mag {
        &__menu {
            float: right;
        }
    }
}
.upload-exception {
    position: fixed;
    right: 30px;
    bottom: 30px;
}
</style>
