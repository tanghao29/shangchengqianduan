<template>
  <div>

    <!-- 条件查询 -->
    <el-form :model="seckill" ref="ruleForm" label-width="100px">
     <el-form-item label="活动名称">
        <el-input v-model="seckill.sktitle"></el-input>
      </el-form-item>
      <el-form-item label="活动开始时间区间">
        <el-col :span="11">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="seckill.skstarttime" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="seckill.skstarttimeover" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="活动结束时间区间">
        <el-col :span="11">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="seckill.skendtime" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">   -</el-col>
        <el-col :span="11">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="seckill.skendtimeover" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="是否上架">
       <el-radio-group v-model="seckill.skstate">
         <el-radio label="1" >上架</el-radio>
         <el-radio label="2" >下架</el-radio>
       </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">联合查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
       <el-button  type="primary" @click="dialogFormVisible = true">添加</el-button>
      </el-form-item>
    </el-form>

<!-- 列表 -->
    <el-table  :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)" border style="width: 100%">
      <el-table-column type="index" label="编号" width="150"></el-table-column>
      <el-table-column prop="sktitle" label="秒杀标题"></el-table-column>
      <el-table-column prop="sknubmer" label="可秒杀商品"></el-table-column>
      <el-table-column prop="state" label="活动状态">

      </el-table-column>
      <el-table-column prop="skstarttime"  sortable label="秒杀开始时间"></el-table-column>
      <el-table-column prop="skendtime" sortable label="秒杀结束时间"></el-table-column>
      <el-table-column prop="skstate" property="skstate" label="活动状态">
        <template slot-scope="scope">
          <el-switch active-color="#13ce66" inactive-color="#ff4949" active-text="上架" inactive-text="下架" v-model="scope.row.skstate" active-value=1 inactive-value=2  @change="change(scope.row)" ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button size="mini"  type="success" @click="dialogFormVisibleshangpin = true,ids=scope.row.skid">查看商品</el-button>
          <el-button size="mini"  type="success" @click="dialogFormVisiblespadd = true,id=scope.row.skid">添加商品</el-button>
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
         </template>
      </el-table-column>
    </el-table>

  <!-- 列表分页 -->
      <el-pagination background
      			layout="prev, pager, next, sizes, total, jumper"
      			:page-sizes="[5, 10, 15, 20]"
      			:page-size="pagesize"
      			:total="tableData.length"
      			@current-change="handleCurrentChange"
      			@size-change="handleSizeChange">
      		</el-pagination>

<!-- 添加页面 -->
      <el-dialog title="添加页面" :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
         <add  v-on:isfromadd="showMessageFromChildadd"></add>
      </el-dialog>

      <!-- 为当前标题添加商品页面 -->
            <el-dialog title="添加商品" :visible.sync="dialogFormVisiblespadd" v-if="dialogFormVisiblespadd">
               <spadd :ids="id"  v-on:isfromadd="showMessageFromChildspadd"></spadd>
            </el-dialog>

<!-- 修改页面 -->
      <el-dialog title="修改页面" :visible.sync="dialogFormVisibleupdate" v-if='dialogFormVisibleupdate'>
             <up :ids="ids" v-on:isfrom="showMessageFromChild"></up>
      </el-dialog>


<!-- 修改页面 -->
      <el-dialog title="查看商品" :visible.sync="dialogFormVisibleshangpin" v-if='dialogFormVisibleshangpin'>
             <switchs :ids="ids" ></switchs>
      </el-dialog>

 </div>
</template>

<script>
import up from './role.vue';
import add from './directive.vue';
import spadd from './spadd.vue';
import switchs from './SwitchRoles.vue';

import { getToken } from '@/utils/auth'

  export default {
    data() {
      return {
        seckill:{
          skid:'',
          sktitle:'',
          sknumber:'',
          skstarttime:'',
          skstarttimeover:'',
          skendtime:'',
          skendtimeover:'',
          skstate:'',
          state:'',
        },
        status:'',
        tableData: [],
        pagesize: 5,
        currpage: 1,
        formstate:0,
        dialogFormVisible:false,
        dialogFormVisibleupdate:false,
        dialogFormVisibleshangpin:false,
        ids:'',
        id:'',
        dialogFormVisiblespadd:false,
      };
    },
    mounted(){
        this.loadData();
    },
    methods:{

        loadData:function() {
          console.log("/////////////////////////////*************************-------------------")
                  var th=this;
            this.$axios.get('/shopping_mall/seckill/queryList',{
               headers: { 'AUTHORIZATION': getToken() }
            })
           
            .then(function (response) {
               console.log(response.data+"***********************");
               th.tableData=response.data;
                console.log(response);
            })
             .catch(function (error) {
                console.log(error+"*-*-*-");
            });
        },

        handleDelete(index, row) {
          var th=this;
        this.getRequest('/shopping_mall/seckill/deleteById?skid='+row.skid)
        .then(function (response) {
              console.log(response)
                th.loadData();
        })
        .catch(function (error) {
          console.log(error);
        });

        },

        change (row){
           console.log(row.skstate);
           var th=this;
           if(row.state=="活动进行中"){
           this.$axios.get('/shopping_mall/seckill/updateSeckill', {
               params: {
                       skid:row.skid,
                   skstate:row.skstate
               }
             })
             .then(function (response) {
               console.log(response);
             })
             .catch(function (error) {
               console.log(error);
             });
           }else{
             row.skstate="2";
             alert("此活动已结束无法上架");
           }



        },

        handleCurrentChange(cpage) {
          if(this.formstate==0){
            this.loadData();
          }else{
            this.onSubmit();
          }
        			this.currpage = cpage;


        },

        handleSizeChange(psize) {
            if(this.formstate==0){
              this.loadData();
            }else{
              this.onSubmit();
            }
        			this.pagesize = psize;

        },

         onSubmit() {

var url='/shopping_mall/seckill/queryList';
              var th=this;
              xhrFields:{withCredentials:true};
              this.$axios.get(url,{
                params:{
                  sktitle:th.seckill.sktitle,
                  skstarttime:th.seckill.skstarttime,
                  skstarttimeover:th.seckill.skstarttimeover,
                  skendtime:th.seckill.skendtime,
                  skendtimeover:th.seckill.skendtimeover,
                  skstate:th.seckill.skstate
                }
              })
              .then(function (response) {
                th.tableData=response;
                th.formstate=1;
                  console.log(response);
              })
               .catch(function (error) {
                  console.log(error);
              });
        },

// 子类传给父类修改
        showMessageFromChild(data){
        		  this.dialogFormVisibleupdate=data;
        			  this.loadData();
          },
          // 子类传给父类添加
                  showMessageFromChildadd(data){
                  		  this.dialogFormVisible=data;
                  			  this.loadData();
                    },

          showMessageFromChildspadd(data){
            this.dialogFormVisiblespadd=data;
              this.loadData();
          },

          handleEdit(a,b){
             this.dialogFormVisibleupdate=true;
          		  this.ids=b.skid;
          },
// 重置form表单
       resetForm(formName) {
               this.$refs[formName].resetFields();
             },

   },
   components:{
   	up,add,spadd,switchs
   }
}
</script>
