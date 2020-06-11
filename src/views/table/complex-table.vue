<template>
    <div>

    <el-table  :data="loadDatas.slice((currpage - 1) * pagesize, currpage * pagesize)" border style="width: 100%">
      <el-table-column type="index" label="编号" width="150"></el-table-column>
      <el-table-column prop="ccname" label="参数名"></el-table-column>
      <el-table-column prop="sname" label="规格"></el-table-column>

      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="dialogFormVisibleupdate=true,ids=scope.row.sid">编辑</el-button>
          <el-button size="mini" type="primary" @click="dialogFormVisibleadd=true">添加</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
         </template>
      </el-table-column>
    </el-table>

    <!-- 列表分页 -->
        <el-pagination background
        			layout="prev, pager, next, sizes, total, jumper"
        			:page-sizes="[5, 10, 15, 20]"
        			:page-size="pagesize"
        			:total="loadDatas.length"
        			@current-change="handleCurrentChange"
        			@size-change="handleSizeChange">
        		</el-pagination>

  <!-- 修改页面 -->
        <el-dialog title="添加" :visible.sync="dialogFormVisibleadd" v-if='dialogFormVisibleadd'>
               <add v-on:isfromadd="showMessageFromChildadd"></add>
        </el-dialog>
<!-- 修改页面 -->
      <el-dialog title="修改页面" :visible.sync="dialogFormVisibleupdate" v-if='dialogFormVisibleupdate'>
             <up :ids="ids" v-on:isfrom="showMessageFromChild"></up>
      </el-dialog>
    </div>
</template>

<script>

import up from './guige.vue';
import add from './guigeadd.vue';
export default {
props:['tests'],
  data() {
    return {
        specification:{
          sid:'',
          ccid:'',
          sname:'',
          ccname:''
        },
        loadDatas:[],
        pagesize: 5,
        currpage: 1,
        dialogFormVisibleupdate:false,
        ids:'',
        dialogFormVisibleadd:'',
        id:'',
      }

  },
  mounted(){
    if(this.tests==null||this.tests==""){
      this.loadData();
    }else{
      this.id=this.tests;
      this.loadData2(this.tests);
    }

  },
  methods: {

    loadData:function() {
        var th=this;
        this.getRequest('/shopping_mall/specification/querySpecifcationList')
        .then(function (response) {
          th.loadDatas=response;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadData2:function(val) {
        var th=this;
        this.getRequest('/shopping_mall/specification/querySpecifcationList?ccid='+val)
        .then(function (response) {
          th.loadDatas=response;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleCurrentChange(cpage) {
      if(this.id==null||this.id==""){
        this.loadData();
      }else{

        this.loadData2(this.id);
      }

        this.currpage = cpage;
    },

    handleSizeChange(psize) {
       if(this.id==null||this.id==""){
         this.loadData();
       }else{

         this.loadData2(this.id);
       }
        this.pagesize = psize;
    },
    handleDelete(index,row){
      var th=this;
      if(this.id==null||this.id==""){
        this.getRequest('/shopping_mall/specification/deleteById?sid='+row.sid)
        .then(function (response) {

            th.loadData();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }else{

        this.getRequest('/shopping_mall/specification/deleteByccid?sid='+row.sid)
        .then(function (response) {


            th.loadData2(th.id);

          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }









    },
    showMessageFromChild(state){
      this.dialogFormVisibleupdate=state;
      if(this.id==null||this.id==""){
        this.loadData();
      }else{

        this.loadData2(this.id);
      }
    },
    showMessageFromChildadd(state){
      this.dialogFormVisibleadd=state;
     if(this.id==null||this.id==""){
       this.loadData();
     }else{

       this.loadData2(this.id);
     }
    }


  },
 components:{
   	up,add
   },
}

</script>
