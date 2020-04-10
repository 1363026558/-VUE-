<template>
    <div id="nav-bar">
        <div class="nav">
            <div class="nav-in">
                <div @click="sendItem(item)" class="nav-item" :class="{active: currentIndex == item.id}"   v-for="(item, index) in categories" :key='index' >
                    {{item.category}}
                </div>
               
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            categories: [
              {id: 0, category: '全部'},
              {id: 1, category: '新鲜事'},
              {id: 2, category: '技术栈'},
              {id: 3, category: '趣阅读'},
              {id: 4, category: '科技圈'}
              ],
              currentIndex: 0
        }
    },
    methods: {
        sendItem(item) {
            this.currentIndex = item.id;
            this.$emit('itemClick', item);
            
        }
    }
}
</script>

<style lang="less" scoped>
    @baseFont: 25;
    .nav{
        width: 14.5rem;
        height: 30rem / @baseFont;
        position: fixed;
        top: 70rem / @baseFont;
        left: 50%;
        transform: translateX(-50%);
        background-color: #d1d8e0;
        border-radius: 8rem / @baseFont;
        padding-top: 10rem / @baseFont;
        .nav-in{
            width: 13.5rem;
            height: 25rem / @baseFont;
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            .nav-item{
                font-size: 12rem / @baseFont;
                border-radius: 8rem / @baseFont;
                padding: 4rem / @baseFont 8rem / @baseFont;
                color: #fff;
                background-color: #a5b1c2;
            }
            .active{
                background-color: #3dc1d3;
            }
        }
    }
</style>