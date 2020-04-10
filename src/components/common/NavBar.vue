<template>
    <div id="nav-bar">
        <header>
            <div class="nav">
                <div class="middle"><h1><router-link to="/home"> WYM.BLOG</router-link></h1></div>
                <div class="searchs" >
                    <img @click="weather()" src="@/assets/img/tianqi.png" alt="">
                </div>
            </div>
            <div id="aaa">
                <div class="triangle-box-left1" id="triangle">
                <div class="triangle1"></div>
                </div>
                <iframe id="iframe1" scrolling="no" src="https://tianqiapi.com/api.php?style=ya&skin=sogou" frameborder="0"  allowtransparency="true"></iframe>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
   methods: {
       weather() {
            let frame = document.querySelector('iframe');
            let aaa = document.querySelector('#aaa');
            let bbb = getComputedStyle(aaa).opacity;
            if(  bbb == '0') {
                aaa.style.display = 'block';
                aaa.style.opacity = '0.9';
                setTimeout(function() {
                    aaa.style.display = 'none';
                    aaa.style.opacity = '0';
                }, 2000)
            }else if( bbb == '0.9'){
                aaa.style.opacity = '0';
                aaa.style.display = 'none';    
            }
            
        }
   }

};
</script>

<style lang="less" scoped>
@baseFont: 25;
    #nav-bar {
        header {
            width: 15rem;
            height: 60rem / @baseFont;
            background-color: #fff;
            position: fixed;
            top: 0;
            left: 50%;
            z-index: 999;
            transform: translateX(-50%);
            color:  #007fff;
            border-bottom: solid 1px #E7E7E7;
            box-shadow: 0 1px 1px #E7E7E7;
        .nav {
            width: 341rem / @baseFont;
            height: 60rem / @baseFont;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            .list {
                margin-top: 15rem / @baseFont;
            }
            .middle {
                flex: 1;
                text-align: left;
                line-height: 2.4rem;
                
                h1{
                    font-size: 20rem / @baseFont;
                    //color: #909090;
                    font-weight: 500;
                    outline: none;
                    border: none;
                }
            }
            .searchs {
                margin-top: 15rem / @baseFont;
                img {
                width: 26rem / @baseFont;
                height: 26rem / @baseFont;
                }
            }
        }

        #aaa {
            opacity: 0;
            transition: all 1s;
            display: none;
            position: relative;
        .triangle-box-left1 {
            position: absolute;
            top: 0;
            right: 2rem;
            .triangle1 {
                width: 25rem / @baseFont;
                height: 25rem / @baseFont;
                background-color: #f7f7f7;
                transform: rotateZ(155deg);
                -moz-transform: rotateZ(155deg);
                 background: url(./../../assets/img/banner/images.jpg) 100% 10%;

            }
        }
        #iframe1 { 
                background-color: #f7f7f7;
                width: 240px;
                height: 140px;
                border-radius: 8rem / @baseFont;
                border: 1px solid rgba(0, 127, 55, 0.5);
                
                margin-left: 130rem / @baseFont;
                margin-top: 5rem / @baseFont;
                z-index: 999;
                background: url(../../assets/img/banner/images.jpg);
                background-size: cover;
            }
           
    } 
}
    }
        
</style> 