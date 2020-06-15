<template>
<div>

    <el-table  :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)" border style="width: 100%">
      <el-table-column type="index" label="编号" width="150"></el-table-column>
      <el-table-column prop="ccname" label="参数名"></el-table-column>

      <el-table-column label="操作" >
        <template slot-scope="scope">
         <el-button size="mini" type="primary" @click="dialogFormVisibleguige=true,guige=scope.row.ccid">设置规格</el-button>
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
  <el-button  type="primary" @click="dialogFormVisible = true">添加</el-button>
            <!-- 添加页面 -->
                  <el-dialog title="添加页面" :visible.sync="dialogFormVisible">
                     <add  v-on:isfromadd="showMessageFromChildadd"></add>
                  </el-dialog>

           <!-- 修改页面 -->
                  <el-dialog title="修改页面" :visible.sync="dialogFormVisibleupdate" v-if='dialogFormVisibleupdate'>
                         <up :test="ids" v-on:isfrom="showMessageFromChild"></up>
                  </el-dialog>
  <!-- 设置规格 -->
                  <el-dialog title="设置规格" :visible.sync="dialogFormVisibleguige" v-if='dialogFormVisibleguige'>
                         <opopo :tests="guige" v-on:isfromop="showMessageFromChildguige"></opopo>
                  </el-dialog>

</div>
</template>

<script>
  import upad from './complex-table.vue';
import add from "./drag-table.vue";
import up from "./up.vue";
import opopo from './complex-table.vue';


export default {
  name: 'InlineEditTable',
  data() {
    return {
      commodityclassification:{
            ccid:'',
            ccname:''
      },

      tableData:[],
      pagesize: 5,
      currpage: 1,
      dialogFormVisible:false,
      dialogFormVisibleupdate:false,
      ids:'',
      dialogFormVisibleguige:false,
      guige:'',


      }

  },
  mounted(){
      this.loadData();
  },
  methods: {

 loadData:function() {
                  var th=this;
            this.getRequest('/shopping_mall/commodityclassification/queryCcList')
            .then(function (response) {
               th.tableData=response;
                console.log(response);
            })
             .catch(function (error) {
                console.log(error);
            });
        },

 handleCurrentChange(cpage) {
          // if(this.formstate==0){
            this.loadData();
          // }else{
          //   this.onSubmit();
          // }
        			this.currpage = cpage;


        },

        handleSizeChange(psize) {
            // if(this.formstate==0){
              this.loadData();
            // }else{
            //   this.onSubmit();
            // }
        			this.pagesize = psize;

        },
        handleDelete(index, row) {
          var th=this;
        this.getRequest('/shopping_mall/commodityclassification/deleteCcById?ccid='+row.ccid)
        .then(function (response) {
              console.log(response)
                th.loadData();
        })
        .catch(function (error) {
          console.log(error);
        });

        },
        // 子类传给父类添加
                showMessageFromChildadd(data){
                		  this.dialogFormVisible=data;
                			  this.loadData();
                  },
                  // 子类传给父类修改
                          showMessageFromChild(data){
                          		  this.dialogFormVisibleupdate=data;
                          			  this.loadData();
                            },
               handleEdit(a,b){
                  this.dialogFormVisibleupdate=true;
               		  this.ids=b.ccid;
               },

        showMessageFromChildguige(dates){
          this.dialogFormVisibleguige=dates;
          	  this.loadData();

        },
    },
    components:{
    	add,up,upad,opopo
    }

}
</script>
