<template>
 <div class="pagelist">
    <div class="guide">
      <a class="per_content">
          <router-link to="/read">
            <h2><img src="./../../../assets/img/list/新闻.png" alt=""></h2>
            <p>各类文章</p>
          </router-link>
      </a>
      <a class="per_content">
        <h2><img src="./../../../assets/img/list/博士帽1.png" alt=""></h2>
        <p>知识干货</p>
      </a>
      <a class="per_content">
        <h2><img src="./../../../assets/img/list/阅读.png" alt=""></h2>
        <p>新鲜趣闻</p>
      </a>
     
      <a class="per_content special">
        <h2><img src="./../../../assets/img/list/电脑.png" alt=""></h2>
        <p>科技前沿</p>
      </a>
      <a class="per_content special">
        <h2><img src="./../../../assets/img/list/锁.png" alt=""></h2>
        <p>不知道是啥</p>
      </a>
      <a class="per_content special">
        <router-link to="/message">
          <h2><img src="./../../../assets/img/list/留言.png" alt=""></h2>
        <p>畅所欲言</p>
        </router-link>
        
      </a>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PageList'
}
</script>

<style lang="less">
    @baseFont: 25;
    .pagelist {
    width: 14.5rem;
    height: 180rem / @baseFont;
    margin: 0 auto;
    background-color: #fff;
    position: relative;
    margin-top: 10rem / @baseFont;
    border-radius: 8rem / @baseFont;
    .guide {
      position: absolute;
      top: 10rem / @baseFont;
      left: 0.25rem;
      width: 14rem;
      height: 160rem / @baseFont;
      display: flex;
      flex-wrap: wrap;
      .per_content {
        flex: 1 1 33.3%;
        text-decoration: none;
        display: block;
        border: 1px solid rgba(236,236,236,0.5);
        box-sizing: border-box;
        width: 33.3%;
        padding: 18px 0 16px;
        text-align: center;
        border-radius: 8rem / @baseFont;
        h2 {
          color: #2384E8;
          font-size: 19rem / @baseFont;
          margin-bottom: 2px;
          font-weight: 500;
          
        }
      
        p {
          color: #818181;
          font-size: 13rem / @baseFont;
          letter-spacing: 1px;
        }
      }
      .special {
        img {
           width: 0.9rem;
        height:0.9rem;
        }
       
      }
      
    }
  }


  

</style>