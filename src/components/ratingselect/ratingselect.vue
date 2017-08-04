<template>
  <div class="ratingselect">
    <div class="ratingType">
      <span class="block all" @click="select(2,$event)" :class="{active:selectType===2}">{{desc.all}}<span
        class="count">{{ratingLength}}</span></span>
      <span class="block positive" @click="select(0,$event)" :class="{active:selectType===0}">{{desc.positive}}<span
        class="count">{{positivesLength}}</span></span>
      <span class="block negative" @click="select(1,$event)" :class="{active:selectType===1}">{{desc.negative}}<span
        class="count">{{negativesLength}}</span></span>
    </div>
    <div class="switch" :class="{on:onlyContent}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {//是否只查看有内容的
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    data() {
      return {}
    },
    beforeUpdate() {
      console.log(this.ratings)
    },
    computed: {
      ratingLength () {
        return this.ratings.length;
      },
      positivesLength () {
        let positives = this.ratings.filter((item) => {
          return item.rateType === POSITIVE
        });
        return positives.length;
      },
      negativesLength () {
        let negatives = this.ratings.filter((item) => {
          return item.rateType === NEGATIVE
        });
        return negatives.length;
      },
    },
    methods: {
      select(type, e) {
        if (!e._constructed) {
          return;
        }
        this.$emit('select', type);
      },
      toggleContent(e) {
        if (!e._constructed) {
          return;
        }
        this.$emit('toggle-content', this.onlyContent);
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    padding 0 18px
    border-1px(rgba(7, 17, 27, 0.1))
    .ratingType
      padding 18px 0
      font-size 0
      border-1px(rgba(7, 17, 27, 0.1))
      .block
        padding 8px 12px
        line-height 16px
        border-radius 2px
        font-size 12px
        color rgb(77, 85, 93)
        .count
          font-size 8px
          margin-left 3px
        &.active
          color #fff
      .all
        background rgba(0, 160, 220, 0.2)
        &.active
          background rgb(0, 160, 220)
      .positive
        margin 0 8px
        background rgba(0, 160, 220, 0.2)
        &.active
          background rgb(0, 160, 220)
      .negative
        background rgba(77, 85, 93, 0.2)
        &.active
          background rgb(77, 85, 93)
    .switch
      padding 12px 0
      font-size 0
      span
        line-height 24px
        font-size 12px
        color rgb(147, 153, 159)
        vertical-align middle
      .icon-check_circle
        color rgb(147, 153, 159)
        font-size 24px
        margin-right 4px
      &.on
        .icon-check_circle
          color #00c850
</style>
