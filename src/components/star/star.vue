<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="item in itemClasses" :class="item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default{
    props:{
      size:{
        type: Number,
      },
      score:{
        type: Number,
      }
    },
    computed:{
      starType(){
          return 'star-'+ this.size;
      },
      itemClasses(){
          let result = [];
          let score = Math.floor(this.score*2)/2;
          let hasDecimal = score % 1 !== 0;
          let integer = Math.floor(this.score);
          for(let i=0;i<integer;i++){
              result.push(CLS_ON)
          }
          if(hasDecimal){
              result.push(CLS_HALF)
          }
          while(result.length < LENGTH){
              result.push(CLS_OFF)
          }
          return result;
      },
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    .star-item
      display inline-block
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        &:last-child
          margin-right 0
        &.on
          bg-img('star48_on')
          bg-size(20px,20px)
        &.half
          bg-img('star48_half')
          bg-size(20px,20px)
        &.off
          bg-img('star48_off')
          bg-size(20px,20px)
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        &:last-child
          margin-right 0
        &.on
          bg-img('star36_on')
          bg-size(15px,15px)
        &.half
          bg-img('star36_half')
          bg-size(15px,15px)
        &.off
          bg-img('star36_off')
          bg-size(15px,15px)
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        &:last-child
          margin-right 0
        &.on
          bg-img('star24_on')
          bg-size(10px,10px)
        &.half
          bg-img('star24_half')
          bg-size(10px,10px)
        &.off
          bg-img('star24_off')
          bg-size(10px,10px)
</style>
