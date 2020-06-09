<template>
    <div>

    <div class="permissManaTool">
      <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input
        size="small"
        placeholder="请输入角色中文名"
        @keydown.enter.native="doAddRole"
        v-model="role.namezh"
      ></el-input>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="doAddRole">添加角色</el-button>
    </div>


    
    <!-- 折叠面板  开始-->
    <div class="permissManaMain">
      <!-- 折叠面板点击事件 -->
      <el-collapse
        v-model="activeName"
        v-loading="loading"
        :data="roles"
        accordion
        @change="change"
      >
        <el-collapse-item v-for="(r,index) in roles" :key="index" :title="r.rname" :name="r.rid">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问的资源</span>
              <el-button
                style="float: right; padding: 3px 0;color:red"
                icon="el-icon-delete"
                type="text"
                @click="deleteRole(r)"
              ></el-button>
            </div>


                  <!-- 展示所有菜单项   树形，  :key index的值无所谓，关键是区分是哪一个tree -->
            <div>
              <el-tree
                show-checkbox
                ref="tree"
                :key="index"
                node-key="jid"
                :default-checked-keys="selectedMenus"
                :data="allmenus"
                :props="defaultProps"
              ></el-tree>
              <div style="display:flex;justify-content:flex-end">
                <el-button @click="canceUpdate">取消修改</el-button>
                <el-button type="primary" @click="doUpdate(r.rid,index)">确认修改</el-button>
              </div>
            </div>


        
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>






    </div>
</template>
<script>
export default {

      name: "PermissMana",
      data() {
    return {
      loading: false,
      role: {
        name: "",
        namezh: ""
      },
       roles: [], //所有的角色
       allmenus: [], //所有菜单
       selectedMenus: [],
       activeName: -1,
       defaultProps: {
        children: "children", // 你这个树 里面的cildren的key是什么
        label: "jname" //展示出来的文本是name，
      }
    };
  },
    mounted() {
    this.initRoles();
  },
  methods: {

      //添加角色
        doAddRole(){
         var a=this;
          if (this.role.name && this.role.namezh) {
         this.$axios.get('http://localhost:8090/shopping_mall/role/addRole',{
				
				params: {
                    rname : this.role.namezh
				  }
				
			})
			  .then(function (response) {
                console.log(response);
              
            if(response.data==0){
              a.$message({
                message:"添加成功",
                type: 'success'
             });
            a.role.name = "";
            a.role.namezh = "";
            a.initRoles();
             }else{
             a.$message({
                message:"添加失败，出错",
                type: 'success'
           });

          }
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
          }else{
              this.$message.error("数据不能为空哦 ^-^");
          }

        },
        //查询角色
        initRoles(){
       
        var a=this;
        this.$axios.get('http://localhost:8090/shopping_mall/role/queryAllRole')
        .then(function (response) {
        // handle success
        console.log(response.data);
        a.roles = response.data;
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        });

        },
        //删除角色
        deleteRole(role){


         this.$confirm(
        "此操作将永久删除【" + role.rname + "】角色,是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
         	this.$axios.get('http://localhost:8090/shopping_mall/role/deleteRole?rid='+role.rid).then(
            resp => {
              if (resp) {
                this.initRoles();
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });



        },
         change(rid) {
      //name是菜单id
      if (rid) {
        //打开面板时 初始化数据
           this.initAllMenus();
           this.initSelectedMenus(rid);
      }
    },
    //取消修改
    canceUpdate(){
         //关闭面板
      this.activeName = -1;
    },
    //确认修改
       doUpdate(rid, index) {
      var a=this;
      //角色id，index就知道是获取到数组中的第几个tree
      let tree = this.$refs.tree[index];
      let selectedKeys = tree.getCheckedKeys(true); //为true只返回叶子节点，也就是二级菜单
      let url = "http://localhost:8090/shopping_mall/roleauthority/updateRoleauth?rid=" + rid;

      selectedKeys.forEach(key => {
        url += "&jid=" + key;
      });
      
       this.$axios.get(url)
      .then(function (response) {
      // handle success
      console.log(response.data);
               a.$message({
                message:"修改成功",
                type: 'success'
             });
      })
      .catch(function (error) {
      // handle error
      console.log(error);
      });




    },
    //查询树菜单
    initAllMenus(){
    var a=this;
		this.$axios.get('http://localhost:8090/shopping_mall/jurisdiction/queryAllJur')
		.then(function (response) {
		// handle success
    console.log(response.data);
		a.allmenus = response.data;
		})
		.catch(function (error) {
		// handle error
		console.log(error);
		});
    },
    //默认菜单
    initSelectedMenus(rid){
     
    var a=this;
    this.$axios.get('http://localhost:8090/shopping_mall/roleauthority/queryRoleauthorityById?rid='+rid)
		.then(function (response) {
		// handle success
    console.log(response.data);
    a.selectedMenus=response.data;
		})
		.catch(function (error) {
		// handle error
		console.log(error);
		});






    }
      
  }
}
</script>

<style>
.permissManaTool {
  display: flex;
  justify-content: flex-start;
}
.permissManaTool .el-input {
  width: 300px;
  margin-right: 6px;
}
.permissManaMain {
  margin-top: 10px;
  width: 622px;
}
</style>