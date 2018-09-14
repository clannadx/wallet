<template>
  <div class="application">
    <a-tabs defaultActiveKey="1" >
      <a-tab-pane tab="应用列表" key="1">
        <no-data v-show="!tableData.length"></no-data>
      </a-tab-pane>
      <a-tab-pane tab="已安装" key="2" forceRender>
        <no-data v-show="!tableData.length"></no-data>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import noData from '@/components/nodata/nodata'
export default {
  data () {
    return {
      tableData: []
    }
  },
  components: {
    'no-data': noData
  }
}
</script>
<style lang="less" scoped>
.application{
  background-color: #fff;
  border-radius: 2px;
}
</style>
