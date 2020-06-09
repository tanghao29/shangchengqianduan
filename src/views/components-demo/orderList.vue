<template>
  <div>
    <!-- 表格 开始 -->
    <div style="margin-top:10px">
      <el-table :data="orders" border stripe size="mini">
        <el-table-column type="selection" align="left" width="55" />
        <el-table-column prop="ofid" label="编号" fixed width="120" align="left" />
        <el-table-column prop="ofnumber" label="订单数量" width="120" align="left" />
        <el-table-column prop="email" label="电子邮件" width="200" align="left" />
        <el-table-column prop="ofmoney" label="订单金额" width="120" align="left" />
        <el-table-column prop="ofstate" label="订单状态" width="120" align="left" />
        <el-table-column prop="ofshname" label="收货人名称" width="120" align="left" />
        <el-table-column prop="ofshphone" label="收货人电话" width="120" align="left" />
        <el-table-column prop="ofshsite" label="收货人地址" width="120" align="left" />

        <el-table-column label="操作" align="center" />
      </el-table>
      <!-- 分页开始 -->
      <div style="display: flex;justify-content: flex-end">
        <el-pagination
          background
          layout="sizes, prev, pager, next, jumper, ->, total, slot"
          :total="total"
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </div>
      <!-- 分页结束 -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'OrderList',
  data() {
    return {
      orders: [],
      total: 0,
      currentPage: 1,
      currentSize: 10
    }
  },
  mounted() {
    this.initOrder()
  },
  methods: {
    sizeChange(size) {
      this.currentSize = size
      this.initOrder()
    },
    currentChange(page) {
      this.currentPage = page
      this.initOrder()
    },
    initOrder() {
      this.getRequest(
        '/shopping_mall/orderform/?page=' +
          this.currentPage +
          '&size' +
          this.currentSize
      ).then(resp => {
        if (resp) {
          this.orders = resp.data
          this.total = resp.total
        }
      })
    }
  }
}
</script>

<style>
</style>
