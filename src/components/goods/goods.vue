<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="item.type" class="menu-item" :class="{ active: currentIndex===index}"
            @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <icon :size="size.size3" v-show="item.type > 0" :classMap="classMap[item.type]"></icon>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods-wrapper">
      <ul>
        <li v-for="item in goods" :key="item.name" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="food in item.foods" :key="food.icon" class="foods-item border-1px">
              <div class="icon">
                <img width="100%" height="100%" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span style="margin-right: 12px">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="control-wrapper">
                  <cart-control @add="addFoods" :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
               :min-price="seller.minPrice"></shop-cart>
    <food @add="addFoods" :food="selectedFood" ref="food"></food>
  </div>

</template>

<script>
  import icon from 'components/icon/icon'
  import BScroll from 'better-scroll'
  import shopCart from 'components/shopcart/shopcart'
  import cartControl from 'components/cartcontrol/cartcontrol'
  import food from 'components/food/food'
  export default{
    components: {
      icon,
      shopCart,
      cartControl,
      food
    },
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        goods: [],
        listHeight: [],//食物区高度区间
        scrollY: 0,//食物区滚动的Y轴距离
        selectedFood:{}//点击选中某个食物的详情数据
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      this.size = {
        size3: 12 + '-3',
      };
      this.$http.get('/api/goods').then((res) => {
        res = res.data;
        if (res.errno === 0) {
          this.goods = res.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
       console.log(this.goods)
        }
      });
    },
    computed: {
      currentIndex() {//计算滚动高度落在滚动区间的索引值
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods () {//获取所有所购买食品的数组
        let foods = [];
        this.goods.forEach((item) => {
          item.foods.forEach((arr) => {
            if (arr.count) {
              foods.push(arr)
            }
          })
        });
        return foods;
      },
    },
    methods: {
      selectMenu (index, $event) {//选择食物列表菜单
        if (!$event._constructed) {//Better-scroll插件派发的事件时event_constructed为true
          return;
        }
        let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodSroll.scrollToElement(el, 500);
      },
      selectFood (food,$event) {
        if (!$event._constructed) {//Better-scroll插件派发的事件时event_constructed为true
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show()
      },
      addFoods (event) {
        // 先执行完按钮的动画,再异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(event.target)
        })
      },
      _initScroll () {//better-scroll插件实例化
        this.menuSroll = new BScroll(this.$refs['menu-wrapper'], {
          click: true
        });
        this.foodSroll = new BScroll(this.$refs['foods-wrapper'], {
          click: true,
          probeType: 3
        });
        this.foodSroll.on('scroll', (pos) => {//监听滚动事件并计算滚动高度
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight () {//计算食物列表的高度区间
        let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight;
          this.listHeight.push(height)
        }
      }
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display flex
    position absolute
    width 100%
    top 174px
    left 0
    bottom 46px
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        .text
          display table-cell
          font-size 12px
          width 56px
          vertical-align middle
          border-1px(rgba(7, 17, 27, 0.1))
        &.active
          position relative
          z-index 10
          margin-top -1px
          font-weight 700
          background #fff
          .text
            border-none()
    .foods-wrapper
      flex 1
      .title
        width 100%
        height 26px
        line-height 26px
        padding-left 14px
        font-size 12px
        border-left 2px solid #d9dde1
        color rgb(147, 153, 159)
        background #f3f5f7
      .foods-item
        display flex
        border-1px(rgba(7, 17, 27, 0.1))
        margin 18px 18px 0 18px
        padding-bottom 18px
        &:last-child
          border-none()
        .icon
          width 57px
          height 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px
            line-height 14px
            color rgb(7, 17, 27)
            font-size 14px
          .desc, .extra
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
          .desc
            margin-bottom 8px
          .price
            font-weight 700
            line-height 24px
            font-size 0
            .now
              font-size 14px
              margin-right 8px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)
          .control-wrapper
            position absolute
            right 0
            bottom 12px
</style>

