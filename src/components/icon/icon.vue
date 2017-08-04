<template>
  <span :class="iconType">
    <span class="icon" :class="classMap"></span>
  </span>
</template>

<script type="text/ecmascript-6">
export default{
    props:{
      size:{
        type: String,
      },
      classMap:{
        type:String,
      }
    },
  computed:{
    iconType(){
      return 'icon-'+ this.size;
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .icon-12-1
    .icon
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
        bg-size(12px,12px)
  .icon-12-3
    .icon
      display inline-block
      width 12px
      height 12px
      vertical-align top
      &.decrease
        bg-img('decrease_3')
        bg-size(12px,12px)
      &.discount
        bg-img('discount_3')
        bg-size(12px,12px)
      &.guarantee
        bg-img('guarantee_3')
        bg-size(12px,12px)
      &.invoice
        bg-img('invoice_3')
        bg-size(12px,12px)
      &.special
        bg-img('special_3')
        bg-size(12px,12px)
  .icon-16-2
    .icon
      display inline-block
      width 16px
      height 16px
      margin-right 6px
      vertical-align top
      &.decrease
        bg-img('decrease_2')
        bg-size(16px,16px)
      &.discount
        bg-img('discount_2')
        bg-size(16px,16px)
      &.guarantee
        bg-img('guarantee_2')
        bg-size(16px,16px)
      &.invoice
        bg-img('invoice_2')
        bg-size(16px,16px)
      &.special
        bg-img('special_2')
        bg-size(16px,16px)
  .icon-16-3
    .icon
      display inline-block
      width 16px
      height 16px
      vertical-align top
      &.decrease
        bg-img('decrease_3')
        bg-size(16px,16px)
      &.discount
        bg-img('discount_3')
        bg-size(16px,16px)
      &.guarantee
        bg-img('guarantee_3')
        bg-size(16px,16px)
      &.invoice
        bg-img('invoice_3')
        bg-size(16px,16px)
      &.special
        bg-img('special_3')
        bg-size(16px,16px)

</style>
