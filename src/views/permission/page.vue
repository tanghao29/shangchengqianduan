<template >
   <el-table :data="tableData" border style="width: 100%">
    <el-table-column type="index" label="编号" width="150"></el-table-column>
    <el-table-column prop="sktitle" label="秒杀标题"></el-table-column>
    <el-table-column prop="skstarttime" sortable label="秒杀开始时间"></el-table-column>
    <el-table-column prop="skendtime" sortable label="秒杀结束时间"></el-table-column>
    <el-table-column prop="skstate" property="skstate" label="活动状态">

             <template slot-scope="scope">
                        <el-switch
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                          active-text="上架"
                          inactive-text="下架"
                          v-model="scope.row.skstate"
                          :active-value="1"
                          :inactive-value="0"
                          @change="change(scope.row)"
                        ></el-switch>
                      </template>

    </el-table-column>
    <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">设置商品</el-button>
        <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
       </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        seckill:{
          skid:'',
          sktitle:'',
          skstarttime:'',
          skendtime:'',
          skstate:''
        },
        tableData: [{
          skid:'1',
          sktitle:'服装大甩卖',
          skstarttime:'2020-06-05 10:30:39',
          skendtime:'2020-06-05 10:30:39',
          skstate:'1'
        }]
      };
    },
    mounted(){
        this.loadData();
    },
   methods:{
        loadData:function() {
                  var th=this;
            this.$axios.get('http:localhost:8090/shopping_mall/seckill/queryList')
            .then(function (response) {
               th.tableData=response.data;
                console.log(response);
                console.log(th.list);
            })
             .catch(function (error) {
                console.log(error);
            });
        },
        handleDelete(index, row) {
          var th=this;
            this.$axios.get("http:localhost:8090/shopping_mall/seckill/deleteById",{
              params:{
                skid:row.skid
              }
            })
        .then(function (response) {
              console.log(response)
                th.loadData();
        })
        .catch(function (error) {
          console.log(error);
        });

        },
        change (row){
           console.log(row);       
        }

   }
}
</script>
