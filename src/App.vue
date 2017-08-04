<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tap border-1px">
      <div class="tap-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tap-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tap-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  import {urlParse} from './common/js/util'

  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            console.log(queryParam);
            return queryParam.id;
          })()
        },
      }
    },
    components: {
      'v-header': header
    },
    created() {

      this.$http.get('/api/seller?id='+this.seller.id).then((res) => {
        res = res.data;
        console.log(res);
        if (res.errno === 0) {
          this.seller = Object.assign({},this.seller,res.data);
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  .tap
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tap-item
      flex 1
      text-align center
      & > a
        display block
        font-size 14px
        color: rgb(77, 85, 93)
        &.active
          color rgb(240, 20, 20)
</style>
