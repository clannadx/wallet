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
        <a slot="action" slot-scope="text" @click="showDetails" href="javascript:;">查看详情</a>
      </a-table>
<a-modal
      title="Modal"
      v-model="visible"
      @ok="hideModal"
      okText="确认"
      cancelText="取消"
    >
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </a-modal>
    </div>
  </div>
</template>
<script>
import {blocks, searchBlock} from '@/api/block'
const columns = [{
  title: '高度',
  width: 100,
  dataIndex: 'height',
  fixed: 'left'
}, {
  title: '日期',
  dataIndex: 'timestamp'
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
      height: ''
    }
  },
  created () {
    this._getTableLists()
  },
  methods: {
    showDetails () {
      this.$confirm({
        title: 'Confirm',
        content: 'Bla bla ...',
        okText: '确认',
        cancelText: '取消'
      })
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
      } else {
        this.$notification.error({
          message: '提示',
          description: '区块未找到'
        })
        this.loading = false
      }
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
</style>
