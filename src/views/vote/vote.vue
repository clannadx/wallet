<template>
  <div class="vote">
    <a-tabs defaultActiveKey="1" >
      <a-tab-pane tab="应用列表" key="1">
          <local></local>
      </a-tab-pane>
      <a-tab-pane tab="已安装" key="2" forceRender>
      </a-tab-pane>
      <a-tab-pane tab="已安装" key="3" forceRender>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import Local from '@/components/local/local'

export default {
  data () {
    return {}
  },
  components: {
    Local
  }
}
</script>
<style lang="less" scoped>
.vote{
  background: #fff;
  border-radius: 2px;
}
</style>
