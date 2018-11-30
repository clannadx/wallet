<template>
  <div class="lock-up">
    <div class="info">
      <a-button class="add" icon="plus" type="primary" @click="showModal">{{$t('lock_up.btn_add')}}</a-button>
      <a-button @click="showConfirmAll">{{$t('lock_up.bulk_unlock')}}</a-button>
      <a-alert class="info-content" type="info" :show-icon="true" >
        <div slot="message">
          {{$t('lock_up.choose')}}&nbsp;<a style="font-weight: 600">{{selectedRowKeys.length}}</a>&nbsp;{{$t('lock_up.item')}}&nbsp;&nbsp;
          <template v-if="total">
          {{$t('lock_up.total')}}&nbsp;
           <a  style="font-weight: 600" >
            {{unit(total)}}
            </a>&nbsp;ETM
          </template>
          <a @click="empty" style="margin-left: 24px"> {{$t('lock_up.clear')}}</a>
        </div>
      </a-alert>
    </div>
    <!-- 表格 -->
    <a-table :dataSource="data"
             :columns="columns"
             :pagination="pagination"
             :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
             :loading="loading"
             :scroll="{x:1300}"
             @change="handleTableChange">
          <template slot="time" slot-scope="text, record">
            {{convertTime(record.timestamp)}}
          </template>
          <template slot="amount" slot-scope="text, record">
            {{unit(record.asset.lockAmount)}}
          </template>
          <template slot="action" slot-scope="text, record, index">
          <a slot="action"  @click="showConfirm(record.id)"  href="javascript:;">{{$t('lock_up.unlock')}}</a>
        </template>
    </a-table>
    <!-- 弹框 -->
    <a-modal
      :title="$t('lock_up.lockedModel.title')"
      destroyOnClose
      v-model="visible"
      okText="确认"
      @ok="addLock"
      cancelText="取消"
      @cancel="cancelModal"
    >
    <a-form :autoFormCreate="(form)=>{this.form = form}">
      <a-form-item
      :label="$t('lock_up.lockedModel.label')"
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 16 }"
      :fieldDecoratorId="$t('lock_up.lockedModel.label')"
      :fieldDecoratorOptions="{rules: [{ required: true, message: $t('lock_up.lockedModel.msg') }]}">
      <a-input type="number" v-model="amount" :placeholder="$t('lock_up.lockedModel.msg')" addonAfter="ETM" />
      </a-form-item>
      <a-form-item
       :labelCol="{ span: 6 }"
      :label="$t('transfer.note.label')">
      {{$t('lock_up.lockedModel.note')}}
      </a-form-item>
    </a-form>
    </a-modal>
    <pop-password :modal2Visible.sync="modal2Visible" @secondSubmit="secondSubmit"></pop-password>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import { convertTime } from '@/utils/gen'
