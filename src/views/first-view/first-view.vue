<template>
  <div>
    <div class="information" >
      <a-row class="etm-info" type="flex" justify="space-around" align="middle">
          <a-col class="etm-info-li" :span="8">
            <p>我的余额</p>
            <p>{{unit(accounts.balance).toFixed(2)}} ETM</p>
          </a-col>
          <a-col class="etm-info-li" :span="8">
            <p>最后出块高度</p>
            <p>{{accounts.height}}</p>
          </a-col>
          <a-col class="etm-info-li last" :span="8">
            <p>版本信息</p>
            <p>V{{accounts.version}}</p>
          </a-col>
      </a-row>
    </div>
    <div class="transaction">
      <p>交易记录</p>
      <div class="lists" >
        <div>
          <a-table :columns="columns"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
            :scroll="{ x: 1300 }"
          @change="handleTableChange"
            bordered>
            <template slot="typeIN" slot-scope="text, record">
              {{mapType(record.type)}}
            </template>
            <template slot="time" slot-scope="text, record">
              {{convertTime(record.timestamp)}}
            </template>
            <template slot="amount" slot-scope="text, record">
              {{unit(record.amount)}}
            </template>
          <template slot="footer" slot-scope="currentPageData">
            总计:      {{totalAmount().toFixed(2)}} ETM
          </template>
          </a-table>
        </div>
        <no-data v-show="nodata"  ></no-data>
      </div>
    </div>
  </div>
</template>
<script>
import { getTransaction } from '@/api/account'
import { convertTime } from '@/utils/gen'
import {unit} from '@/utils/utils'
import noData from '@/components/nodata/nodata'
const columns = [{
  title: 'ID',
  dataIndex: 'id',
  width: 520,
  fixed: 'left'

}, {
  title: '类型',
  scopedSlots: { customRender: 'typeIN' },
  dataIndex: 'type'
}, {
  title: '发送者',
  dataIndex: 'senderId'
}, {
  title: '接收者',
  dataIndex: 'recipientId'
}, {
  title: '日期',
  dataIndex: 'timestamp',
  scopedSlots: {customRender: 'time'}
}, {
  title: '备注',
  dataIndex: 'message'
}, {
  title: '金额（ETM）',
  dataIndex: 'amount',
  width: 150,
  fixed: 'right',
  scopedSlots: {customRender: 'amount'}

}]

export default {
  data () {
    return {
      data: [],
      columns,
      pagination: {
        defaultPageSize: 10 // 每页个数
      },
      loading: false,
      nodata: false,
      unit: unit,
      convertTime: convertTime // 方法
    }
  },
  computed: {
    accounts () {
      return this.$store.state.user.accountInfo || {}
    },
    address () {
      return this.$store.state.user.accountInfo.address
    }
  },
  components: {
    'no-data': noData
  },
  created () {
    this._getTransaction()
    console.log(this.accounts)
  },
  methods: {
    async _getTransaction (params = {senderId: this.address, orderBy: 't_timestamp:desc', limit: 10}) {
      this.loading = true
      const result = await getTransaction(params)
      if (result.data.success) {
        if (result.data.count === 0) {
          this.nodata = true
        }
        this.data = result.data.transactions
        const pagination = {...this.pagination}
        pagination.total = result.data.count
        this.pagination = pagination
        this.loading = false
      }
    },
    handleTableChange (pagination) {
      const pager = {...this.pagination}
      pager.current = pagination.current
      this.pagination = pager
      this._getTransaction({
        senderId: this.address,
        limit: pagination.pageSize,
        offset: pagination.pageSize * (pagination.current - 1),
        orderBy: 't_timestamp:desc'
      })
    },
    totalAmount () {
      if (!this.data.length) {
        return 0
      }
      const amount = this.data.map(item => unit(item.amount))
      return amount.reduce((prev, next) => {
        return prev + next
      })
    },
    mapType (type) {
      switch (type) {
        case 0:
          return '普通转账'
        case 1:
          return '设置二级密码'
        case 2:
          return '注册受托人'
        case 3:
          return '投票'
        case 4:
          return '多重签名'
        case 5:
          return 'DAPP'
        case 6:
          return 'IN_TRANSFER'
        case 7:
          return 'OUT_TRANSFER'
      }
    }
  }
}
</script>
<style lang="less" >
.information {
  background: #fff;
  border-radius: 2px;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.65);
  height: 100px;
  padding-top: 20px;
  .etm-info {
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
.transaction {
  margin: 20px 0 ;
  p {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .lists{
  position: relative;
  background: #fff;
  border-radius: 2px;
    padding:10px;
  }
}
</style>
