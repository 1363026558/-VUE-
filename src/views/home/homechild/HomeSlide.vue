<template>

    <slide ref="slider" v-if="banners.length">
        <slide-item v-for="(item, index) in banners" :key='index'>
            <img :src="item.img" alt="">
        </slide-item>
    </slide> 

</template>


<script>
import {Slide, SlideItem} from '@/components/common/slide'
export default {
    name: 'HomeSlide',
    components: {
        Slide,
        SlideItem
        
    },
    props: {
        banners: {
            type: Array,
            default: []
        }
    },
    methods: {

    },
   
}
</script>



<style lang="less">

</style>