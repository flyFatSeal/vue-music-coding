<template>
  <div class="singer" ref="singer">
    <list-view :data="singers">
    </list-view>
  </div>
</template>

<script>
  import {ERR_OK} from 'api/config'
  import {getSingerList} from 'api/singer'
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'
  const HotName = '热门'
  const HotLength = 10
  export default {
    data () {
      return {
        singers: []
      }
    },
    components: {
      ListView
    },
    created () {
      this._getSingerList()
    },
    methods: {
      _getSingerList () {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            const data = res.data
            this.singers = data.list
            this.singers = this._normalizeSinger(this.singers)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HotName,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HotLength) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HotName) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
