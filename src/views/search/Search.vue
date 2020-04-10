<template>
<div id="search">
    <div class="search_top">
        <div class="search_input">
            <input type="text" ref="searchs" name="query_word" v-model="query_word">
            <i class="fa fa-times" aria-hidden="true" v-if="query_word" @click="delete_query()"></i>
        </div>
        <button  @click="searchFor()">搜索</button>
        <!-- <a [routerLink]="[ '/searchlist']" [queryParams] = "{title: query_word}">ss</a> -->
    </div>

<div class="search_history">
    <ul>
        <li>搜索历史</li>
        <li v-for="(item, index) in searchLists" :key='index'>
            <i class="fa fa-external-link"></i>&nbsp;&nbsp;&nbsp;&nbsp;
            <a> 
                <router-link :to="{ path: '/searchlist', query: {title: item}}">{{item}}</router-link> 
                </a>
            
            <i class="fa fa-trash-o" @click="deletes(index)"></i>
        </li>
        
    </ul>
</div>
</div>
    

</template>

<script>
import {searchArticle} from '@/network/read'
export default {
    name: 'Search',
    data() {
        return {    
            query_word: '',
            searchLists: [],
        }
    },
    created() {
        console.log(typeof(this.searchLists));
        
        if (window.localStorage.getItem('searchLists')) {
            let str = JSON.parse(window.localStorage.getItem('searchLists'));
            this.searchLists = str;
            
        }else {
            this.$store.commit('setStorage', {key: 'searchLists', value: this.searchLists});
            
        }
    },
    
    
    methods: {
        delete_query() {
            this.query_word = "";
        },
        searchFor() {
            if (this.query_word) {
                 this.searchLists.push(this.query_word);
                this.$store.commit('setStorage', {key: 'searchLists', value: this.searchLists})
                this.$router.push({path: '/searchlist', query: { title: this.query_word }})
                this.query_word = "";
         
            for (let item of this.searchLists) {
                if(item == this.query_word) {
                this.$store.commit('setStorage', {key: 'searchLists', value: this.searchLists})
                this.$router.push({path: '/searchlist', query: { title: this.query_word }})
                this.query_word = "";
                
                }
                
            }
            if (this.query_word) {
                if(this.searchLists.length > 10) {
                this.searchLists.push(this.query_word);
                this.searchLists.shift();
                this.$store.commit('setStorage', {key: 'searchLists', value: this.searchLists})
                this.query_word = "";
                this.$router.push({path: 'SearchList', query: { title: this.query_word }})

                }else {
                this.searchLists.push(this.query_word);
                this.$store.commit('setStorage', {key: 'searchLists', value: this.searchLists})
                this.query_word = "";
                this.$router.push({name: '/searchlist', query: { title: this.query_word }})

                }
                
            }
            else {

            }
            }
            
        },
        deletes(key) {
            console.log(this.searchLists);
            
            this.searchLists.splice(key, 1);
                this.$store.commit('setStorage', {key: 'searchLists', value: this.searchLists})
        }
    }

}
</script>


<style lang="less">
@baseFont: 25;


.corrent {
   left: '47.3% !important';
}
.search_top {
    background-color: #fff;
    width: 94.5%;
    padding: 10rem / @baseFont;
    display: flex;
    justify-content: space-between;
    margin-top: 61rem / @baseFont;
    
    .search_input {
        width: 260rem / @baseFont;
        height: 30rem / @baseFont;
        color: #dfdfdf;
        font-size: 14rem / @baseFont;
        padding-left: 8rem / @baseFont;
        margin-left: 15rem / @baseFont;
        border-radius: 8rem / @baseFont;
        border: 1px solid #dfdfdf;
        background: url(./../../assets/img/search.png) no-repeat 10rem / @baseFont;
        background-size: 15rem / @baseFont 15rem / @baseFont;
        input {
            outline: none;
            border: none;
            background: #fff;
            width: 210rem / @baseFont;
            height: 20rem / @baseFont;
            padding: 4rem / @baseFont;
            margin-left: 20rem / @baseFont;
        
        }
        i {
            line-height: 30rem / @baseFont;
        }
    }
    button {
        outline: none;
        width: 50rem/ @baseFont;
        height: 28rem / @baseFont;
        background-color: #007fff;
        color: #fff;
        font-size: 13rem / @baseFont;
        border-radius: 8rem / @baseFont;
        border: none;
        letter-spacing:2px;
        margin-right: 25rem / @baseFont;
    }
}
.search_history {
    width: 100%;
    min-height: 1000rem / @baseFont;
    background-color: #fff;
    font-size: 15rem / @baseFont;
    
    
    ul {
        width: 90%;
        margin: 0 auto;
        padding-top: 40rem / @baseFont;
        padding-bottom: 50rem / @baseFont;
        color: #666;
        li {
            height: 40rem / @baseFont;
            line-height: 35rem / @baseFont;
            margin-top: 5prem /  @baseFont;
            border-bottom: 1px solid #f7f7f7;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            position: relative;
            .fa-trash-o {
                position: absolute;
                right: 0;
                line-height: 35rem / @baseFont;
            }
            a {
                color: #666;
                text-decoration: none;
            }
        }
    }
}
</style>