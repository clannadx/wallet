<template>
  <div class="vote">
    <a-tabs defaultActiveKey="1" >
      <a-tab-pane tab="应用列表" key="1">
      </a-tab-pane>
      <a-tab-pane tab="已安装" key="2" forceRender>
      </a-tab-pane>
      <a-tab-pane tab="已安装" key="3" forceRender>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
.vote{
  background: #fff;
  border-radius: 2px;
}
</style>
