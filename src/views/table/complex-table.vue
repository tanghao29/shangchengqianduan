<template>
  <div>

    <el-table :data="loadDatas.slice((currpage - 1) * pagesize, currpage * pagesize)" border style="width: 100%">
      <el-table-column type="index" label="编号" width="150" />
      <el-table-column prop="ccname" label="参数名" />
      <el-table-column prop="sname" label="规格" />

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">设置规格</el-button>
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 列表分页 -->
    <el-pagination
      background
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="loadDatas.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />

  </div>
</template>

<script>

export default {

  data() {
    return {
      specification: {
        sid: '',
        ccid: '',
        sname: '',
        ccname: ''
      },
      loadDatas: [],
      pagesize: 5,
      currpage: 1
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {

    loadData: function() {
      var th = this
      this.getRequest('/shopping_mall/specification/querySpecifcationList')
        .then(function(response) {
          th.loadDatas = response
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    handleCurrentChange(cpage) {
      this.loadData()
      this.currpage = cpage
    },

    handleSizeChange(psize) {
      this.loadData()
      this.pagesize = psize
    },
    handleDelete(index, row) {
      var th = this
      this.getRequest('/shopping_mall/specification/deleteById?sid=' + row.sid)
        .then(function(response) {
          th.loadData()
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    }

  }

}

</script>
