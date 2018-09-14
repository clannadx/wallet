<template>
  <div class="second-password">
    <a-form :autoFormCreate="(form)=>{this.form = form}">
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      label='密码'
      fieldDecoratorId="密码"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入字母和数字组合,最短为1，最长为100',whitespace: true }]}">
      <a-input type="password" v-model="secondSecret" placeholder="请输入字母和数字组合,最短为1，最长为100" />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      label='确认密码'
      fieldDecoratorId="确认密码"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请再次输入',whitespace: true }]}">
      <a-input type="password" v-model="confirmSecondSecret" placeholder="请再次输入" />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      label='注意'
      >
      请确认您已经安全保存了二级密码，一旦丢失，您在 ETM 系统中的财产将无法找回，设置二级密码需要 5ETM 手续费
      </a-form-item>
      <a-form-item
      :wrapperCol="{ span: 12, offset: 2 }">
      <a-button @click="check" type='primary' htmlType='submit'>
        提交
      </a-button>
    </a-form-item>
    </a-form>
  </div>
</template>
<script>
import {setSecondSecret} from '@/api/account'
export default {
  data () {
    return {
      form: null,
      secondSecret: '',
      confirmSecondSecret: '',
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
        lg: {span: 8}

      }
    }
  },
  mounted () {

  },
  methods: {
    check () {
      this.form.validateFields(
        (err) => {
          if (!err) {
            if (this.secondSecret !== this.confirmSecondSecret) {
              this.$notification.info({
                message: '提示',
                description: '两次密码不一致'
              })
            } else {
              this.setSecondSecret()
            }
            console.info('success')
          }
        }
      )
    },
    async setSecondSecret () {
      const secret = 'someone manual strong movie roof episode eight spatial brown soldier soup motor'
      const result = await setSecondSecret(secret, this.secondSecret)
      console.log(result)
      if (result.data.success) {
        this.$notification.info({
          message: '提示',
          description: '设置成功'
        })
      }
    }

  }
}
</script>
<style lang="less" scoped>
.second-password{
  margin-top: 20px;
}
</style>
