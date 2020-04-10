<template>
    <div class="imgItem">
        <slot></slot>
    </div>
</template>


<script>
export default {
    name: 'SlideItem'
}
</script>



<style lang="less">
@baseFont: 25;
    .imgItem{
        width: 15rem;
        height: 100%;
                
        }
    // .li_active{
    //     // background-color: #007fff;
    // }
</style>