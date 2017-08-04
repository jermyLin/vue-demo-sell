<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" @click.stop.prevent="decreaseCount" v-show="food.count>0"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCount"></div>
    <!---->
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default{
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCount (e) {//增加食品的购买数量
        if (!e._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        console.log(this.food);
        this.$emit('add',event)
      },
      decreaseCount (e) {//减少食品的购买数量
        if (!e._constructed) {
          return;
        }
        this.food.count--;
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cart-control
    font-size 0
    .cart-decrease, .cart-add
      display inline-block
      font-size 24px
      line-height 24px
      padding 6px 0
      color rgb(0, 160, 220)
    .cart-count
      display inline-block
      width 24px
      line-height 24px
      padding-top 6px
      font-size 10px
      text-align center
      color rgb(147, 153, 159)
      vertical-align top
</style>
