<template>
  <div class="lock-up">
    <a-form :autoFormCreate="(form) =>{this.form = form}">
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      label='请输入锁仓高度值'
      fieldDecoratorId="请输入锁仓高度值"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入锁仓高度值' }]}">
      <a-input placeholder="请输入锁仓高度值" />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      label='注意'>
      在到达此高度后才能解锁
      </a-form-item>
      <a-form-item
      :wrapperCol="{ span: 12, offset: 4 }">
      <a-button @click="check" type='primary' htmlType='submit'>
        发送
      </a-button>
    </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
        md: {span: 6},
        lg: {span: 4}
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: {span: 8},
        lg: {span: 6}

      }
    }
  },
  methods: {
    check () {
      this.form.validateFields(
        (err) => {
          if (!err) {
            console.info('success')
          }
        }
      )
    }
  }
}
</script>
<style lang="less" scoped>
  .lock-up{
    margin-top: 20px;
  }
</style>
