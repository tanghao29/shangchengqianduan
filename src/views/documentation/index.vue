<template>
  
 <div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="browsecount"
      label="浏览人数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="ordersCount"
      label="下单人数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="ordersCounts"
      label="订单数"
       width="180">
    </el-table-column>
      <el-table-column
      prop="sumofnumber"
      label="下单件数"
        width="180">
    </el-table-column>
      <el-table-column
      prop="yxordersCounts"
      label="有效订单数"
        width="180">
    </el-table-column>
      <el-table-column
      prop="ordersMontey"
      label="下单金额"
      width="180">
    </el-table-column>
  </el-table>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="refundMoney"
      label="退款金额"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="付款人数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="付款订单数"
       width="180">
    </el-table-column>
      <el-table-column
      prop="address"
      label="付款件数"
        width="180">
    </el-table-column>
      <el-table-column
      prop="address"
      label="付款金额"
        width="180">
    </el-table-column>
      <el-table-column
      prop="address"
      label="客单价"
      width="180">
    </el-table-column>
  </el-table>
 </div>

</template>

<script>
export default {
      data() {
      return {
        tableData: [
          {browsecount:"",ordersCount:"",ordersCounts:"",sumofnumber:"",yxordersCounts:"",ordersMontey:"",refundMoney:""}


        ],
      }
    },
    mounted() {
      this.searchbrowse();
      this.ordersCount();
      this.ordersCounts();
      this.sumofnumber();
      this.yxordersCounts();
      this.ordersMontey();
      this.refundMoney();
    
  },
   methods: {
     searchbrowse(){
       	  this.$axios
				.get('/abc/browse/searchbrowse')
				.then((res) => {
                  this.tableData[0].browsecount=res
				})
				.catch((err) => {
				console.log(err);
        });
      
     },
     ordersCount(){
           	  this.$axios
				.get('/abc/browse/ordersCount')
				.then((res) => {
                  this.tableData[0].ordersCount=res
				})
				.catch((err) => {
				console.log(err);
        });
     },
     ordersCounts(){
        	  this.$axios
				.get('/abc/browse/ordersCounts')
				.then((res) => {
                  this.tableData[0].ordersCounts=res
				})
				.catch((err) => {
				console.log(err);
        });
       
     },
     sumofnumber(){

     	  this.$axios
				.get('/abc/browse/sumofnumber')
				.then((res) => {
                  this.tableData[0].sumofnumber=res
				})
				.catch((err) => {
				console.log(err);
        });

     },
     yxordersCounts(){
  this.$axios
				.get('/abc/browse/yxordersCounts')
				.then((res) => {
                  this.tableData[0].yxordersCounts=res
				})
				.catch((err) => {
				console.log(err);
        });
       
     },
     ordersMontey(){

  this.$axios
				.get('/abc/browse/ordersMontey')
				.then((res) => {
                  this.tableData[0].ordersMontey=res
				})
				.catch((err) => {
				console.log(err);
        });

     },
     refundMoney(){

 this.$axios
				.get('/abc/browse/refundMoney')
				.then((res) => {
                  this.tableData[0].refundMoney=res
				})
				.catch((err) => {
				console.log(err);
        });

     }


   }
}
</script>

<style>

</style>