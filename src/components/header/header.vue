<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <!--<span class="icon" :class="classMap[seller.supports[0].type]"></span>-->
          <icon :size="size.size1" :classMap="classMap[seller.supports[0].type]"></icon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supports-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="isShowDetail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="supports-item" v-for="(item , index) in seller.supports">
                <!--<span class="icon" :classMap="classMap[seller.supports[index].type]"></span>-->
                <icon :size="size.size2" :classMap="classMap[index]"></icon>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import icon from 'components/icon/icon';
  export default {
    components:{
      star,
      icon
    },
    props:{
      seller:{
        type:Object,
        default: {}
      }
    },
    data (){
        return {
          isShowDetail:false
        }
    },
    created (){
      this.classMap = ['decrease','discount','guarantee','invoice','special'];
      this.size = {
          size1:12+'-1',
          size2 : 16+'-2'
      };
    },
    methods:{
      showDetail(){
          this.isShowDetail = true
      },
      closeDetail(){
          this.isShowDetail = false
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/animation.styl"
  .header
    position relative
    overflow hidden
    width 100%
    color #fff
    background rgba(7,17,27,0.5)
    .content-wrapper
      position relative
      font-size  0
      padding 24px 12px 18px 24px
      .avatar
        display inline-block
        margin-right 16px
        border-radius 2px
        overflow hidden
      .content
        display inline-block
        vertical-align top
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-img('brand')
            background-size 30px 18px
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold
        .description
          margin-bottom 10px
          font-size 12px
          line-height 12px
        .support
          /*.icon
            display inline-block
            width 12px
            height 12px
            margin-right 4px
            vertical-align top
            &.decrease
              bg-img('decrease_1')
              bg-size(12px,12px)
            &.discount
              bg-img('discount_1')
              bg-size(12px,12px)
            &.guarantee
              bg-img('guarantee_1')
              bg-size(12px,12px)
            &.invoice
              bg-img('invoice_1')
              bg-size(12px,12px)
            &.special
              bg-img('special_1')
              bg-size(12px,12px)*/
          .text
            display inline-block
            line-height 12px
            font-size 10px
      .supports-count
        position absolute
        right 12px
        bottom 14px
        padding 0 8px
        height 24px
        line-height 24px
        border-radius 14px
        background rgba(0,0,0,0.2)
        text-align center
        .count
          line-height 24px
          font-size 10px
          margin-right 2px
        .icon-keyboard_arrow_right
          font-size 10px
        .count,.icon-keyboard_arrow_right
          vertical-align middle
    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      background rgba(7,17,27,0.2)
      .bulletin-title
        display inline-block
        width 22px
        height 12px
        margin-top -2px
        bg-img('bulletin')
        bg-size(22px,12px)
      .bulletin-text
        line-height 28px
        font-size 10px
        margin 0 4px
      .bulletin-title,.bulletin-text
        vertical-align middle
      i
        position absolute
        font-size 10px
        right 12px
        top 9px
    .background
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      z-index 100
      background rgba(7,17,27,0.8)
      overflow auto
      .detail-wrapper
        min-height 100%
        width 100%
        .detail-main
          padding-bottom 64px
          margin-top 64px
          .name
            line-height 16px
            font-size 16px
            font-weight 700
            text-align center
          .star-wrapper
            margin-top 16px
            padding 2px 0
            text-align center
          .title
            display flex
            width 80%
            margin 28px auto 24px
            align-items center
            .line
              flex 1
              border-bottom 1px solid rgba(255,255,255,0.2)
            .text
              padding 0 12px
              font-size 14px
              font-weight 700
          .supports
            width 80%
            margin 0 auto
            .supports-item
              padding 0 12px
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 0
              /*.icon
                display inline-block
                width 16px
                height 16px
                margin-right 6px
                vertical-align top
                &.decrease
                  bg-img('decrease_1')
                  bg-size(16px,16px)
                &.discount
                  bg-img('discount_1')
                  bg-size(16px,16px)
                &.guarantee
                  bg-img('guarantee_1')
                  bg-size(16px,16px)
                &.invoice
                  bg-img('invoice_1')
                  bg-size(16px,16px)
                &.special
                  bg-img('special_1')
                  bg-size(16px,16px)*/
              .text
                display inline-block
                line-height 16px
                font-size 12px
          .bulletin
            width 80%
            margin 0 auto
            .content
              line-height 24px
              font-size 12px
              padding 0 12px
      .detail-close
          position relative
          width 32px
          height 32px
          margin -64px auto 0
          clear both
          i
            font-size 32px
</style>
