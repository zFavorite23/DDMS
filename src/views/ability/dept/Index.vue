<template>
    <div>
        <div style="border-bottom: 5px solid #777777;margin: 1.6rem 0;">
            <span style="font-size: 1.6rem;color: #777777;">部门信息</span>
        </div>
        <Info/>
        <div style="border-bottom: 5px solid #777777;margin: 1.6rem 0;">
            <span style="font-size: 1.6rem;color: #777777;">工时排行</span>
        </div>
        <Hour/>
    </div>
</template>

<script>
    import Info from "./Info";
    import Hour from "./Hour";
    export default {
        name: "Dept",
        components: {
            Info,
            Hour
        },
    }
</script>

<style scoped>

</style>
