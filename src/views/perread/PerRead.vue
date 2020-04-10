<template>
    <div id="preread">
        <div class="content_top" v-if="reads" >
    <h2 style=" text-align: center;">{{reads.title}}</h2>

    <div class="content_bottom">
        <div class="author-info-right fl">
            <p>转载</p>
        </div>
        <div class="time">
            <img src="./../../assets/img/riqi.png" alt="">
            <span>{{reads.create_time}}</span>
        </div>
        <div class="views">
            <img src="./../../assets/img/redu2.png" alt="">
            <span class="vspan">{{reads.views}}</span>
        </div>
    </div>
    <div class="main_content" v-html="reads.content">   
    </div>
</div>


<div class="review">
    <div class="good" @click="good()" id="good">
        <img v-if="!imgColor" src="./../../assets/img/read/点赞.png" alt="">
        <img v-if="imgColor" src="./../../assets/img/read/点赞1.png" alt="">
        <p id="goodNum">{{goods}}</p> 
    </div>
    <p class="plugin">文章评论</p>
    <div class="review_content">
            <div class="input">
                <textarea ref="review" v-model="form.content" class="post_word" placeholder="说点什么？"></textarea>
                <div class="mysubmit">
                    <div class="names">
                        <i class="fa fa-user-circle"></i><input type="text" placeholder="你的昵称" v-model="form.username">
                    </div>
                    <button @click="postView()">提交</button>
                </div>
                <div class="show_msg">
                    {{msg}}
                </div>
            </div>
        
        <ul>
            <li v-for="(review, index) in reviews" :key='index'>
                <div class="top">
                    <div class="myimg fl">
                        <img :src="review.img" alt="">
                    </div>
                    <div class="message">
                        <h5>{{review.user_name}}</h5>
                        <p>{{review.create_time}}</p>
                    </div>
                    
                </div>
                <div class="content">
                    <p v-html="review.content"></p>
                </div>
            </li>
        </ul>
    </div>
</div>
    </div>
</template>


<script>
import {per, review, postReview, good} from '@/network/perread'


