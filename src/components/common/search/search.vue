<template>
<div id="search">
    <div class="tops">
        <a> 
        <router-link to="/search">
            <div class="searchs" >
                <span>搜索</span>
            </div>
        </router-link>
        </a>
    </div>
</div>
</template>

<script>
export default {
    name: 'Search'
}
</script>


<style lang="less">
@baseFont: 25;
#search{
     .tops {
        width: 14.5rem;
        height: 40rem / @baseFont;
        background-color: #fff;
        position: relative;
        border-radius: 8rem / @baseFont;
        margin: 0 auto;
        margin-top: 71rem / @baseFont;
      a {
        text-decoration: none;
        font-size: 12rem / @baseFont;
        color: #666;
        .searchs {
          position: absolute;
          top: 10rem / @baseFont;
          left: 0.25rem;
          width: 14rem;
          height: 20rem / @baseFont;
          line-height: 20rem / @baseFont;
          // border: 1px solid rgba(236,236,236,0.5);
          border-radius: 8rem / @baseFont;
          background: url(./../../../assets/img/search.png) no-repeat 10rem / @baseFont;
          background-size: 15rem / @baseFont 15rem / @baseFont;
          span {
            margin-left: 30rem / @baseFont;
            
          }
        }
      }
  
    
  }
}
</style>