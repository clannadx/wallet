<template>
  <a-modal
  title="请输入二级密码"
  centered
  destroyOnClose
  v-model="modal2Visible"
  @cancel="handleCancel"
>
    <a-form :autoFormCreate="(form)=>{this.form = form}">
      <a-form-item
        label='二级密码'
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 16 }"
      fieldDecoratorId="二级密码"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '二级密码不能为空' }]}"
      >
        <a-input type="password" v-model="secondSecret" placeholder="请输入二级密码" />
      </a-form-item>
    </a-form>
  <template slot="footer">
    <div class="foot">
      <a-button  type="primary" @click="handleSecondOk">
        提交
      </a-button>
    </div>
  </template>
</a-modal>
</template>

<script>
export default {
  props: {
    modal2Visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      secondSecret: ''
    }
  },
  methods: {
    handleSecondOk () {
      this.$emit('secondSubmit', this.secondSecret)
    },
    handleCancel () {
      console.log(2)
      this.modal2Visible = false
      this.$emit('update:modal2Visible', false)
    }
  }
}
</script>
<style>

</style>
