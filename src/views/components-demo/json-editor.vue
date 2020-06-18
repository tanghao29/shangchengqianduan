<template>
  <div>
      <div>
              <el-form ref="form" :model="salesreturn" label-width="80px">
        <el-form-item label="服务单号">
  <el-select v-model="salesreturn.ofid" filterable placeholder="请选择">
    <el-option
      v-for="item in options1"
      :key="item.ofid"
      :label="item.ofid"
      :value="item.ofid">
    </el-option>
  </el-select>

        </el-form-item>
        <el-form-item label="用户账号">
           <el-select v-model="salesreturn.asid" filterable placeholder="请选择">
    <el-option
      v-for="item in options2"
      :key="item.asid"
      :label="item.asid"
      :value="item.asid">
    </el-option>
  </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="salesreturn.srstate" placeholder="请选择状态">
            <el-option label="待处理" value="待处理"></el-option>
            <el-option label="退货中" value="退货中"></el-option>
            <el-option label="已拒绝" value="已拒绝"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间区间/确定时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="salesreturn.srsqdate" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker placeholder="选择时间" v-model="salesreturn.srsqdateover" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onsubmit()">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table  :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)" border style="width:100%">
      <el-table-column type="index" label="编号"></el-table-column>
      <el-table-column prop="ofid" label="订单编号"></el-table-column>
      <el-table-column prop="srcause" label="退货原因"></el-table-column>
      <el-table-column prop="srsqdate" label="申请时间"></el-table-column>
      <el-table-column prop="srstate" label="申请状态"> </el-table-column>
      <el-table-column prop="activities.adnumber" label="用户账号"> </el-table-column>
      <el-table-column prop="orderform.ofmoney" label="退款金额"> </el-table-column>
      <el-table-column prop="srcldate" label="上次处理时间"> </el-table-column>
      <el-table-column label="操作" width="200">
          <template slot-scope="scope" >
            <div v-if="scope.row.srstate=='待处理'">
                <el-button size="mini" type="success" @click="tuihuo(scope.row)">退货/退款</el-button>
                <el-button size="mini" type="danger" @click="jujue(scope.row)">拒绝</el-button>
            </div>
            <div v-if="scope.row.srstate=='退货中'">
              <el-button size="mini" type="success" @click="wancheng(scope.row)">已退货/退款</el-button>
            </div>
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
  
  </div>
</template>

<script>

export default {
  data() {
    return {
      salesreturn:{
        ofid:'',
        asid:'',
        srstate:'',
        srsqdate:'',
        srsqdateover:'',
      },
      tableData:[],
      pagesize: 5,
      currpage: 1,
      loadurl:'/shopping_mall/salesreturn/querySalesreturn',
      options1:[],
      options2:[],
      }

  },
  mounted(){
      this.loadData();
      this.loadofid();
      this.loadasid();
  },
  methods: {

 loadData:function() {
                  var th=this;
            this.getRequest(th.loadurl)
            .then(function (response) {
               th.tableData=response;
                console.log(response);
            })
             .catch(function (error) {
                console.log(error);
            });
        },
         loadofid:function() {
                  var th=this;
            this.getRequest('/shopping_mall/orderform/querylsit')
            .then(function (response) {
               th.options1=response;
                console.log(response);
            })
             .catch(function (error) {
                console.log(error);
            });
        },
 loadasid:function() {
                  var th=this;
            this.getRequest('/shopping_mall/activities/querylist')
            .then(function (response) {
               th.options2=response;
                console.log(response);
            })
             .catch(function (error) {
                console.log(error);
            });
        },


        handleCurrentChange(cpage) {
            this.loadData();
        			this.currpage = cpage;
        },
        handleSizeChange(psize) {
              this.loadData();
    
        			this.pagesize = psize;

        },
        tuihuo(row){
          
            var th=this;
            this.getRequest('/shopping_mall/salesreturn/tuihuokuan?srid='+row.srid+'&srstate=退货中')
            .then(function (response) {
              th.loadData();
                console.log(response);
            })
             .catch(function (error) {
                console.log(error);
            });

        },

         jujue(row){
          
            var th=this;
            this.getRequest('/shopping_mall/salesreturn/tuihuokuan?srid='+row.srid+'&srstate=已拒绝')
            .then(function (response) {
              th.loadData();
                console.log(response);
            })
             .catch(function (error) {
                console.log(error);
            });

        },
         wancheng(row){
          
            var th=this;
            this.getRequest('/shopping_mall/salesreturn/tuihuokuan?srid='+row.srid+'&srstate=已完成')
            .then(function (response) {
              th.loadData();
                console.log(response);
            })
             .catch(function (error) {
                console.log(error);
            });

        },
        onsubmit(){

            console.log(this.salesreturn);
             var th=this;
            this.loadurl="/shopping_mall/salesreturn/querySalesreturn?ofid="+this.salesreturn.ofid+"&asid="+this.salesreturn.asid+"&srstate="+this.salesreturn.srstate+"&srsqdate="+this.salesreturn.srsqdate+"&srsqdateover="+this.salesreturn.srsqdateover
            this.getRequest(this.loadurl)
            .then(function (response) {
              th.tableData=response;
                console.log(response);
            })
             .catch(function (error) {
                console.log(error);
            });


        },

    },
 

}
</script>

<style>

</style>

