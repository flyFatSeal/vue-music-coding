<template>
  <transition v-show="showLyric">
    <div>
      <slot></slot>
    </div>
  </transition> 
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Fade',
    props: {
      showLyric: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .v-enter, .v-leave-to
    opacity:0
  .v-enter-active, .v-leave-active
    transition: all 0.5s
</style>