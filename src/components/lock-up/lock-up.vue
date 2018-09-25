<template>
  <div class="lock-up">
    <a-form :autoFormCreate="(form) =>{this.form = form}">
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :label="$t('lock_up.lockedHeight.label')"
      :fieldDecoratorId="$t('lock_up.lockedHeight.label')"
      :fieldDecoratorOptions="{rules: [{ required: true, message: $t('lock_up.lockedHeight.msg') }]}">
      <a-input :placeholder="$t('lock_up.lockedHeight.msg')" />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :label="$t('lock_up.note')">
      {{$t("lock_up.p")}}
      </a-form-item>
      <a-form-item
      :wrapperCol="{ span: 12, offset: 4 }">
      <a-button @click="check" type='primary' htmlType='submit'>
        {{$t("lock_up.submitBtn")}}
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
