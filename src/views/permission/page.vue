<template>
  <div>

    <!-- 条件查询 -->
    <el-form ref="ruleForm" :model="seckill" label-width="100px">
      <el-form-item label="活动名称">
        <el-input v-model="seckill.sktitle" />
      </el-form-item>
      <el-form-item label="活动开始时间区间">
        <el-col :span="11">
          <el-date-picker v-model="seckill.skstarttime" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="11">
          <el-date-picker v-model="seckill.skstarttimeover" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="活动结束时间区间">
        <el-col :span="11">
          <el-date-picker v-model="seckill.skendtime" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-col>
        <el-col class="line" :span="1">   -</el-col>
        <el-col :span="11">
          <el-date-picker v-model="seckill.skendtimeover" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="是否上架">
        <el-radio-group v-model="seckill.skstate">
          <el-radio label="1">上架</el-radio>
          <el-radio label="2">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">联合查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表 -->
    <el-table :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)" border style="width: 100%">
      <el-table-column type="index" label="编号" width="150" />
      <el-table-column prop="sktitle" label="秒杀标题" />
      <el-table-column prop="skstarttime" sortable label="秒杀开始时间" />
      <el-table-column prop="skendtime" sortable label="秒杀结束时间" />
      <el-table-column prop="skstate" property="skstate" label="活动状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.skstate" active-color="#13ce66" inactive-color="#ff4949" active-text="上架" inactive-text="下架" active-value="1" inactive-value="2" @change="change(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--      <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">设置商品</el-button> -->
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
      :total="tableData.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />

    <!-- 添加页面 -->
    <el-dialog title="添加页面" :visible.sync="dialogFormVisible">
      <add @isfromadd="showMessageFromChildadd" />
    </el-dialog>

    <!-- 修改页面 -->
    <el-dialog v-if="dialogFormVisibleupdate" title="修改页面" :visible.sync="dialogFormVisibleupdate">
      <up :ids="ids" @isfrom="showMessageFromChild" />
    </el-dialog>

  </div>
</template>

<script>
import up from './role.vue'
import add from './directive.vue'

export default {
  components: {
   	up, add
  },
  data() {
    return {
      seckill: {
        skid: '',
        sktitle: '',
        skstarttime: '',
        skstarttimeover: '',
        skendtime: '',
        skendtimeover: '',
        skstate: ''
      },
      tableData: [],
      pagesize: 5,
      currpage: 1,
      formstate: 0,
      dialogFormVisible: false,
      dialogFormVisibleupdate: false,
      ids: ''
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {

    loadData: function() {
      var th = this
      this.getRequest('/shopping_mall/seckill/queryList')
        .then(function(response) {
          th.tableData = response
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    handleDelete(index, row) {
      var th = this
      this.getRequest('/shopping_mall/seckill/deleteById?skid=' + row.skid)
        .then(function(response) {
          console.log(response)
          th.loadData()
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    change(row) {
      console.log(row.skstate)

      this.$axios.get('/shopping_mall/seckill/updateSeckill', {
        params: {
          skid: row.skid,
          skstate: row.skstate
        }
      })
        .then(function(response) {
          console.log(response)
          // if(this.formstate==0){
          //   this.loadData();
          // }else{
          //   this.onSubmit();
          // }
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    handleCurrentChange(cpage) {
      if (this.formstate == 0) {
        this.loadData()
      } else {
        this.onSubmit()
      }
        			this.currpage = cpage
    },

    handleSizeChange(psize) {
      if (this.formstate == 0) {
        this.loadData()
      } else {
        this.onSubmit()
      }
        			this.pagesize = psize
    },

    onSubmit() {
      if (this.seckill.skstarttime != null && this.seckill.skstarttime != '') {
        if (this.seckill.skstarttimeover == null || this.seckill.skstarttimeover == '') {
          alert('请选择为区间')
        } else {
          if (this.seckill.skstarttime != null && this.seckill.skstarttimeover != null) {
            var d = new Date(this.seckill.skstarttime)
            this.seckill.skstarttime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            var d1 = new Date(this.seckill.skstarttimeover)
            this.seckill.skstarttimeover = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate()
          }
        }
      }

      if (this.seckill.skendtime != null && this.seckill.skendtime != '') {
        if (this.seckill.skendtimeover == null || this.seckill.skendtimeover == '') {
          alert('请选择为区间')
        } else {
          console.log(121231321321321321321321321)
          if (this.seckill.skendtime != null && this.seckill.skendtimeover != null) {
            var d2 = new Date(this.seckill.skendtime)
            this.seckill.skendtime = d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate()
            var d3 = new Date(this.seckill.skendtimeover)
            this.seckill.skendtimeover = d3.getFullYear() + '-' + (d3.getMonth() + 1) + '-' + d3.getDate()
          }
        }
      }
      var th = this
      this.$axios.get('/shopping_mall/seckill/queryList', {
        params: {
          sktitle: th.seckill.sktitle,
          skstarttime: th.seckill.skstarttime,
          skstarttimeover: th.seckill.skstarttimeover,
          skendtime: th.seckill.skendtime,
          skendtimeover: th.seckill.skendtimeover,
          skstate: th.seckill.skstate
        }
      })
        .then(function(response) {
          th.tableData = response
          th.formstate = 1
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    // 子类传给父类修改
    showMessageFromChild(data) {
        		  this.dialogFormVisibleupdate = data
        			  this.loadData()
    },
    // 子类传给父类添加
    showMessageFromChildadd(data) {
                  		  this.dialogFormVisible = data
                  			  this.loadData()
    },

    handleEdit(a, b) {
      this.dialogFormVisibleupdate = true
          		  this.ids = b.skid
    },
    // 重置form表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }

  }
}
</script>
