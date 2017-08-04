<template>
  <div>
    <div class="shop-cart">
      <div class="content">
        <div class="content-left" @click="toggleList">
          <div class="logo-wrapper">
            <div class="logo" :class="{highLight:totalCount>0}">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highLight:totalCount>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click="pay">
          <div :class="{enough:totalPrice>=minPrice}" class="pay">
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-wrapper">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="isShowList">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="emptyFoods">清空</span>
          </div>
          <div class="list-detail" ref="list-content">
            <ul>
              <li v-for="item in selectFoods" class="list-item">
                <span class="name">{{item.name}}</span>
                <span class="price">￥{{item.price * item.count}}</span>
                <cart-control @add="addFoods" :food="item"></cart-control>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="backIn" v-show="isShowList" @click="toggleList"></div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import cartControl from 'components/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
export default {
  components: {
    cartControl,
    BScroll
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 10,
            count: 1
          }
        ]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
      ],
      dropBalls: [],
      fold: false
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      //        console.log(this.selectFoods);
      this.selectFoods.forEach((item) => {
        total += item.price * item.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((item) => {
        count += item.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}起送`;
      } else {
        return '去结算';
      }
    },
    isShowList() {
      if (!this.totalCount) {
        this.fold = false;
        return false;
      } else {
        let isShow = this.fold;
        if (isShow) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs['list-content'], {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return isShow
      }
    },

  },
  methods: {
    //      drop (el) {
    //        console.log(el);
    //        this.balls.forEach((arr) => {
    //          if (!arr.show) {
    //            arr.show = true;
    //            arr.el = el;
    //            this.dropBalls.push(arr);
    //            return;
    //          }
    //        });
    //      },
    drop(el) {//与上面forEach对比，for的执行效率更高
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          //            console.log(x);
          //            console.log(y);
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    dropping(el, done) {
      //        console.log(done);
      let rf = el.clientHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        el.addEventListener('transitionend', done);
      });
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return false;
      } else {
        this.fold = !this.fold
      }
    },
    addFoods(event) {
      console.log(event);
      this.drop(event.target)
    },
    emptyFoods() {
      this.selectFoods.forEach((item) => {
        item.count = 0
      });
    },
    pay() {
      if (this.totalPrice >= this.minPrice) {
        window.alert(`总共￥${this.totalPrice}元，请选择支付方式`)
      }
    },
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shop-cart
    position fixed
    width 100%
    height 48px
    left 0
    bottom 0
    z-index 50
    .content
      display flex
      height 100%
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          vertical-align top
          .logo
            width 100%
            height 100%
            background #2b343c
            border-radius 50%
            text-align center
            .icon-shopping_cart
              font-size 24px
              line-height 44px
            &.highLight
              background #00a0dc
              .icon-shopping_cart
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            line-height 16px
            font-size 10px
            text-align center
            border-radius 16px
            color #fff
            background red
            z-index 50
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          font-size 16px
          line-height 24px
          margin-top 12px
          font-weight 700
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, 0.1)
          &.highLight
            color #fff
        .desc
          display inline-block
          font-size 12px
          line-height 24px
          margin 12px 0 0 12px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          background #2b333b
          font-weight 700
          font-size 12px
          &.enough
            background #00b43c
            color #fff
    .ball-wrapper
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition: all 0.5s cubic-bezier(.21, -0.5, .83, .46)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background rgb(0, 160, 220)
          transition: all 0.5s linear
    .shopcart-list
      position absolute
      top 0
      left 0
      width 100%
      z-index -1
      background #fff
      transform translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        width 100%
        height 40px
        line-height 40px
        padding 0 18px
        box-sizing border-box
        background #f3f5f7
        border-bottom 1px solid rgba(7,17,27,0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)
      .list-detail
        width 100%
        max-height 200px
        padding 0 18px
        box-sizing border-box
        overflow hidden
        .list-item
          display flex
          width 100%
          height 24px
          padding 12px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            flex 1
            font-size 14px
            line-height 24px
            color rgb(7, 17, 27)
            vertical-align middle
          .price
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
            line-height 24px
            margin 0 12px 0 18px
          .cart-control
            font-size 0
            .cart-decrease, .cart-add
              padding 0
            .cart-count
              padding 0

  .backIn
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    z-index 40
    backdrop-filter blur(10px)
    background rgba(7,17,27,0.6)
</style>
