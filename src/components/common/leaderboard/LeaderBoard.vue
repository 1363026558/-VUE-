<template>
    <div class="leaderboard">
    <div class="tab_button">
      <ul class="tab">
        <li @click="changetab(1)" class="li_active">热度最高</li>
        <li @click="changetab(2)">点赞最多</li>
        <li @click="changetab(3)">最新文章</li>
      </ul>
    </div>
     <div class="tab_content active">
      <ul>
        <li v-for="(item, i) in articleHot" :key = 'i'>
          <router-link :to="{ path: '/perread', query: {id: item.id}}">
          <div class="mycontent myactive" v-if="i == 0">
            <img :src=logo[i] alt="" @click="changeShow(i)">
            <a>
              <span>{{item.title}}</span>
            </a>
            <p>{{item.info}}</p>
          </div>
          <div class="mycontent" v-if="i != 0">
            <img :src=logo[i] alt="" @click="changeShow(i)">
            <a>
              <span>{{item.title}}</span>
            </a>
            <p>{{item.info}}</p>
          </div>
          </router-link>
        </li>
      </ul>
      
    </div> 
    <!-- //点赞 -->
    <div class="tab_content">
      <ul>
        <li v-for="(item, i) in articleGood" :key = 'i'>
          <router-link :to="{ path: '/perread', query: {id: item.id}}">
          <div class="mycontent myactive" v-if="i == 0">
            <img :src=logo[i] alt="" @click="changeShow(5+i)">
            <a>
              <span>{{item.title}}</span>
            </a>
            <p>{{item.info}}</p>
          </div>
          <div class="mycontent" v-if="i != 0">
            <img :src=logo[i] alt="" @click="changeShow(5+i)">
            <a>
              <span>{{item.title}}</span>
            </a>
            <p>{{item.info}}</p>
          </div>
                    </router-link>

        </li>
      </ul>
    </div>
    <!-- 最新 --> 
    <div class="tab_content">
      <ul>
        <li v-for="(item, i) in articleNew" :key = 'i'>
          <router-link :to="{ path: '/perread', query: {id: item.id}}">
          <div class="mycontent myactive" v-if="i == 0">
            <img :src=logo[i] alt="" @click="changeShow(10+i)">
            <a>
              <span>{{item.title}}</span>
            </a>
            <p>{{item.info}}</p>
          </div>
          <div class="mycontent" v-if="i != 0">
            <img :src=logo[i] alt="" @click="changeShow(10+i)">
            <a>
              <span>{{item.title}}</span>
            </a>
            <p>{{item.info}}</p>
          </div>
        </router-link>

        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
    name: 'LeaderBoard',
    data() {
        return {
           logo: [
            require('../../../assets/img/list/冠军.png'),
            require('../../../assets/img/list/亚军.png'),
            require('../../../assets/img/list/季军.png'),
            require('../../../assets/img/list/4.png'),
            require('../../../assets/img/list/5.png'),
            ]
        }
    },
    props: {
        articleHot: {
            type: Array,
            default: []
         },
         articleGood: {
            type: Array,
            default: []
         },
         articleNew: {
            type: Array,
            default: []
         },
        
    },
    created() {
        
        
    },
    methods: {
        changeShow(index) {
            let oLi = document.querySelectorAll('.mycontent');
            if (index>=0 && index<5) {
            for(let i = 0; i < 5; i++) {
                oLi[i].classList.remove('myactive');
            }
            oLi[index].classList.add('myactive');
            }else if(index>=5 && index<10) {
            for(let i = 5; i < 10; i++) {
                oLi[i].classList.remove('myactive');
            }
            oLi[index].classList.add('myactive');
            }else if(index>=10 && index<15) {
            for(let i = 10; i < 15; i++) {
                oLi[i].classList.remove('myactive');
            }
            oLi[index].classList.add('myactive');
            }
    },
    
    
    changetab(key) {
        
      let content = document.querySelectorAll('.tab_content');
      let tab = document.querySelectorAll('.tab > li');
      for(let i = 0; i < content.length; i++) {
        content[i].classList.remove('active'); 
       tab[i].classList.remove('li_active');
      }
      content[key - 1].classList.add('active');
      tab[key - 1].classList.add('li_active');
    }
  
    }
    
}
</script>

<style lang="less" scoped>
    //排行榜、
    @baseFont: 25;
  .leaderboard {
    width: 14.5rem;
    height: 100%;
    margin: 10rem / @baseFont auto;
    border-radius: 8rem / @baseFont;
    background-color: #fff;
    .tab_button {
      width: 12rem;
      height: 35rem / @baseFont;
      margin: 0 auto;
      border-bottom: 1px solid rgba(236,236,236,0.8);
      .tab {
        display: flex;
        justify-content: space-between;
        font-size: 15rem / @baseFont;
        text-align: center;
        li {
          height: 35rem / @baseFont;
          line-height: 35rem / @baseFont;
          
        }
        .li_active {
          border-bottom: 1px solid rgba(0, 127, 255, 0.8);
          transition: all 1s;
        }
      }
    }
    .tab_content {
      display: none;
      width: 12rem;
      height: 100%;
      margin: 15rem / @baseFont auto;
      font-size: 14rem / @baseFont;
      padding-bottom: 10rem / @baseFont;
      .mycontent {
        height: 25rem / @baseFont;
        overflow: hidden;
        margin-bottom: 10rem / @baseFont;
      }
    
      .myactive {
        height: 100%  !important;
        
      }
      .pactive {
        font-weight: 600 !important;
        font-size: 16rem / @baseFont;
      }
      img {
        width: 25rem / @baseFont;
        height: 25rem / @baseFont;
        vertical-align: middle;
      }
      
      a {
        text-decoration: none;
        font-size: 14rem / @baseFont;
        color: #000;
        span {
          color: #000;
          font-weight: bold;
          font-size: 14rem / @baseFont;
          vertical-align: middle;
          margin-left: 10rem / @baseFont;
          font-weight: normal;
        }
        span:first-child {
          font-weight: 600 !important;
          font-size: 16rem / @baseFont;
        }
      }
      p {
        margin-left: 1.4rem;
        font-size: 14rem / @baseFont;
        color: #666;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
     
    }
    .active {
      display: block;
    }
  }
</style>