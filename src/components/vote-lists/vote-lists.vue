<template>
  <div class="vote-lists">
    <a-row type="flex" justify="space-between" align="middle">
        <a-col class="count" >共 {{filterDisabled.length}} 条</a-col>
        <a-col >
          <a-button class="refresh" type="primary" @click="refresh">刷新</a-button>
          <a-button type="primary" @click="vote" >投票</a-button>
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
import {getRecord, getVoteLists, submitVoter} from '@/api/account'
import {mapState} from 'vuex'
import PopPassword from '@/components/pop-password/pop-password'
import PopVoted from '@/components/pop-voted/pop-voted'
import {compareArrObj} from '@/utils/utils'
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
      haveVoted: [],
      filterDisabled: [],
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
    this._getRecord()
  },
  computed: {
    ...mapState({
      secret: state => state.user.secret,
      address: state => state.user.accountInfo.address,
      secondSignature: state => state.user.accountInfo.secondSignature,
      balance: state => state.user.accountInfo.balance
    }),
    voted () {
      const votedList = []
      this.selectedRows.forEach((item) => {
        votedList.push('+' + item.publicKey)
      })
      return votedList
    }
  },
  methods: {
    refresh () {
      this.nodata = false
      this.selectedRowKeys = []
      this.selectedRows = []
      this._getRecord()
    },
    vote () {
      if (this.selectedRows.length === 0) {
        this.$notification.info({
          message: '提示',
          description: '请选择受托人'
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
      this._submitVoter({secret: this.secret, delegates: this.voted, secondSecret: secondSecret})
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    async _getVoteLists (p) {
      try {
        const params = {orderby: 'approval:desc'}
        const result = await getVoteLists(params)
        if (result.data.success) {
          this.filterDisabled = compareArrObj(this.haveVoted, result.data.delegates).result
          this.data = this.filterDisabled.slice(
            this.pagination.defaultPageSize * p,
            this.pagination.defaultPageSize * p + 10
          )
          if (result.data.delegates.length === 0) {
            this.nodata = true
          }
          this.loading = false
          const pagination = { ...this.pagination }
          pagination.total = this.filterDisabled.length
          pagination.current = p
          this.pagination = pagination
        }
      } catch (err) {
        console.log(err)
      }
    },
    async _getRecord () {
      try {
        const params = {address: this.address}
        this.loading = true
        const result = await getRecord(params)
        if (result.data.success) {
          this.totalVoters = result.data.delegates.length
          this.haveVoted = result.data.delegates
          this._getVoteLists(0)
        } else {
          this.haveVoted = []
          this._getVoteLists(0)
        }
      } catch (err) {
        console.log(err)
      }
    },
    handleTableChange (pagination) {
      this._getVoteLists(pagination.current - 1)
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    async _submitVoter (params = {secret: this.secret, delegates: this.voted}) {
      const result = await submitVoter(params)
      if (result.data.success) {
        this.$notification.info({
          message: '提示',
          description: '投票成功'
        })
        this.modal1Visible = false
        this.modal2Visible = false
        this.selectedRowKeys = []
        this.selectedRows = []
        setTimeout(() => {
          this._getVoteLists(this.pagination.current)
        }, 4000)
      }
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
.vote-lists{
  .refresh{
    margin-right: 10px;
  }
  .count{
    font-size: 18px;
    padding-left: 15px;
  }
  .table{
    margin-top: 20px;
  }
}
</style>
