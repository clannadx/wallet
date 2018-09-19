<template>
      <a-modal
      title="取消投票"
      v-model="modal1Visible"
      destroyOnClose
      @cancel="aaa"
  >
      <div class="input-list">
        <div class="input-line" v-for="(item,index) in selectedRows" :key="index">
          <div class="input clearfix">
          <span class="fl">{{item.username}}</span>
          <span class="gre fr">{{item.address}}</span>
          </div>
        </div>
      </div>
      <template slot="footer" >
        <div class="foot">
          <a-button  type="primary" @click="handleOk">
            提交
          </a-button>
        </div>
      </template>
  </a-modal>
</template>
<script>
export default {
  props: {
    modal1Visible: {
      type: Boolean,
      default: false
    },
    selectedRows: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      aaaa: this.modal1Visible
    }
  },
  methods: {
    handleOk () {
      this.$emit('handleOk')
    },
    aaa () {
      console.log(this.modal1Visible)
      // this.$emit('hidden1')
    }
  }
}
</script>
<style lang="less" scoped>
.input-list {
  max-height: 260px;
  overflow: auto;
  .input-line {
    text-align: center;
    }
}
.foot{
  text-align: center;
}
</style>
