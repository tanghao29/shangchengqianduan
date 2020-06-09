<template>
  <div>
      <el-table  :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)" border style="width: 100%">
        <el-table-column type="index" label="编号" width="150"></el-table-column>
        <el-table-column prop="cname" label="商品名称"></el-table-column>
       <el-table-column prop="ccname" property="ccname" label="参数"></el-table-column>
       <el-table-column prop="cenumber" property="cenumber" label="库存数量"></el-table-column>
       <el-table-column prop="cebuymoney" property="cebuymoney" label="进价"></el-table-column>
       <el-table-column prop="cesellmoney"   property="cesellmoney" label="售价"></el-table-column>
       <el-table-column prop="ceimg" property="ceimg" label="图片">
         <template>
           <el-image
               style="width: 100px; height: 100px"
               src='./'>
             </el-image>
         </template>
       </el-table-column>
       <el-table-column prop="cstate" property="cstate" label="状态">
         <template slot-scope="scope">
           <el-switch active-color="#13ce66" inactive-color="#ff4949" active-text="上架" inactive-text="下架" active-value=1 inactive-value=2  @change="change(scope.row)" ></el-switch>
         </template>
       </el-table-column>

        <el-table-column label="操作" >
          <template slot-scope="scope">
           <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">设置规格</el-button> -->
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
  </div>
</template>

<script>

  export default {
    data() {
      return {
        Commodity:{
          cid:'',
          cname:'',
          ccname:'',
          cenumber:'',
          cebuymoney:'',
          cesellmoney:'',
          ceimg:'',
          cstate:''

        },
        tableData: [],
        pagesize: 5,
        currpage: 1,
        formstate:0,
        dialogFormVisible:false,
        dialogFormVisibleupdate:false,
        ids:''
      };
    },
    mounted(){
        this.loadData();
    },
    methods:{

        loadData:function() {
                  var th=this;
            this.getRequest('/shopping_mall/commodity/queryList')
            .then(function (response) {
               th.tableData=response;
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
  }
}
</script>
