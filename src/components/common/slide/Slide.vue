<template>
<div id="ibanner">
    <div class="banner">
    <div class="slides" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <slot></slot>
    </div>
    <div class="guide_btn">
      <ol v-if="bannerCount">
        <li v-for="(item, index) in bannerCount" :key="index" :class="{li_active: (index === currentIndex - 1 || currentIndex - index == 6)}"></li>
      </ol>
    </div>
  </div>
</div>
  
</template>


<script>
export default {
    name: 'Slide',
    data() {
        return {
            currentIndex: 1,
            bannerCount: 0,
            interval: 3000,//时间
            imgWidth: 0, // img的宽度
            playTimer: null,
            timerId: null,
            scrolling: false, // 是否正在滚动
            slidesStyle: {}, // swiper样式
        }
    },
    mounted() {
        //操作dom节点
        setTimeout(() => {
            // 1.创建节点
            this.createDom();
             // 2.开启定时器
            this.startTimer();
        }, 1000)
    },
    methods: {
        //获取信息，追加节点。
        createDom: function() {
            let slides = document.querySelector('.slides');
            let imgAll = document.querySelectorAll('.imgItem');
            this.bannerCount = imgAll.length;
            this.imgWidth = imgAll[0].offsetWidth;
            
            if(this.bannerCount > 1) {
                let firstImg = imgAll[0].cloneNode(true);
                let lastImg = imgAll[this.bannerCount - 1].cloneNode(true);
                slides.insertBefore(lastImg, imgAll[0]);
                slides.appendChild(firstImg);
                this.slidesStyle = slides.style;
            }
            this.setTransform(- this.imgWidth);
        },

        //动画平移目标位置
        setTransform: function(position) {
            this.slidesStyle.transform = `translate3d(${position}px, 0, 0)`;
            this.slidesStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
            this.slidesStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
        },

        //轮播图片
        scollContent: function(target) {
            //表示进行自动轮播中，阻止其他操作
            this.scrolling = true;

            //开始滚动            
            this.slidesStyle.transition ='transform ' + 300 + 'ms';
            this.setTransform(target);

            //检查定位
            this.checkIndex();

            //轮播完成，解除锁定
            this.scrolling = false;

        },
        //打开定时器
        startTimer: function() {
            this.playTimer = window.setInterval(() => {
                this.currentIndex++;
                let target = - this.currentIndex * this.imgWidth;
                this.scollContent(target);
            }, this.interval);
        },

        //修改currentIndex
        checkIndex: function() {
            setTimeout(() => {
            this.slidesStyle.transition ='0ms';
            if(this.currentIndex >= this.bannerCount + 1) {
                this.currentIndex = 1;
                this.setTransform(- this.currentIndex * this.imgWidth);
                
            }else if(this.currentIndex <= 0){
                this.currentIndex = this.bannerCount;
                this.setTransform(- this.currentIndex * this.imgWidth);
            }
             // 2.结束移动后的回调
            }, 300)
            
        },

        // 关闭定时器
        stopTimer: function() {
            clearInterval(this.playTimer);
        },

        //手指滑动
        touchStart: function(e) {
            //判断是否在执行滚动动画
            if(this.scrolling) {
                return;
            }
            //停止定时器
            this.stopTimer();
            //获取当前位置
            this.startX = e.touches[0].pageX;
            
        },
        touchMove: function(e) {
            this.currentX = e.touches[0].pageX;
            this.distance = this.currentX - this.startX;
            let currentPosition = -this.currentIndex * this.imgWidth;
            let targetPosition = currentPosition + this.distance;
            
            this.setTransform(targetPosition);
            
        },
        touchEnd: function() {
            let finalDistance = Math.abs(this.distance);
            if(finalDistance == 0) {
                return;
            }else if(this.distance > 0 && finalDistance >= this.imgWidth * 0.3) {
                this.currentIndex--;
            }else if(this.distance < 0 && finalDistance >= this.imgWidth * 0.3) {
                this.currentIndex++;

            }
            this.scollContent(-this.currentIndex * this.imgWidth);
            this.startTimer();
        }
    }
}
</script>



<style lang="less">
@baseFont: 25;
    #ibanner {
        .banner {
            width: 14.5rem;
            height: 176rem / @baseFont;
            margin: 0.4rem auto;
            overflow: hidden;
            border-radius: 8rem / @baseFont;

            .slides{
                display: flex;
                width: 15rem;
                height: 176rem / @baseFont;
                img{
                    width: 15rem;
                    height: 100%;
                }
            }
            .guide_btn {
                width: 8rem;
                height: 15rem / @baseFont;
                margin: -1rem auto;
                position: relative;
            ol {
                width: 100%;
                position: absolute;
                // left: 50%;
                // transform: translateX(-50%);
                height: 15rem / @baseFont;
                margin: -0.7rem auto;
                text-align: center;
            }
            li{
            display: inline-block;
            width: 5rem / @baseFont;
            height: 5rem / @baseFont;
            border-radius: 50%;
            margin: 0 5rem / @baseFont;
            background-color: #fff;
        
                }
                .li_active{
                    background-color: #007fff;
                }
            
            }
        }  

    }
</style>