<template>
  <div>
    2
  <a-locale-provider :locale="en_GB">
    <a-pagination :defaultCurrent="1" :total="50" showSizeChanger />
  </a-locale-provider>
  <div class="example">
          <a-select showSearch style="width: 200px">
            <a-select-option value="jack">jack</a-select-option>
            <a-select-option value="lucy">lucy</a-select-option>
          </a-select>
          <a-date-picker />
          <a-time-picker />
          <a-range-picker style=" width: 200px " />
        </div>
  </div>
</template>
<script>
import en_GB from 'ant-design-vue/lib/locale-provider/en_GB'
// import 'moment/locale/zh-cn'
export default {
  data () {
    return {
      en_GB
    }
  }
}
</script>
<style>

</style>
