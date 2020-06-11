<template>
  <div>

<!-- 列表 -->
    <el-table  :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)" border style="width: 100%">

      <el-table-column type="index" label="编号" width="150"></el-table-column>
      <el-table-column prop="cname" label="商品名称"></el-table-column>
      <el-table-column prop="adnumber" sortable label="秒杀总数量"></el-table-column>
      <el-table-column prop="adprice" sortable label="秒杀价格"></el-table-column>
      <el-table-column prop="adxgnumber" sortable label="限购量"></el-table-column>
      <el-table-column prop="asksdatetime" sortable label="商品秒杀开始时间"></el-table-column>
      <el-table-column prop="asjsdatetime" sortable label="商品秒杀结束时间"></el-table-column>
      <el-table-column prop="asstate" property="asstate" label="活动状态">
        <template slot-scope="scope">
          <el-switch active-color="#13ce66" inactive-color="#ff4949" active-text="上架" inactive-text="下架" v-model="scope.row.asstate" active-value=1 inactive-value=2  @change="change(scope.row)" ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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

<!-- 修改页面 -->
      <el-dialog title="修改页面" :visible.sync="dialogFormVisibleupdate" v-if='dialogFormVisibleupdate'>
             <up :ids="ids" v-on:isfrom="showMessageFromChild"></up>
      </el-dialog>

  </div>
</template>



<script>

  import up from './msshangpinup.vue';

  export default {
    data() {
      return {
        activities:{
          asid:'',
          cname:'',
          adnumber:'',
          adprice:'',
          adxgnumber:'',
          asksdatetime:'',
          asjsdatetime:'',
          asstate:''
        },
        tableData: [],
        pagesize: 5,
        currpage: 1,
        formstate:0,
        dialogFormVisibleupdate:false,
        ids:'',
        skd:''

      };
    },
   mounted: function () {
     var id = this.$route.query.userid
     this.skd=id;

     console.log(id+"-----------------")
        this.loadData(id);
    },
    methods:{

        loadData:function(skid) {
            var th=this;
            this.getRequest('/shopping_mall/activities/queryActiviries?skid='+skid)
            .then(function (response) {
               th.tableData=response;
                console.log(response);
            })
             .catch(function (error) {
                console.log(error);
            });
        },
        handleCurrentChange(cpage) {
           this.loadData(this.skd);
        			this.currpage = cpage;
        },

        handleSizeChange(psize) {
              this.loadData(this.skd);
        			this.pagesize = psize;
        },

        change (row){
          var th=this;

           this.$axios.get('/shopping_mall/activities/updatestate', {
               params: {
                       asid:row.asid,
                   asstate:row.asstate
               }
             })
             .then(function (response) {
               this.loadData(th.skd);
               console.log(response);
             })
             .catch(function (error) {
               console.log(error);
             });

        },
        handleDelete(row){
          var th=this;
          this.$axios.get('/shopping_mall/activities/deleteById', {
              params: {
                      asid:row.asid
              }
            })
            .then(function (response) {
              th.loadData(th.skd);
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });

        },
        handleEdit(ins,row){
    this.dialogFormVisibleupdate=true;
          		  this.ids=row.skid;

        },
        showMessageFromChild(date,skid){

          this.dialogFormVisibleupdate=date;
          this.loadData(skid);
        }

   },
   components:{
   	up
   }

}
</script>