export default {
    name: 'PerRead',
    data() {
        return {
            id: null,
            reads: null,
            articleId:'',
            reviews: null,
            goodHistory: [],
            msg: '',
            goods: null,
            imgColor: null,
            remind: [
                {
                'nomsg': '输入信息不得为空',
                'overmsg': '字数超过200的限制',
                'lessmsg': '字数少于3个字',
                'overuser': '用户名超过6个字符',
                'over': '超过字数限制',
                
                }
            ],
            addconfig: {
                id: null,
                add: 1
            },
            form: {
                articleId: "", 
                content: "",
                username: ""
            },
           
        }
    },
    created() {
        if (window.localStorage.getItem('goodHistory')) {
            let str = JSON.parse(window.localStorage.getItem('goodHistory'));
            this.goodHistory = str;
            
        }else {
            this.$store.commit('setStorage', {key: 'goodHistory', value: this.goodHistory});
            
        }
        this.id = this.$route.query.id;
        this.addconfig.id = this.id;
        this.form.articleId = this.id;
        this.articleId = this.id;
        console.log(this.form);
        
        
        per(this.id).then(res => {
            this.reads = res;
            this.goods = res.good;
        });
        review(this.id).then(res => {            
            this.reviews = res;
        });

        for (let item of this.goodHistory) {
            if(item == this.id) {
                this.imgColor = true;
            }else{
            this.imgColor = false;
            }
        }
        
    },
    methods: {
        add() {
             good(this.addconfig).then((response) => {
                this.goods = response;
            });
        },
        postView() {
            let msgDiv = document.querySelector('.show_msg');
            var result = this.form.content.replace(/[\r\n]/g, "").replace(/\s/g,"");
            var user = this.form.username.replace(/[\r\n]/g, "").replace(/\s/g,"");
           
            if (result.length != 0 && user.length != 0) {
                if(result.length > 200) {
                    this.msg = this.remind[0].overmsg;
                    msgDiv.style.display = 'block';
                    setTimeout(function() {
                    msgDiv.style.display = 'none';
                    },2000)
                }else if(result.length < 3) {
                    this.msg = this.remind[0].lessmsg;
                    msgDiv.style.display = 'block';
                    setTimeout(function() {
                    msgDiv.style.display = 'none';
                    },2000)
                }
                else if(user.length > 6) {                    
                    this.msg = this.remind[0].overuser;
                    msgDiv.style.display = 'block';
                    setTimeout(function() {
                    msgDiv.style.display = 'none';
                    },2000)
                }else {
                    let str = this.$refs.review.value.replace(/[\r\n]/g, "<br>");
                    this.form.content  = str.replace(/\s/g,"&nbsp;");
                    postReview(this.form).then((response) => {
                        this.reviews = response;
                    });
                    this.form = {
                        content: "",
                        username: ""
                    }
                }
            
            }else if (result.length == 0 || user.length == 0){
                this.msg = this.remind[0].nomsg;
                msgDiv.style.display = 'block';
                setTimeout(function() {
                msgDiv.style.display = 'none';
                },2000)
            }
           

        },
        good() {
            let border = document.querySelector('#good');
            let goodnum = document.querySelector('#goodNum');
            if(!this.imgColor) {
                this.goodHistory.push(this.articleId);
                
                this.$store.commit('setStorage', {key: 'goodHistory', value: this.goodHistory})

                this.addconfig.add = 1;
                this.add();
                this.imgColor = true;
                border.style.border = "1px solid #1296db";
                goodnum.style.color = '#1296db';
            }else if(this.imgColor){
                this.goodHistory = this.goodHistory.filter(item => {
                    return item != this.id;
                })
                
                this.$store.commit('setStorage', {key: 'goodHistory', value: this.goodHistory})

                this.addconfig.add = -1;
                this.add();
                this.imgColor = false;
                border.style.border = "1px dashed #bfbfbf";
                goodnum.style.color = '#bfbfbf';
        
            }
        }
    }
}
</script>

<style lang="less">
    @baseFont: 25;
    #preread {
        margin-top: 60rem / @baseFont;
    }
//标题
.content_top {
    width: 15rem;
    height: 100%;
    background-color: #fff;
    padding-top: 10rem / @baseFont;
    padding-bottom: 2rem;
    border-bottom: 1px solid #000;
   
    h2 {
        width: 14rem;
        font-size: 25rem / @baseFont;
        margin: 20rem / @baseFont auto;
        font-weight: normal;

    }

    .content_bottom {
        width: 12rem;
        height: 35rem / @baseFont;
        margin: 10rem / @baseFont auto;
        font-size: 12rem / @baseFont;
        display: flex;
        justify-content: space-between;
        
        .author-info-right{
            width: 40rem / @baseFont;
            height: 18rem / @baseFont;
            background-color: rgba(92, 184, 92, 0.8);
            color: #fff;
            margin-top: 5rem / @baseFont;
            text-align: center;
            border-radius: 4rem / @baseFont;
            padding-top: -1rem / @baseFont;
            font-weight: 500;
            font-size: 11rem / @baseFont;
            p{
                line-height: 18rem / @baseFont;
              
            }
        }
        
        .views, .time {
            height: 25rem / @baseFont;
            line-height: 25rem / @baseFont;
            
            img {
                width: 25rem / @baseFont;
                height: 25rem / @baseFont; 
                vertical-align: middle; 
            }
            span {
                line-height: 25rem / @baseFont;
                vertical-align: middle; 
            }
            .vspan {
                font-size: 13rem / @baseFont;
            }
        }
       
    }
    .main_content {
        width: 14.5rem;
        margin:  20rem / @baseFont auto;
        font-size: 0.7rem;
    
     pre {
        font-size: 0.5rem!important;
    }
    
    }
}






