<template>
    <div>
        <iframe style="width:100%; height: 100%;" :src="bdTokenUrl" frameborder="0" scrolling="no" id="bdIframe"></iframe>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        data() {
            return {
                bdTokenUrl: 'http://oa.dreamdeck.cn/deck/index.html'
            }
        },
        computed: {
            ...mapGetters(["permissions", "userId"])
        },
        created() {
            this.getUrl();
            this.$nextTick(() => {
                this.getCode();
            });
        },
        mounted() {
            const oIframe = document.getElementById('bdIframe');
            const deviceWidth = document.documentElement.clientWidth;
            const deviceHeight = document.documentElement.clientHeight;
            oIframe.style.width = (Number(deviceWidth) - 220) + 'px'; //数字是页面布局宽度差值
            oIframe.style.height = (Number(deviceHeight) - 120) + 'px'; //数字是页面布局高度差
        },
        methods: {
            /**
             * 获取-外部接口信息
             */
            getUrl() {
                this.bdTokenUrl = this.bdTokenUrl + "?userId=" + this.userId;
            },

        }
    }
</script>

<style scoped>

</style>
