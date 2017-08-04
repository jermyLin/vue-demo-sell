<template>
  <transition name="slide">
    <div v-show="isShowFood" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <i @click="hide" class="back icon-arrow_lift"></i>
        </div>
        <div class="content">
          <h1 class="name">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}分</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="control-wrapper">
            <cart-control @add="addFood" :food="food"></cart-control>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="add-cart" v-show="food.count===0||!food.count">加入购物车</div>
          </transition>
        </div>
        <split v-if="food.info"></split>
        <div class="food-info" v-if="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <rating-select @select="select"
                         @toggle-content="toggleContent"
                         :select-type="selectType"
                         :only-content="onlyContent"
                         :desc="desc"
                         :ratings="food.ratings">
          </rating-select>
          <div class="rating-wrapper">
            <ul v-if="food.ratings && food.ratings.length">
              <li v-show="needShow(item.rateType,item.text)" v-for="item in food.ratings" class="rating-item">
                <div class="time">{{item.rateTime | formatDate }}</div>
                <div class="user">
                  <span class="name">{{item.username}}</span>
                  <img :src="item.avatar" width="12" height="12">
                </div>
                <p class="rating-content">
                  <span :class="{'icon-thumb_up':item.rateType===0,
                  'icon-thumb_down':item.rateType===1}"></span>
                  <span class="text">{{item.text}}</span>
                </p>
              </li>
            </ul>
            <div class="no-rating" v-else-if="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartControl from 'components/cartcontrol/cartcontrol'
  import split from 'components/split/split'
  import ratingSelect from 'components/ratingselect/ratingselect'
  import Vue from 'vue'
  //import {formatDate} from 'common/js/date';
  import {formatDate} from 'common/js/comm';

  const ALL = 2;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    components: {
      cartControl,
      split,
      ratingSelect
    },
    data() {
      return {
        isShowFood: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    beforeUpdate() {
      console.log(this.food)
    },
    filters: {
//    formatDate(time) {//正则的转换方法
//      let date = new Date(time);
//      return formatDate(date, 'yyyy-MM-dd hh:mm');
//    }
      formatDate(time) {
        return formatDate(time);
      }
    },
    methods: {
      show() {
        this.isShowFood = true;
        this.selectType = ALL;
        this.onlyContent = false;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.isShowFood = false
      },
      addFirst(e) {
        if (!e._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
        this.$emit('add', event)
      },
      addFood() {
        this.$emit('add', event)
      },
      select(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      toggleContent(bool) {
        this.onlyContent = !bool;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return this.selectType === type;
        }
      },
    },
  }
</script>
-
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .food
    position fixed
    width 100%
    left 0
    top 0
    bottom 48px
    z-index 30
    background #fff
    .image-header
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        padding 10px
        font-size 20px
        color #fff
    .content
      position relative
      padding 18px
      .name
        font-size 14px
        line-height 14px
        font-weight 700
        color rgb(7, 17, 27)
        margin-bottom 8px
      .detail
        font-size 0
        line-height 10px
        margin-bottom 18px
        color rgb(147, 153, 159)
        .sell-count
          font-size 10px
          margin-right 12px
        .rating
          font-size 10px
      .price
        font-size 0
        line-height 24px
        height 24px
        .now
          font-size 14px
          font-weight 700
          margin-right 8px
          color rgb(240, 20, 20)
        .old
          text-decoration line-through
          font-size 10px
          color rgb(147, 153, 159)
      .control-wrapper
        position absolute
        right 18px
        bottom 12px
      .add-cart
        position absolute
        right 18px
        bottom 18px
        line-height 12px
        font-size 10px
        padding 6px 12px
        border-radius 12px
        color #fff
        background rgb(0, 160, 220)
        z-index 20
    .food-info
      padding 18px
      .title
        line-height 14px
        font-size 14px
        font-weight 700
        color rgb(7, 17, 27)
      .text
        line-height 24px
        font-size 12px
        padding 0 8px
        margin-top 6px
        color rgb(77, 85, 93)
    .rating
      padding-top 18px
      .title
        line-height 14px
        font-size 14px
        font-weight 700
        color rgb(7, 17, 27)
        margin-left 18px
      .rating-wrapper
        padding 0 18px
        .rating-item
          padding 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .time
            display inline-block
            font-size 10px
            color rgb(147, 153, 159)
          .user
            float right
            .name
              line-height 12px
              font-size 10px
              color rgb(147, 153, 159)
              margin-right 6px
              vertical-align middle
            img
              border-radius 50%
          .rating-content
            margin-top 6px
            font-size 0
            .icon-thumb_up, .icon-thumb_down
              line-height 24px
              font-size 12px
              vertical-align middle
            .icon-thumb_up
              color rgb(0, 160, 220)
            .icon-thumb_down
              color rgb(147, 153, 159)
            .text
              line-height 18px
              font-size 12px
              color rgb(7, 17, 27)
              margin-left 4px
              vertical-align middle
        .no-rating
          padding 18px 0 18px 15px
          line-height 12px
          font-size 12px
          color rgb(147, 153, 159)
</style>