//评论
.review {
    width: 15rem;
    height: 100%;
    margin: -1rem auto;
    background-color: #fff;
    // border-radius: 8rem / @baseFont;
    .good {
        width: 60rem / @baseFont;
        height: 60rem / @baseFont;
        margin: 0 auto;
        border-radius: 50%;
        border: 1px dashed #bfbfbf;
        position: relative;
        transition: all 1s;
        img {
            width: 32rem / @baseFont;
            height: 32rem / @baseFont;
            position: absolute;
            top: 42%;
            left: 50%;
            transform: translate(-50%, -59%);
            transition: all 1s;
        }
        p {
            color: #bfbfbf;
            position: absolute;
            font-size: 10rem / @baseFont;
            top: 68%;
            left: 50%;
            transform: translate(-50%, -20%);
            transition: all 1s;
        }

        
    }
    .plugin{
        font-size: 16rem / @baseFont;
        width: 20%;
        padding: 8rem / @baseFont;
        color: #4854e0cf;
        font-weight: normal;
        border-bottom: 1px solid #4854e094;
    }
    .review_content {
        width: 12rem;
        margin: 0 auto;
        padding: 10rem / @baseFont;
        .input {
            width: 300rem / @baseFont;
            height: 100%;
            margin: 20rem / @baseFont auto;
            .post_word {
                width: 300rem / @baseFont;
                height: 100rem / @baseFont;
                border: 1px solid #4854e094;
                border-radius: 4rem / @baseFont;
                resize: none;
                
            }
            .mysubmit{
                width: 200rem / @baseFont;
                margin: 1rem / @baseFont auto;
                display: flex;
                justify-content: space-between;
                .names{
                    width: 120rem / @baseFont;
                    height: 25rem / @baseFont;
                    border-radius: 8rem / @baseFont;
                    border: 1px solid #4854e094;
                    display: flex;
                    justify-content: space-between;
                    padding: 2rem / @baseFont;
                    background-color: #e8e8e8;
                    i {
                        margin-top: 5rem / @baseFont;
                        font-size: 15rem / @baseFont;
                    }
                    input{
                        width: 100rem / @baseFont;
                        background-color: #e8e8e8;
                        border: none;
                        outline: none;
                    }
                }
                button {
                    outline: none;
                    width: 60rem/ @baseFont;
                    height: 30rem / @baseFont;
                    background-color: #4854e0cf;
                    color: #fff;
                    font-size: 10rem / @baseFont;
                    border-radius: 8rem / @baseFont;
                    border: none;
                }
            }
            .show_msg {
                display: none;
                padding: 8rem / @baseFont;
                text-align: center;
                background-color: rgb(254,242,225);
                color: rgb(238,84,42);
                margin-top: 10rem / @baseFont;
                font-size: 14rem / @baseFont;
                transition: all 1s;
            }
            
        }
        ul {
            width: 300rem / @baseFont;
            height: 100%;
            margin: 20rem / @baseFont auto;

            li {
                width: 100%;
                min-height: 2.84rem;
                background: #F6F6F6;
                margin-bottom: 15rem / @baseFont;
                padding: 8rem / @baseFont 8rem / @baseFont 20rem / @baseFont 8rem / @baseFont;
                border-radius: 8rem / @baseFont;
                .top {
                    height: 50rem / @baseFont;
                    .myimg {
                        
                        img{
                            width: 30rem / @baseFont;
                            height: 30rem / @baseFont;
                            border-radius: 8rem / @baseFont;
                        }
                    }
                    .message {
                        margin-left: 40rem / @baseFont;
                        color: #757575;
                        font-size: 15rem / @baseFont;
                        p {
                            color: #757575;
                            font-size: 12rem / @baseFont;
                        }
                    }
                }
                .content {
                    font-size: 15rem / @baseFont;
                }
            }
        }
    }
}
</style>