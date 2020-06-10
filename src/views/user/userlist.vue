<template>
  <div>

    <el-input
      v-model="form.uaccount"
      placeholder="请输入账号"
      clearable
      style="width:300px;"
    />
    <el-input
      v-model="form.name"
      placeholder="请输入名称"
      clearable
      style="width:300px;"
    />

    <el-radio v-model="radio" label="0">启用</el-radio>
    <el-radio v-model="radio" label="1">禁用</el-radio>
    <el-button type="primary" @click="search">搜 索</el-button>

    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
    >
      <el-table-column
        label="编号"
        width="180"
      >
        <template slot-scope="scope">
          <i class="el-icon-s-flag" />
          <span style="margin-left: 10px">{{ scope.row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="180"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.uname }}</p>
            <p>账号: {{ scope.row.uaccount }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.uname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        label="密码"
        width="180"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">******</span>
        </template>
      </el-table-column>

      <el-table-column
        label="头像"
        width="180"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="require('@/images/'+scope.row.uimg)"
            :preview-src-list="[require('@/images/'+scope.row.uimg)]"
          />
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        width="180"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.ustate"
            active-color="#00A854"
            active-text="启动"
            active-value="0"
            inactive-color="#ff4949"
            inactive-text="禁止"
            inactive-value="1"
            @change="changeSwitch(scope.row)"
          />
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row,dialogFormVisible = true)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog title="修改信息:" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" />

            </el-form-item>
          </el-form-item>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.uaccount" autocomplete="off" disabled="disabled" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.upass" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">

          <el-switch
            v-model="form.ustate"
            active-color="#00A854"
            active-text="启动"
            active-value="0"
            inactive-color="#ff4949"
            inactive-text="禁止"
            inactive-value="1"
          />
        </el-form-item>

        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="citys" placeholder="请选择角色" filterable multiple>
            <el-option label="选择所有" value="all" />
            <el-option v-for="item in roles" :key="item.rid" :label="item.rname" :value="item.rid" />
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser(dialogFormVisible = false)">修 改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: { uid: '', name: '', uaccount: '', upass: '', uimg: '', ustate: '' },
      roles: [],
      citys: [],
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      radio: ''
    }
  },
  watch: {
    citys: function(val, oldval) {
      const newindex = val.indexOf('all'); const oldindex = oldval.indexOf('all') // 获取val和oldval里all的索引,如果没有则返回-1
      if (newindex != -1 && oldindex == -1 && val.length > 1) // 如果新的选择里有勾选了选择所有选择所有 则 只直线勾选所有整个选项
      { this.citys = ['all'] } else if (newindex != -1 && oldindex != -1 && val.length > 1) // 如果操作前有勾选了选择所有且当前也选中了勾选所有且勾选数量大于1  则移除掉勾选所有
      { this.citys.splice(val.indexOf('all'), 1) }
    }
  },
  // 当页面加载完毕之后执行
  mounted() {
    // 加载列表数据
    this.loadData()
    // 加载所有角色
    this.queryRole()
  },
  methods: {
    loadData() {
      // 加载数据

			  this.$axios
        .get('http://localhost:8090/shopping_mall/user/userqueryall')
        .then((res) => {
          this.tableData = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleEdit(row, e) {
      this.form.uid = row.uid
      this.form.name = row.uname
      this.form.uaccount = row.uaccount
      this.form.upass = row.upass
      this.form.ustate = row.ustate
      this.form.uimg = row.uimg

      	  this.$axios
        .get('http://localhost:8090/shopping_mall/user/queryUserRole', {

          	params: {
				  	uid: this.form.uid
				  }
        })
        .then((res) => {
          this.citys = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    // 启动禁用开关
    changeSwitch(data) {
      // 为给定 user用户改变启用状态
      var a = this
		 	this.$axios.get('http://localhost:8090/shopping_mall/user/updatebyustatu', {

        params: {
          uid: data.uid,
          ustate: data.ustate
				  }

      })
			  .then(function(response) {
          var str = ''
          if (data.ustate == 0) {
            str = '启用成功'
          } else {
            str = '禁用成功'
          }
				  a.$message({
            message: str,
            type: 'success'
          })
			    console.log(response)
			  })
			  .catch(function(error) {
			    console.log(error)
			  })

      console.log(data)
    },
    // 编辑user 修改
    updateUser(e) {
      var a = this
      	this.$axios.get('http://localhost:8090/shopping_mall/user/updateUser', {

				  params: {
          uid: this.form.uid,
          uaccount: this.form.uaccount,
          uname: this.form.name,
          upass: this.form.upass,
          uimg: this.form.uimg,
          ustate: this.form.ustate,
          citys: JSON.stringify(a.citys)
				  },
        paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        }

      })
			  .then(function(response) {
          if (response.data == 0) {
            a.$message({
              message: '修改成功',
              type: 'success'
            })
            a.loadData()
          } else {
            a.$message({
              message: '修改失败，出错',
              type: 'success'
            })
          }

			    console.log(response)
			  })
			  .catch(function(error) {
			    console.log(error)
			  })
    },
    queryRole() {
      var a = this
      this.$axios.get('http://localhost:8090/shopping_mall/role/queryAllRole')
        .then(function(response) {
          // handle success
          console.log(response.data)
          a.roles = response.data
        })
        .catch(function(error) {
          // handle error
          console.log(error)
        })
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    },
    handleUserList() {
      this.$axios.get('http://localhost:8090/shopping_mall/user/userqueryall').then(res => { // 这是从本地请求的数据接口，
        this.tableData = res.body
      })
    },
    // 搜索按钮
    search() {
      this.$axios
        .get('http://localhost:8090/shopping_mall/user/searchUser', {
          params: {
            uname: this.form.name,
            uaccount: this.form.uaccount,
            ustate: this.radio
          }
        })
        .then((res) => {
          this.tableData = res.data
          this.form.uaccount = ''
          this.form.name = ''
          this.radio = ''
        		})
        .catch((err) => {
          console.log(err)
        })
    }
  }

}
</script>
