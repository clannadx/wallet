<template>
  <div>
    <div class="information" >
      <a-row class="etm-info" type="flex" justify="space-around" align="middle">
          <a-col class="etm-info-li" :span="8">
            <p>{{$tc("first-view.information",0)}} (ETM)</p>
            <p>{{unit(accounts.balance).toFixed(2)}}</p>
          </a-col>
          <a-col class="etm-info-li" :span="8">
            <p>{{$tc("first-view.information",1)}}</p>
            <p>{{accounts.height}}</p>
          </a-col>
          <a-col class="etm-info-li last" :span="8">
            <p>{{$tc("first-view.information",2)}}</p>
            <p>V{{accounts.version}}</p>
          </a-col>
      </a-row>
    </div>
    <div class="transaction">
      <p class="title">{{$t("first-view.transaction")}}</p>
      <div class="lists" >
        <div>
          <a-table :columns="columns"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
            :scroll="{ x: 1300 }"
          @change="handleTableChange"
            >
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
            {{$t("first-view.all")}}:      {{totalAmount().toFixed(2)}} ETM
          </template>
          </a-table>
        </div>
        <no-data v-show="nodata"></no-data>
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
  title: i18n.t('first-view.table_columns.th02'),
  scopedSlots: { customRender: 'typeIN' },
  dataIndex: 'type'
}, {
  title: i18n.t('first-view.table_columns.th03'),
  dataIndex: 'senderId'
}, {
  title: i18n.t('first-view.table_columns.th04'),
  dataIndex: 'recipientId'
}, {
  title: i18n.t('first-view.table_columns.th05'),
  dataIndex: 'timestamp',
  scopedSlots: {customRender: 'time'}
}, {
  title: i18n.t('first-view.table_columns.th06'),
  dataIndex: 'message'
}, {
  title: i18n.t('first-view.table_columns.th07'),
  dataIndex: 'amount',
  width: 120,
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
          return i18n.t('first-view.transfer')
        case 1:
          return i18n.t('first-view.set')
        case 2:
          return i18n.t('first-view.register_voter')
        case 3:
          return i18n.t('first-view.vote')
        case 4:
          return i18n.t('first-view.multi_signature')
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
  .title {
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
@media (max-width: 768px){
  .information .etm-info .etm-info-li p:last-child{
    font-size: 20px;
  }
}
</style>
