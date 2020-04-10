<template>
<div class="main-contents">
  <div class="review_content">
    <div class="input">
        <textarea ref="review" v-model="form.content" class="post_word" placeholder="说点什么？"></textarea>
        <div class="mysubmit">
            <div class="names">
                <i class="fa fa-user-circle"></i>
                <input type="text" placeholder="你的昵称" v-model="form.username">
            </div>
            <button @click="postView()">提交</button>
        </div>
        <div class="show_msg">
          {{msg}}
      </div>
    </div>


</div>


    <div class="main-message clearfix">
        <div v-for="(item, i) in reviews" :key='i'>
           <div v-if="i % 2 == 0" class="leave-message fl">
            <div class="messageimg fl"><img :src="pic[0]" alt="">
            
            <p class="names">{{item.username}}</p></div>
            <div class="dbubble ml fr">
                <div class="dbubble-text"><p v-html="item.content"></p>
                  <p class="date">{{item.create_time}}</p>
                </div>
                <div class="triangle-box triangle-box-left">
                  <div class="triangle"></div>
                </div>
              </div>
    
        </div>

        <div v-if="i % 2 != 0" class="leave-message right">
            <div class="dbubble mr fl">
                <div class="dbubble-text">
                  <p v-html="item.content"></p>
                  <p class="date" style="text-align: left;">{{item.create_time}}</p>
                </div>
                <div class="triangle-box triangle-box-right">
                  <div class="triangle"></div>
                </div>
              </div>
              <div class="messageimg fr">
                <img :src="pic[0]" alt="">
                <p class="names">{{item.username}}</p>
              </div>
              
        </div>
        </div>
    </div>
</div>
</template>


<script>
import {getMessage, postMessage} from '@/network/message'
import axios from 'axios'
import qs from 'qs'


export default {
    name: 'Message',
    data() {
        return {
            form: {
                username: '',
                content: ''
            },
            pic: [
                require('@/assets/img/words/words.jpg'),
                require('@/assets/img/words/words1.jpg'),
            ],
            reviews: [],
            msg: '',
            remind: [
                {
                'nomsg': '未输入评论内容或用户名',
                'overmsg': '字数超过200的限制',
                'lessmsg': '字数少于3个字',
                'overuser': '用户名超过6个字符',
                'over': '超过字数限制'
                }
            ]
        }
    },
    created() {
        this.$store.commit('changeLoading')
        getMessage().then(res => {
        this.$store.commit('changeLoading')
            this.reviews = res
        })
    },
    methods: {
        postView() {
            let msgDiv = document.querySelector('.show_msg');
            var result = this.form.content.replace(/[\r\n]/g, "").replace(/\s/g,"");
            var user = this.form.username.replace(/[\r\n]/g, "").replace(/\s/g,"");
            if (result.length != 0 && user.length != 0) {
                if(this.form.content.length > 200) {
                    this.msg = this.remind[0].overmsg;
                    msgDiv.style.display = 'block';
                    setTimeout(function() {
                    msgDiv.style.display = 'none';
                    },2000)
                }else if(this.form.content.length < 3) {
                    this.msg = this.remind[0].lessmsg;
                    msgDiv.style.display = 'block';
                    setTimeout(function() {
                    msgDiv.style.display = 'none';
                    },2000)
                }
                else if(this.form.username.length > 6) {
                    this.msg = this.remind[0].overuser;
                    msgDiv.style.display = 'block';
                    setTimeout(function() {
                    msgDiv.style.display = 'none';
                    },2000)
                }else {
                    let str = this.$refs.review.value.replace(/[\r\n]/g, "<br>");
                    this.form.content  = str.replace(/\s/g,"&nbsp;");
                    
                    console.log(this.form);
                    
                    // axios.post('http://39.105.138.173:666/admin/article/addwords',qs.stringify(this.form))
                    // .then(res=>{
                    //     this.reviews = res.data;
                    //     console.log('res=>',res);            
                    // })

                    postMessage(this.form).then((response) => {
                        this.reviews = response;
                    });

                    this.form = {
                        content: "",
                        username: ""
                    }
                }
            
            }else {
                this.msg = this.remind[0].nomsg;
                msgDiv.style.display = 'block';
                setTimeout(function() {
                msgDiv.style.display = 'none';
                },2000)
            }

        }
},
}
</script>


<style lang="less">
    @baseFont: 25;

.right {
    float: right;

}
.triangle {
    width: 14rem / @baseFont;
    height: 14rem / @baseFont;
    background-color: #fff;
    transform: rotateZ(135deg);
    -moz-transform:rotateZ(135deg); 
  }

body {
    background-attachment:fixed;
    // background: url(./../../assets/img/words/bg9.jpg);
    background-size: cover;
}

.main-contents {
    width: 100%;
    height: 100%;
    // background-color: #fff;
   
    margin: 10rem / @baseFont auto;
    padding-top: 30rem / @baseFont;
    .main-message {
        width: 14rem;
        margin: 0 auto;
        .leave-message {

            width: 11.5rem;
            // height: 10rem;
            height: 100%;
            margin-bottom: 15rem / @baseFont;
    
            .messageimg {
                width: 1.5rem;
                height: 1.5rem;
                margin-top: 15rem / @baseFont;
                img {
                    width: 100%;
                    height: 100%;
                }
                .names {
                    color: #fff;
                    font-size: 12rem/ @baseFont;
                    text-align: center;
                   
                }
            }
            .dbubble {
                width: 200rem / @baseFont;
                opacity: 1;
                position: relative;
                background-color: #fff;
                border: 1px solid #dedede;
                padding: 15rem / @baseFont 15rem / @baseFont;
                z-index: 20;
                border-radius: 8rem / @baseFont;
                .dbubble-text {
                    font-size: 14rem / @baseFont;
                    color: #303030;
                    line-height: 1.6;
                    font-family: "微软雅黑";
                    p:first-child {
                        padding-bottom: 10rem / @baseFont;
                        border-bottom: 1px solid #666;
                    }
                    .date {
                        color: #666;
                        text-align: right;
                        font-size: 10rem/ @baseFont;
                        padding-top: 10rem / @baseFont;
                    }
                  }

                  .triangle-box-left {
                    position: absolute;
                    top: 20rem / @baseFont;
                    left: -8rem / @baseFont;
                    .triangle {
                        border-bottom: 1px solid #fff;
                        border-right: 1px solid #fff;
                      }
                  }
                  .triangle-box-right {
                    position: absolute;
                    top: 20rem / @baseFont;
                    right: -8rem / @baseFont;
                    .triangle {
                        border-top: 1px solid #fff;
                        border-left: 1px solid #fff;
                      }
                  }
                
              }
        }
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
                border-radius: 8rem / @baseFont;
                resize: none;
                padding: 5rem / @baseFont;
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
                    border: none;
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
            }
        }
       
    }
}
</style>