<template>
  <div class="application">
    <a-tabs defaultActiveKey="1" >
      <a-tab-pane tab="应用列表" key="1">
        <div class="tab">
          <no-data v-show="!tableData.length"></no-data>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="已安装" key="2" forceRender>
        <div class="tab">
          <no-data v-show="!tableData.length"></no-data>
        </div>
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
  background: #fff;
  padding: 10px;
  min-height: 600px;
  .tab{
  position: relative;
  height: 500px;
  }
}
</style>
