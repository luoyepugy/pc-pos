<template>
    <!-- 开始 -->
    <div class="view-breadcrumb">
        <Breadcrumb>
            <BreadcrumbItem to="/index">首页</BreadcrumbItem>
            <BreadcrumbItem v-for="(item,index) in list" :key="item" :to="item.path">{{item.name}}</BreadcrumbItem>
        </Breadcrumb>
        <div class="icons">
            <slot name="icon"></slot>
            <span><Icon type="ios-help-circle-outline" size="22" />帮助</span>
        </div>
    </div>
    <!-- 结束 -->
</template>
<script type="text/ecmascript-6">
export default {
    data() {
        return {

        }
    },
    props: {
        list: Array
    },
    methods: {

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.view-breadcrumb {
    position: relative;
    .icons {
        @include position(absolute, top 15, right 0);
        cursor: pointer;
        span {
            margin-left: 10px;
            &:hover {
                color: $primary;
            }
        }
    }
}
</style>