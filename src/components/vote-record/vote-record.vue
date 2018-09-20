<template>
  <div class="record">
    <a-row type="flex" justify="space-between" align="middle">
        <a-col class="count" >共 {{totalVoters}} 条</a-col>
        <a-col >
          <a-button class="refresh" type="primary" @click="refresh">刷新</a-button>
          <a-button type="primary" @click="deleteRecord" >删除</a-button>
          </a-col>
    </a-row>
    <div class="table">
      <div>
        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :columns="columns"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          ></a-table>
      </div>
        <no-data v-show="nodata"  ></no-data>
    </div>
    <pop-voted :modal1Visible.sync="modal1Visible" :selectedRows="selectedRows"  @handleOk="handleOk"></pop-voted>
    <pop-password :modal2Visible.sync="modal2Visible" @secondSubmit="secondSubmit"></pop-password>
  </div>
</template>
<script>
import {getRecord, submitVoter} from '@/api/account'
import {mapState} from 'vuex'
import PopPassword from '@/components/pop-password/pop-password'
import PopVoted from '@/components/pop-voted/pop-voted'
import noData from '@/components/nodata/nodata'

const columns = [{
  title: '排名',
  dataIndex: 'rate'
}, {
  title: '受托人',
  dataIndex: 'username'
}, {
  title: '地址',
  dataIndex: 'address'
}, {
  title: '生产率',
  dataIndex: 'productivity'
}, {
  title: '生产块数',
  dataIndex: 'producedblocks'
}, {
  title: '得票率',
  dataIndex: 'approval'
}]

export default {
  data () {
    return {
      data: [],
      columns,
      selectedRowKeys: [],
      selectedRows: [], // 选择的行
      totalVoters: 0,
      pagination: {
        defaultPageSize: 10 // 每页个数
      },
      selectRecord: [],
      loading: false,
      modal1Visible: false,
      modal2Visible: false,
      nodata: false
    }
  },
  created () {
    this._getRecord(0)
  },
  computed: {
    ...mapState({
      secret: state => state.user.secret,
      address: state => state.user.accountInfo.address,
      secondSignature: state => state.user.accountInfo.secondSignature,
      balance: state => state.user.accountInfo.balance
    }),
    cancelVote () {
      const cancel = []
      this.selectedRows.forEach((item) => {
        cancel.push('-' + item.publicKey)
      })
      return cancel
    }
  },
  methods: {
    refresh () {
      this.nodata = false
      this.selectedRowKeys = []
      this.selectedRows = []
      this._getRecord(this.pagination.current)
    },
    deleteRecord () {
      if (this.selectedRows.length === 0) {
        this.$notification.info({
          message: '提示',
          description: '请选择删除记录'
        })
      } else {
        this.modal1Visible = true
      }
    },
    handleOk () {
      if (this.balance < 0.1) {
        this.$notification.info({
          message: '提示',
          description: '余额不足'
        })
      } else if (this.secondSignature) {
        this.modal1Visible = false
        this.modal2Visible = true
      } else {
        this._submitVoter()
      }
    },
    secondSubmit (secondSecret) {
      this._submitVoter({secret: this.secret, delegates: this.cancelVote, secondSecret: secondSecret})
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    async _submitVoter (params = {secret: this.secret, delegates: this.cancelVote}) {
      const result = await submitVoter(params)
      if (result.data.success) {
        this.$notification.info({
          message: '提示',
          description: '删除成功'
        })
        this.modal1Visible = false
        this.modal2Visible = false
        this.selectedRowKeys = []
        this.selectedRows = []
        setTimeout(() => {
          this._getRecord(this.pagination.current)
        }, 4000)
      }
    },
    async _getRecord (p) {
      try {
        const params = {address: this.address}
        this.loading = true
        const result = await getRecord(params)
        if (result.data.success) {
          this.loading = false
          this.totalVoters = result.data.delegates.length
          if (this.totalVoters === 0) {
            this.nodata = true
          }
          this.data = result.data.delegates.slice(
            this.pagination.defaultPageSize * p,
            this.pagination.defaultPageSize * p + 10

          )
          const pagination = { ...this.pagination }
          pagination.total = result.data.delegates.length
          pagination.current = p
          this.pagination = pagination
        }
      } catch (err) {
        console.log(err)
      }
    },
    handleTableChange (pagination) {
      this._getRecord(pagination.current - 1)
      this.selectedRowKeys = []
      this.selectedRows = []
    }
  },
  components: {
    'pop-password': PopPassword,
    'pop-voted': PopVoted,
    noData
  }
}
</script>
<style lang="less" scoped>
.record{
  min-height: 600px;
  .refresh{
    margin-right: 10px;
  }
  .count{
    font-size: 18px;
    padding-left: 15px;
  }
  .table{
    margin-top: 20px;
    position: relative;
  }
}

</style>
