<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <span class="score">{{seller.score}}</span>
          <span class="title">综合评分</span>
          <span class="rank">高于周边商家{{seller.rankRate}}%</span>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery">
            <span class="title">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select
        @select="select"
        @toggle-content="toggleContent"
        :select-type="selectType"
        :only-content="onlyContent"
        :ratings="ratings">
      </rating-select>
      <div class="ratings-wrapper">
        <ul>
          <li v-show="needShow(item.rateType,item.text)" class="rating-item" v-for="item in ratings">
            <div class="avatar">
              <img :src="item.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{item.username}}</h1>
              <div class="star-wrapper">
                <star class="star" :size="24" :score="item.score"></star>
                <span class="deliveryTime" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{item.text}}</p>
              <div class="recommend" v-show=" item.recommend && item.recommend.length ">
                <span :class="{'icon-thumb_up':item.rateType===0,
                  'icon-thumb_down':item.rateType===1}"></span>
                <span class="rec" v-for="rec in item.recommend">{{rec}}</span>
              </div>
              <div class="time">{{item.rateTime | formatDate }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import star from 'components/star/star'
  import split from 'components/split/split'
  import ratingSelect from 'components/ratingselect/ratingselect'
  import {formatDate} from 'common/js/comm';

  const ALL = 2;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split,
      ratingSelect,
      BScroll
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: false,
      }
    },
    created() {
//      console.log("@@@@");
//      console.log(this.seller);
//      console.log("@@@@");
      this.$http.get('/api/ratings').then((res) => {
        res = res.data;
        if (res.errno === 0) {
          this.ratings = res.data;
          this.$nextTick(() => {
            this._initScroll();
          });
        }
      })
    },
    filters: {
      formatDate(time) {
        return formatDate(time);
      }
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
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
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings
    position absolute
    top 174px
    left 0
    bottom 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        width 137px
        text-align center
        padding 6px 0
        border-right 1px solid rgba(7, 17, 27, 0.1)
        @media only screen and (max-width 320px)
          flex 0 0 120px
          width 120px
        .score
          line-height 28px
          font-size 24px
          color rgb(255, 153, 0)
        .title
          display block
          line-height 12px
          font-size 12px
          color rgb(7, 17, 27)
          margin 6px 0 8px 0
        .rank
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
      .overview-right
        flex 1
        padding 6px 0 6px 24px
        @media only screen and (max-width 320px)
          padding-left 6px
        .title
          line-height 18px
          font-size 12px
          margin-right 12px
          color rgb(7, 17, 27)
        .score-wrapper
          margin-bottom 8px
          font-size 0
          .star
            display inline-block
            margin-right 12px
            vertical-align top
          .score
            line-height 18px
            font-size 12px
            color rgb(255, 153, 0)
        .delivery
          font-size 0
          .deliveryTime
            line-height 18px
            font-size 12px
            color rgb(147, 153, 159)
    .ratings-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex 0 0 28px
          width 28px
          height 28px
          border-radius 50%
          margin-right 12px
          overflow hidden
          vertical-align top
        .content
          position relative
          flex 1
          .name
            line-height 12px
            font-size 10px
            color rgb(7, 17, 27)
          .star-wrapper
            font-size 0
            margin 4px 0 6px 0
            .star
              display inline-block
              margin-right 6px
              vertical-align top
            .deliveryTime
              display inline-block
              line-height 12px
              font-size 10px
              color rgb(147, 153, 159)
              margin-top 1px
          .text
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
            margin-bottom 8px
          .recommend
            font-size 0
            line-height 16px
            .icon-thumb_up, .icon-thumb_down, .rec
              display inline-block
              font-size 12px
              vertical-align middle
              margin 0 8px 4px 0
            .icon-thumb_up
              color rgb(0, 160, 220)
            .icon-thumb_down
              color rgb(147, 153, 159)
            .rec
              padding 0 6px
              font-size 9px
              border 1px solid rgba(7, 17, 27, 0.1)
              border-radius 1px
              color rgb(147, 153, 159)
              background #fff
          .time
            position absolute
            top 0
            right 0
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
</style>
