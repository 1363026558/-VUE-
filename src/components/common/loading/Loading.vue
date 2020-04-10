<template>
            <div class='load'>
                <img :src="img" alt="">
            </div>
</template> 

<script>
export default {
    name: 'Loading',
    data() {
        return {
            img: require('@/assets/img/loading/loading1.gif')
        }
    }
}
</script>


<style lang="less">
    @baseFont: 25;
    .load{
       position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
       text-align:center;
       background-color:#181E25;
       display: flex;
       justify-content: center;
       align-items: center;
       img {
        width: 300rem / @baseFont;
        height: auto;
    }
    }
    
</style>
