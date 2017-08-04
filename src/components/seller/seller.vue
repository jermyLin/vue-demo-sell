<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="name">{{seller.name}}</h1>
        <div class="desc">
          <star class="star" :size="36" :score="seller.score"></star>
          <span class="text">（{{seller.ratingCount}}）</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">{{seller.minPrice}}<span class="unit">元</span></div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">{{seller.deliveryPrice}}<span class="unit">元</span></div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">{{seller.deliveryTime}}<span class="unit">分钟</span></div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{active:favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin-wrapper">
        <div class="intro">
          <div class="title">公告与活动</div>
          <p class="text">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li class="supports-item" v-for="(item , index) in seller.supports">
            <icon class="icon" :size="size.size3" :classMap="classMap[index]"></icon>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="photos">
        <h1 class="title">商家实景</h1>
        <div class="photo-wrapper" ref="photoWrapper">
          <ul class="photo-list" :style="{width:photosWidth}">
            <li class="photo-item" v-for="item in seller.pics">
              <img width="120" height="90" :src="item" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="content" v-for="item in seller.infos">
            <span>{{item}}</span>
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
  import icon from 'components/icon/icon';
  import {saveToLocal,loadFromLocal} from 'common/js/store'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split,
      BScroll,
      icon
    },
    data() {
      return {
        favorite: (()=>{
          return loadFromLocal(this.seller.id,'favorite',false)
        })()
      }
    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics()
        });
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      this.size = {
        size3: 16 + '-3',
      };
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    },
    computed: {
      photosWidth() {
        if (this.seller.pics) {
          let photoWidth = 120;
          let margin = 6;
          let pw = (photoWidth + margin) * this.seller.pics.length - margin + 'px';
          return pw;
        }
      },
      favoriteText() {
        return this.favorite === true ? '已收藏' : '收藏';
      },
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (!this.photoScroll) {
          this.photoScroll = new BScroll(this.$refs.photoWrapper, {
            scrollX: true,
            eventPassthrough: 'vertical'
          });
        } else {
          this.photoScroll.refresh();
        }
      },
      toggleFavorite (e) {
        if(!e._constructed){
          return;
        }
        this.favorite = ! this.favorite;
        saveToLocal(this.seller.id,'favorite',this.favorite)
      },
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position absolute
    top 174px
    left 0
    bottom 0
    width 100%
    overflow hidden
    .overview
      position relative
      padding 18px
      .name
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
        margin-bottom 8px
      .desc
        padding-bottom 18px
        font-size 0
        border-1px(rgba(7, 17, 27, 0.1))
        .star
          display inline-block
          margin-right 8px
          vertical-align top
        .text
          line-height 18px
          font-size 10px
          color rgb(77, 85, 93)
          margin-right 12px
      .remark
        display flex
        padding 18px 0
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border 0
          .title
            line-height 10px
            font-size 12px
            color rgb(147, 153, 159)
            margin-bottom 4px
          .content
            line-height 24px
            font-size 24px
            color rgb(7, 17, 27)
            .unit
              font-size 10px
      .favorite
        position absolute
        width 50px
        font-size 0
        top 18px
        right 11px
        text-align center
        .icon-favorite
          display block
          line-height 24px
          font-size 24px
          color #d4d6d9
          margin-bottom 4px
          &.active
            color rgb(240,20,20)
        .text
          line-height 10px
          font-size 10px
          color rgb(77,85,93)
    .bulletin-wrapper
      padding 0 18px
      .intro
        padding 18px 0 16px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .title
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
          margin-bottom 8px
        .text
          padding 0 12px
          line-height 24px
          font-size 12px
          color rgb(240, 20, 20)
      .supports
        .supports-item
          padding 16px 12px
          border-1px(rgba(7, 17, 27, 0.1))
          font-size 0
          &:last-child
            border-none()
          .icon, .text
            display inline-block
            vertical-align top
          .text
            line-height 16px
            font-size 12px
            color rgb(7, 17, 27)
            margin-left 6px
    .photos
      padding 18px
      .title
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
        margin-bottom 12px
      .photo-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .photo-list
          font-size 0
          .photo-item
            display inline-block
            width 120px
            height 90px
            margin-right 6px
            &:last-child
              margin-right 0
    .info
      padding 0 18px
      .title
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
        padding 18px 0 12px 0
      .content
        padding 16px 12px
        line-height 16px
        font-size 12px
        color rgb(7, 17, 27)
        border-top-1px(rgba(7, 17, 27, 0.1))
</style>
