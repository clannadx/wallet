<template>
  <div class="block-scan">
    <div class="search">
    <a-input-search
      placeholder="搜素高度"
      style="width: 300px"
      @search="onSearch"
      enterButton
    />
    </div>
    <div class="table">
      <a-table :columns="columns"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :scroll="{ x: 1300 }"
      :dataSource="data" bordered>
      <template slot="time" slot-scope="text, record">
        {{convertTime(record.timestamp)}}
      </template>
      <template slot="action" slot-scope="text, record, index">
        <a slot="action"  @click="showDetails(record.height)" href="javascript:;">查看详情</a>
      </template>
      </a-table>
<!-- 详情 -->
      <a-modal
      title="区块详情"
      width='800px'
      v-model="visible"
    >
      <template slot="footer">
        <div class="detail-foot">
        <a-button  type="primary" style="margin-right:20px" @click="prevBlock" >上一块</a-button>
        <a-button  type="primary" @click="nextBlock" >下一块</a-button>
        </div>
      </template>
      <div class="popDetail">
        <div class="input">
          <label>ID：</label>
          <span>{{blockDetail.id}}</span>
        </div>
        <div class="input">
          <label>版本：</label>
          <span>V{{blockDetail.version}}</span>
        </div>
        <div class="input">
          <label>时间：</label>
          <span>{{blockDetail.timestamp}}</span>
        </div>
        <div class="input">
          <label>高度：</label>
          <span>{{blockDetail.height}}</span>
        </div>
        <div class="input">
          <label>上一块：</label>
          <span>{{blockDetail.previousBlock}}</span>
        </div>
        <div class="input">
          <label>交易数：</label>
          <span>{{blockDetail.numberOfTransactions}}</span>
        </div>
        <div class="input">
          <label>交易总额：</label>
          <span>{{blockDetail.totalAmount}}</span>
        </div>
        <div class="input">
          <label>奖励：</label>
          <span>{{blockDetail.reward}}</span>
        </div>
        <div class="input">
          <label>摘要：</label>
          <span></span>
        </div>
        <div class="input">
          <label>生产者：</label>
          <span>{{blockDetail.generatorId}}</span>
        </div>
        <div class="input">
          <label>生产者公钥：</label>
          <span>{{blockDetail.generatorPublicKey}}</span>
        </div>
      </div>
    </a-modal>
    </div>
  </div>
</template>
<script>
import {getHighest, blocks, searchBlock} from '@/api/block'
import { convertTime } from '@/utils/gen'

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
  title: '生产者',
  dataIndex: 'generatorId'
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
}, {
  title: '操作',
  key: 'operation',
  fixed: 'right',
  width: 100,
  scopedSlots: { customRender: 'action' }
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
      height: '', // 查询高度
      detailHeight: '',
      blockDetail: {},
      visible: false, // 弹出框
      convertTime: convertTime // 方法
    }
  },
  created () {
    this._getTableLists()
  },
  methods: {
    async showDetails (height) {
      this.detailHeight = height
      this.visible = true
      const params = {height: height}
      const result = await searchBlock(params)
      if (result.data.success) {
        this.blockDetail = result.data.block
      }
    },
    async nextBlock () {
      const result = await getHighest()
      if (result.data.success) {
        if (this.detailHeight === result.data.height) {
          this.$notification.info({
            message: '提示',
            description: '已达到最高高度'
          })
        } else {
          this.detailHeight += 1
          this.showDetails(this.detailHeight)
        }
      }
    },
    async prevBlock () {
      if (this.detailHeight <= 1) {
        this.$notification.info({
          message: '提示',
          description: '已达到最小高度'
        })
      } else {
        this.detailHeight -= 1
        this.showDetails(this.detailHeight)
      }
    },
    onSearch (value) {
      if (value === '') {
        this.$notification.error({
          message: '提示',
          description: '高度不能为空'
        })
      } else {
        this.height = {height: value}
        this._search(this.height)
      }
    },
    async _search (params = {}) {
      this.loading = true
      const result = await searchBlock(params)
      if (result.data.success) {
        this.loading = false
        this.data = []
        this.data.push(result.data.block)
        this.pagination.total = 1
      }
      this.loading = false
    },
    async _getTableLists (params = {limit: 10, orderBy: 'height:desc'}) {
      this.loading = true
      const result = await blocks(params)
      if (result.data.success) {
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
        limit: pagination.pageSize,
        offset: pagination.pageSize * (pagination.current - 1),
        orderBy: 'height:desc'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.block-scan{
  background: #fff;
  border-radius: 2px;
  padding: 20px 10px;
  .search{
    margin-bottom: 20px;
  }

}
.detail-foot{
    text-align: center!important;
  }
  .popDetail{
    .title {
      font-size: 18px;
      color: #c3c3c3;
      text-align: center;
      margin-bottom: 20px;
    }
    .input {
      font-size: 16px;
      height: 36px;
      line-height: 36px;
    }
    .input label {
      display: inline-block;
      width: 120px;
      text-align: right;
      color: #343434;
    }
  }
</style>
