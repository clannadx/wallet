<template>
  <div class="block-appear">
    <!-- info -->
    <a-row class="name" type="flex" justify="start" align="middle" >
      <a-col :xs="24" :sm="8" :md="8" :lg="5" :xl="3">受托人基本信息</a-col>
      <a-col :xs="24" :sm="6" :md="6" :lg="3" :xl="2"> <a-button size="large" type="primary">{{onOff}}</a-button></a-col>
      <a-col :xs="24" :sm="6" :md="6" :lg="3" :xl="2"> <a-button size="large" @click="() => modal1Visible = true" type="primary">注册受托人</a-button></a-col>
    </a-row>
    <div class="info">
      <a-row class="etm-info" type="flex" justify="space-around" align="middle">
          <a-col class="etm-info-li" :span="6">
            <p>总收益</p>
            <p>{{delegateInfo.rewards}}</p>
          </a-col>
          <a-col class="etm-info-li" :span="6">
            <p>排名</p>
            <p>{{delegateInfo.rate}}</p>
          </a-col>
          <a-col class="etm-info-li" :span="6">
            <p>生产率</p>
            <p>{{delegateInfo.productivity}}</p>
          </a-col>
          <a-col class="etm-info-li last" :span="6">
            <p>得票率</p>
            <p>{{delegateInfo.approval}}</p>
          </a-col>
    </a-row>
    </div>
    <div class="production">
      <p>生产的区块</p>
      <div class="table">
        <div>
          <a-table :columns="columns"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          :scroll="{ x: 1300 }"
          :dataSource="data" bordered>
          <template slot="time" slot-scope="text, record">
            {{convertTime(record.timestamp)}}
          </template>
          </a-table>
        </div>
         <no-data v-show="nodata" ></no-data>
        </div>
    </div>
    <a-modal
      title="注册为受托人"
      centered
      v-model="modal1Visible"
    >
      <div>
        <a-form :autoFormCreate="(form)=>{this.form = form}">
          <a-form-item
           label='受托人名称'
          :labelCol="{ span: 5 }"
          :wrapperCol="{ span: 16 }"
          fieldDecoratorId="受托人名称"
          destroyOnClose
          :fieldDecoratorOptions="{rules: [{ required: true, message: '用户名不能为空' }]}"
          >
            <a-input type="text" v-model="delegateName" placeholder="用户名只能包含除了@$&_的字母、数字、字符" />
          </a-form-item>
          <a-form-item
          label='注意'
          :labelCol="{ span: 5 }"
          >
          注册需支付100 ETM
          </a-form-item>
        </a-form>
      </div>
      <template slot="footer" class="foot">
        <div class="foot">
          <a-button  type="primary" @click="handleOk">
            提交
          </a-button>
        </div>
      </template>
    </a-modal>
    <a-modal
      title="请输入二级密码"
      centered
      destroyOnClose
      v-model="modal2Visible"
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
import noData from '@/components/nodata/nodata'
import { getDelegate, setDelegate, blocks } from '@/api/block'
import { convertTime } from '@/utils/gen'
import {mapState} from 'vuex'
const columns = [{
  title: '高度',
  width: 100,
  dataIndex: 'height',
  fixed: 'left'
}, {
  title: '日期',
  dataIndex: 'timestamp',
  scopedSlots: {customRender: 'time'}
}, {
  title: 'ID',
  dataIndex: 'id'
}, {
  title: '交易',
  dataIndex: 'numberOfTransactions'
}, {
  title: '金额',
  dataIndex: 'totalAmount'
}, {
  title: '费用',
  dataIndex: 'totalFee'
}, {
  title: '奖励',
  dataIndex: 'reward'
}]
export default {
  data () {
    return {
      onOff: '未开启',
      delegateInfo: {},
      data: [],
      columns,
      pagination: {
        defaultPageSize: 10 // 每页个数
      },
      loading: false,
      nodata: false,
      height: '', // 查询高度
      detailHeight: '',
      blockDetail: {},
      convertTime: convertTime,
      modal1Visible: false,
      modal2Visible: false,
      delegateName: '',
      secondSecret: '' // 二级密码
    }
  },
  created () {
    this._getDelegateDetail()
    console.log(this.balance)
  },
  computed: {
    ...mapState({
      secondSignature: state => state.user.accountInfo.secondSignature,
      secret: state => state.user.secret,
      balance: state => state.user.accountInfo.balance
    }),
    publicKey () {
      const data = JSON.parse(sessionStorage.getItem('etmUse')).account.publicKey
      return this.$store.state.user.accountInfo.publicKey || data
    }
  },
  methods: {
    handleOk () {
      this.form.validateFields(
        (err) => {
          if (!err) {
            if (this.balance < 100) {
              this.$notification.info({
                message: '提示',
                description: '余额不足'
              })
            } else if (this.secondSignature) {
              this.modal1Visible = false
              this.modal2Visible = true
            } else {
              this._setDelegate()
            }
          }
        }
      )
    },
    handleSecondOk () { // 二级密码
      this.form.validateFields(
        (err) => {
          if (!err) {
            this._setDelegate()
          }
        }
      )
    },
    async _setDelegate () {
      try {
        const params = {
          secret: this.secret,
          username: this.delegateName
        }
        if (this.secondSignature) {
          params.secondSecret = this.secondSecret
        }
        const res = await setDelegate(params)
        if (res.data.success) {
          this.modal2Visible = false
          this.$notification.info({
            message: '提示',
            description: '注册成功'
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    async _getDelegateDetail (params = {publicKey: this.publicKey}) {
      try {
        const result = await getDelegate(params)
        if (result.data.success) {
          this.onOff = '已开启'
          this.delegateInfo = result.data.delegate
          this._getTableLists()
        } else {
          this.onOff = '未开启'
          this.nodata = true
        }
      } catch (err) {
        console.log(err)
      }
    },
    async _getTableLists (params = {generatorPublicKey: this.publicKey, limit: 10, orderBy: 'height:desc'}) {
      this.loading = true
      const result = await blocks(params)
      console.log(result, 'block')
      if (result.data.success) {
        if (result.data.count === 0) {
          this.nodata = true
        }
        this.loading = false
        this.data = result.data.blocks
        const pagination = { ...this.pagination }
        pagination.total = result.data.count
        this.pagination = pagination
      }
    },
    handleTableChange (pagination) {
      const pager = {...this.pagination}
      pager.current = pagination.current
      this.pagination = pager
      this._getTableLists({
        generatorPublicKey: this.publicKey,
        limit: pagination.pageSize,
        offset: pagination.pageSize * (pagination.current - 1),
        orderBy: 'height:desc'
      })
    }
  },
  components: {
    'no-data': noData
  }
}
</script>
<style lang="less" scoped>
.block-appear{
  padding:20px;
  .name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .info{
    .etm-info {
      background-color: #fff;
      padding: 20px 0;
      text-align: center;
      .etm-info-li {
        p {
          border-right: 1px solid #e9e9e9;
          margin: 0;
        }
        p:first-child {
          color: #8d8d8d;
          font-size: 14px;
        }
        p:last-child {
          color: #4b4b4b;
          font-size: 24px;
        }
      }
    .last {
      p {
        border: none;
      }
    }
    }
  }
  .production{
    margin: 20px 0;
    p{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    }
    .table{
      background: #fff;
      border-radius: 2px;
      padding:10px;
      position: relative;
    }
  }
.foot {
    text-align: center!important;
}
}
</style>
