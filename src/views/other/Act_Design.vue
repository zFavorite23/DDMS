<template>
    <div><iframe style="width:100%;" :src="bdTokenUrl" frameborder="0" scrolling="no" id="bdIframe"></iframe></div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            formData: {

            },
            id: null,
            bdTokenUrl: "http://127.0.0.1:9999/act/modeler.html?modelId="
        };
    },
    computed: {
        ...mapGetters(["permissions", "userId"])
    },
    mounted() {
        const oIframe = document.getElementById('bdIframe');
        const deviceWidth = document.documentElement.clientWidth;
        const deviceHeight = document.documentElement.clientHeight;
        oIframe.style.width = Number(deviceWidth) - 220 + 'px'; //数字是页面布局宽度差值
        oIframe.style.height = Number(deviceHeight) - 120 + 'px'; //数字是页面布局高度差
    },
    created() {
        this.id = this.$route.params.id;
        console.log(this.id);
        this.bdTokenUrl = this.bdTokenUrl + this.id

    },
}
</script>

<style lang="scss" scoped>

</style>
