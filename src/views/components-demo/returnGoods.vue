<template>
  <div>
    <!-- 头部 搜索   开始 -->
    <div style="display:flex;justify-content;space-between;margin-top:13px">
      <div>
        <el-input
          placeholder="输入服务单号搜索,可以直接回车搜索"
          prefix-icon="el-icon-search"
          clearable
          style="width:350px;margin-right:18px;margin-left:26px"
          :disabled="showAdvanceSearchView"
          @clear="initReturnGoods"
          @keydown.enter.native="initReturnGoods"
        />
        <el-button icon="el-icon-search" type="primary" size="mini" @click="initReturnGoods">搜索</el-button>
      </div>

      <transition></transition>
    </div>
    <!-- 头部  搜索 结束  -->

    <!-- 表格 开始  -->
    <div style="margin-top:10px;margin-left:100px;margin-right:100px">
      <el-table v-loading="loading" :data="returnGoods" border stripe size="small">
        <el-table-column prop="srid" label="服务单号" width="118" align="left" />
        <el-table-column prop="srdate" label="申请时间" width="138" align="center" />
        <el-table-column prop="orderform.ofmoney" label="退款金额" width="115" align="center" />
        <el-table-column prop="user.uaccount" label="用户账号" width="100" align="center" />
        <el-table-column prop="orderform.ofshname" label="联系人" width="158" align="center" />
        <el-table-column prop="state" label="订单状态" align="center" width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state=='未处理'" type="danger">未处理</el-tag>
            <el-tag v-else-if="scope.row.state=='已完成'" type="success">已完成</el-tag>
            <el-tag v-else-if="scope.row.state=='已拒绝'" type="danger">已拒绝</el-tag>
            <el-tag v-else-if="scope.row.state=='退货中'" type="danger">退货中</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="处理时间" width="158" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="NoReturn(scope.$index,scope.row)">拒绝退货</el-button>
            <el-button type="primary" size="mini" @click="YesReturn(scope.$index,scope.row)">同意退货</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页开始 -->
      <div style="display: flex;justify-content: flex-end;margin-top:8px;margin-right:60px">
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

    <!-- 表格 结束  -->
  </div>
</template>

<script>
export default {
  name: "returnGoods",
  data() {
    return {
      loading: false,
      total: 0,
      page: 0,
      size: 10,
      returnGoods: []
    };
  },
  mounted() {
    this.initReturnGoods();
  },
  methods: {
    currentChange(page) {
      this.page = page;
      this.initReturnGoods();
    },
    sizeChange(size) {
      this.size = size;
      this.initReturnGoods();
    },
    initReturnGoods() {
      this.loading = true;
      this.getRequest("/shopping_mall/stockremoval/").then(resp => {
        this.loading = false;
        if (resp) {
          this.returnGoods = resp.data;
          this.total = resp.total;
        }
      });
    }
  }
};
</script>

<style >
</style>

