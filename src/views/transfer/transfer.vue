<template>
  <div class="transfer">
    <a-form :autoFormCreate="(form)=>{this.form = form}">
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      label='发送者'>
      <a-input v-model="address" disabled  placeholder="请输入发送者地址" />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      label='接收者'
      fieldDecoratorId="接收者"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入接收者地址' }]}">
      <a-input type="text"  v-model="recipientId" placeholder='请输入接收者地址'  />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      label='金额'
      fieldDecoratorId="金额"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入转账金额' }]}">
      <a-input type="number" v-model="amount" placeholder='请输入转账金额' addonAfter="ETM" />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      label='费用'>
      <a-input type="number" v-model="fee" disabled  addonAfter="ETM"/>
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      label='备注'>
      <a-input placeholder='请输入备注' />
      </a-form-item>
      <a-form-item
       :labelCol="labelCol"
       label="注意"
      >
      请确保您正在发送ETM给正确的地址，本操作无法撤消
      </a-form-item>
      <a-form-item
      :wrapperCol="{ span: 12, offset: 2 }">
      <a-button @click="check" type='primary' htmlType='submit'>
        发送
      </a-button>

    </a-form-item>

    </a-form>
    <a-modal
      title="请输入二级密码"
      centered
      destroyOnClose
      v-model="modalVisible"
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
      <template slot="footer" class="foot">
        <div class="foot">
          <a-button  type="primary" @click="handleSecondOk">
            提交
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {transactions} from '@/api/block'
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

      },
      secondSecret: '',
      recipientId: '',
      amount: '',
      fee: '0.1',
      modalVisible: false
    }
  },
  computed: {
    ...mapState({
      address: state => state.user.accountInfo.address || '',
      secret: state => state.user.secret || '',
      secondSignature: state => state.user.accountInfo.secondSignature || '',
      balance: state => state.user.accountInfo.balance || 0
    }),
    computedAmount () {
      return parseFloat(this.amount) * Math.pow(10, 8)
    }
  },
  methods: {
    check () {
      this.form.validateFields(
        (err) => {
          if (!err) {
            if (this.balance < 0.1) {
              this.$notification.info({
                message: '提示',
                description: '余额不足'
              })
            } else if (this.secondSignature) {
              this.modalVisible = true
            } else {
              this._transactions()
            }
          }
        }
      )
    },
    handleSecondOk () {
      this.form.validateFields(
        (err) => {
          if (!err) {
            this._transactions({secret: this.secret, recipientId: this.recipientId, amount: this.computedAmount, secondSecret: this.secondSecret})
          }
        }
      )
    },
    async _transactions (params = {secret: this.secret, recipientId: this.recipientId, amount: this.computedAmount}) {
      try {
        const result = await transactions(params)
        if (result.data.success) {
          this.modalVisible = false
          this.secondSecret = ''
          this.$notification.info({
            message: '提示',
            description: '交易成功'
          })
        }
      } catch (err) {
        console.log(err)
      }
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
