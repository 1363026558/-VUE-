<template>
<div id="read">
  <nav-bar @itemClick="navClick"></nav-bar>
  <div class="main-content">
    <ul>
        <li v-for="(item, index) in Article" :key ='index'>
          <a>
          <router-link :to="{ path: '/perread', query: {id: item.id}}">
          <div class="per-content">
            <div class="author-info clearfix">
              <div class="author-info-left fl">
                <div class="author-img fl">
                  <img :src="item.img" alt="">
                </div>
                <p class="author-name fl">{{item.create_time}}</p>
              </div>
              <div v-if="item.category == 1" class="news author-info-right fr">
                <p>新鲜事</p>
              </div>
              <div v-if="item.category == 2" class="skill author-info-right fr">
                <p>技术栈</p>
              </div>
              <div v-if="item.category == 3" class="read author-info-right fr">
                <p>趣阅读</p>
              </div>
              <div v-if="item.category == 4" class="technology author-info-right fr">
                <p>科技圈</p>
              </div>
            
            </div>
            <div class="text-bottom clearfix">
              <div class="text-bottom-left fl">
                <h3>{{item.title}}</h3>
                <p>{{item.info}}</p>
              </div>
              <div class="right-img fr">
                <img :src="item.img" alt="">
              </div>
            </div>
          </div>
          </router-link>
        </a>
        </li>
      
    </ul>
  </div>
</div>

</template>


<script>
import {getArticle} from '@/network/read'
import NavBar from '@/components/common/nav/Nav'

export default {
    name: 'Read',
    components: {
      NavBar
    },
    data() { 
        return {
            Article: [],
            categoryArticle: [],
            response: []
        }
    },
    methods: {
      async navClick(item) {
        this.$store.commit('changeLoading')
        await getArticle().then(res => {
          this.$store.commit('changeLoading')
          this.response = res;
        })
        if(item.id == 0) {
          await this.requestData();
        }else {
          this.categoryArticle = [];
          for(let content of this.response) {
            if(content.category == item.id) {              
              this.categoryArticle.push(content)
            }
          }
          this.Article = this.categoryArticle;
        }
        
        
      },
      requestData() {
         this.$store.commit('changeLoading')
          getArticle().then(res => {
          this.$store.commit('changeLoading')
          this.Article = res;
        })
      }
      
    },
    created() {
       this.requestData();
    }
}
</script>


<style lang="less">
@baseFont: 25;
.author-info-right{
    width: 50rem / @baseFont;
    height: 20rem / @baseFont;
    color: #fff;
    margin-top: 4rem / @baseFont;
    text-align: center;
    border-radius: 8rem / @baseFont;
    padding-top: -1rem / @baseFont;
    font-weight: 500;
    p{
        line-height: 20rem / @baseFont;
      
    }
    
}
.news {
    background-color: rgba(35, 132, 232, 0.7);
}
.skill {
    background-color: rgba(244, 143, 46, 0.7);
}
.technology {
    background-color: rgba(122, 106, 219, 0.7);
}
.read {
    background-color: rgba(42, 184, 204, 0.7);
}
</style>