<template>
  <div class="transfer">
    <a-form :autoFormCreate="(form)=>{this.form = form}">
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      label='发送者'
      fieldDecoratorId="接收者"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入发送者地址' }]}">
      <a-input placeholder="请输入发送者地址" />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      label='接收者'
      fieldDecoratorId="接收者"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入接收者地址' }]}">
      <a-input placeholder='请输入接收者地址'  />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      label='金额'
      fieldDecoratorId="金额"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入转账金额' }]}">
      <a-input placeholder='请输入转账金额' addonAfter="ETM" />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      label='费用'>
      <a-input   addonAfter="ETM"/>
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      label='备注'>
      <a-input placeholder='请输入备注' />
      </a-form-item>
      <a-form-item
      :wrapperCol="{ span: 12, offset: 2 }">
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
        md: {span: 3},
        lg: {span: 2}
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
  .transfer{
    background: #fff;
    border-radius: 2px;
    padding: 18px 10px;
  }
</style>