import { unit } from '@/utils/utils'
import {allLock, lockVote, lockRemove} from '@/api/account'
import popPassword from '@/components/pop-password/pop-password'
const columns = [{
  title: i18n.t('lock_up.colums.th01'),
  dataIndex: 'timestamp',
  scopedSlots: {customRender: 'time'},
  sorter: (a, b) => a.timestamp - b.timestamp
}, {
  title: i18n.t('lock_up.colums.th02'),
  dataIndex: 'asset.lockAmount',
  scopedSlots: {customRender: 'amount'},
  sorter: (a, b) => a.asset.lockAmount - b.asset.lockAmount

}, {
  title: i18n.t('lock_up.colums.th03'),
  dataIndex: 'asset.factor'
}, {
  title: i18n.t('lock_up.colums.th04'),
  key: 'operation',
  fixed: 'right',
  width: 100,
  scopedSlots: { customRender: 'action' }
}]
export default {
  data () {
    return {
      columns,
      data: [],
      loading: false,
      pagination: {
        current: 1,
        defaultPageSize: 10, // 每页个数
        total: 0
      },
      visible: false, // 锁仓弹框
      modal2Visible: false, // 二级密码
      selectedRowKeys: [],
      selectedRows: [],
      total: '', // 统计总共锁仓金额
      amount: null, // 锁仓金额
      singleLockId: [], // 单解锁id
      argsLockId: [], // 多个解锁id
      convertTime: convertTime,
      unit: unit
    }
  },
  computed: {
    ...mapState({
      secret: state => state.user.secret,
      address: state => state.user.accountInfo.address,
      secondSignature: state => state.user.accountInfo.secondSignature
    }),
    lockValue () {
      let arrValue = []
      arrValue.push(parseInt(this.amount * Math.pow(10, 8)).toString())
      return arrValue
    }
  },
  watch: {
    // 'selectedRows': function (selectedRows) {
    //   console.log(1)
    // }
  },
  created () {
    this._allLock()
  },
  methods: {
    empty () {
      this.selectedRowKeys = []
      this.selectedRows = []
      this.total = ''
    },
    showConfirm (lockId) {
      let self = this
      this.$confirm({
        title: '您需要解锁吗?',
        content: '需要收取0.1ETM手续费',
        okText: '确认',
        cancelText: '取消',
        onOk () {
          self.removeLockEvent(lockId)
        }
      })
    },
    showConfirmAll () {
      let self = this
      this.$confirm({
        title: '您需要解锁吗?',
        content: '需要收取0.1ETM手续费',
        okText: '确认',
        cancelText: '取消',
        onOk () {
          self.bulkUnlock()
        }
      })
    },
    showModal () {
      this.visible = true
    },
    cancelModal () {
      this.amount = null
    },
    addLock () {
      this.form.validateFields(
        (err) => {
          if (!err) {
            if (this.secondSignature) {
              this.visible = false
              this.modal2Visible = true
            } else {
              this._lockVote()
            }
          }
        }
      )
    },
    removeLockEvent (lockId) {
      this.singleLockId = []
      this.singleLockId.push(lockId)
      if (this.secondSignature) {
        this.modal2Visible = true
      } else {
        this.removeLock({secret: this.secret, args: this.singleLockId})
      }
    },
    bulkUnlock () {
      if (this.selectedRows.length <= 0) {
        this.$notification.info({
          message: i18n.t('tip.title'),
          description: i18n.t('tip.unlock_error')
        })
      } else {
        this.argsLockId = []
        this.selectedRows.forEach(item => {
          this.argsLockId.push(item.id)
        })
        if (this.secondSignature) {
          this.modal2Visible = true
        } else {
          this.removeLock({secret: this.secret, args: this.argsLockId})
        }
      }
    },
    async _lockVote (params = {secret: this.secret, args: this.lockValue}) {
      try {
        const result = await lockVote(params)
        if (result.data.success) {
          this.$notification.info({
            message: i18n.t('tip.title'),
            description: i18n.t('tip.lock_success')
          })
          this.visible = false
          this.modal2Visible = false
          this.amount = null
          setTimeout(() => {
            this._allLock()
          }, 4000)
        } else {
          this.visible = false
          this.modal2Visible = false
          this.amount = null
        }
      } catch (error) {
        console.log(error)
      }
    },
    async removeLock (params = {secret: this.secret, args: []}) {
      try {
        const result = await lockRemove(params)
        if (result.data.success) {
          this.$notification.info({
            message: i18n.t('tip.title'),
            description: i18n.t('tip.unlock_success')
          })
          this.selectedRowKeys = []
          this.selectedRows = []
          this.total = ''
          this.modal2Visible = false

          setTimeout(() => {
            this._allLock()
          }, 4000)
        } else {
          this.modal2Visible = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    async _allLock (params = {address: this.address, state: '1', orderByHeight: '-1', limit: this.pagination.defaultPageSize, offset: (this.pagination.current - 1) * this.pagination.defaultPageSize}) {
      this.loading = true
      try {
        const result = await allLock(params)
        if (result && result.data.success) {
          this.loading = false
          this.data = result.data.trs
          console.log(this.data)
          this.pagination.total = result.data.count
        }
      } catch (error) {
        console.log(error)
      }
    },
    handleTableChange (pagination) {
      this.selectedRowKeys = []
      this.selectedRows = []
      this.total = ''
      this.pagination = {...pagination}
      this._allLock()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      this.total = selectedRows.reduce((sum, val) => {
        return sum + val.asset.lockAmount
      }, 0)
    },
    secondSubmit (secondSecret) {
      if (this.amount) {
        this._lockVote({secret: this.secret, args: this.lockValue, secondSecret: secondSecret})
      } else if (this.singleLockId.length > 0) {
        this.removeLock({secret: this.secret, args: this.singleLockId, secondSecret: secondSecret})
      } else if (this.argsLockId.length > 0) {
        this.removeLock({secret: this.secret, args: this.argsLockId, secondSecret: secondSecret})
      }
    }
  },
  components: {
    popPassword
  }
}
</script>
<style lang="less" scoped>
  .lock-up{
    margin-top: 20px;
    .info{
      .add{
        margin-right: 15px;
      }
      margin-bottom: 20px;
      .info-content{
        margin-top: 20px;
      }
    }
  }
</style>
