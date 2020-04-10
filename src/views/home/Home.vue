<template>
  <div class="home">
    <search></search>
    <home-slide :banners="banners"></home-slide>
    <page-list></page-list>
    <leader-board :articleHot="articleHot"
     :articleGood="articleGood"
     :articleNew="articleNew"
    ></leader-board>
  </div>
</template>

<script>
import {getHomeData, getBanner} from '@/network/home'

import Search from '@/components/common/search/search'
import HomeSlide from './homechild/HomeSlide'
import PageList from '@/components/common/pagelist/PageList'
import LeaderBoard from '@/components/common/leaderboard/LeaderBoard'



export default {
  name: 'Home',
  components: {
   HomeSlide,
   Search,
   PageList,
   LeaderBoard
  },
  data() {
    return {
      banners: [],
      articleHot: [],
      articleGood: [],
      articleNew: [],
    }
  },
  created() {
    
    getHomeData(1).then(res => {
      this.articleHot = res;
    }),
    getHomeData(2).then(res => {
      this.articleGood = res;
    }),
    getHomeData(3).then(res => {
      this.articleNew = res;
    }),
    getBanner().then(res => {
      this.banners = res;
    })
  }
}
</script>
