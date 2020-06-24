<template>
  <div>

<el-form ref="form" :model="Commodity" label-width="80px">
  <el-form-item label="商品名称">
    <el-input v-model="Commodity.cname"></el-input>
  </el-form-item>
  <el-form-item label="参数类型">
      <template>
        <el-select v-model="Commodity.ccid" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.ccid"
            :label="item.ccname"
            :value="item.ccid">
          </el-option>
        </el-select>
      </template>
  </el-form-item>
      <el-form-item label="是否上架">
       <el-radio-group v-model="Commodity.cstate">
         <el-radio label="1" >上架</el-radio>
         <el-radio label="2" >下架</el-radio>
       </el-radio-group>
      </el-form-item>
  <el-form-item>
    <el-form-item label="审核状态">
      <el-badge :value="weishnhe" class="item">
   <el-radio v-model="Commodity.cshenhe" label="未审核">未审核</el-radio>
</el-badge>
     <el-badge :value="weitongguo" class="item">
      <el-radio v-model="Commodity.cshenhe" label="未通过">未通过</el-radio>
     </el-badge>
      <el-badge :value="yitongguo" class="item">
      <el-radio v-model="Commodity.cshenhe" label="已审核">已审核</el-radio>
      </el-badge>
    </el-form-item>

    <el-button type="primary" @click="onsubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>


      <el-table  :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)" border style="width: 100%">
        <el-table-column type="index" label="编号" width="150"></el-table-column>
        <el-table-column prop="cname" label="商品名称"></el-table-column>
       <el-table-column prop="ccname" property="ccname" label="参数"></el-table-column>
       <el-table-column prop="cenumber" property="cenumber" label="库存数量"></el-table-column>
       <el-table-column prop="number" property="number" label="商品销量"></el-table-column>
       <el-table-column prop="cshenhe" property="cshenhe" label="审核状态"></el-table-column>
        <template>
           <el-image
               style="width: 100px; height: 100px"
               src='./'>
             </el-image>
         </template>
       </el-table-column>
       <el-table-column prop="cstate" property="cstate" label="状态">
         <template slot-scope="scope">
           <el-switch active-color="#13ce66" v-model="scope.row.cstate" inactive-color="#ff4949" active-text="上架" inactive-text="下架" active-value=1 inactive-value=2  @change="change(scope.row)" ></el-switch>
         </template>
       </el-table-column>

        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="dialogFormVisibleupdate = true,ids=scope.row.cid">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <div v-if="scope.row.cshenhe=='未审核'">
            <el-button size="mini" type="success" @click="tongguo(scope.row)">通过审核</el-button>
             <el-button size="mini" type="danger" @click="notongguo(scope.row)">不通过审核</el-button>
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


<!-- 修改页面 -->
      <el-dialog title="修改页面" :visible.sync="dialogFormVisibleupdate" v-if='dialogFormVisibleupdate'>
             <up :cids="ids" v-on:isfrom="showMessageFromChild"></up>
      </el-dialog>
  </div>
</template>

<script>
import up from './indexup.vue';
  export default {
    data() {
      return {
        Commodity:{
          cid:'',
          ccid:'',
          cname:'',
          ccname:'',
          cenumber:'',
          cebuymoney:'',
          cesellmoney:'',
          ceimg:'',
          cstate:'',
          cshenhe:'',

        },

        tableData: [],
        pagesize: 5,
        currpage: 1,
        formstate:0,
          options:[],
        dialogFormVisibleupdate:false,
        ids:'',
        formstate:'',
        weishnhe:'',
        weitongguo:'',
        yitongguo:'',
      };
    },
    mounted(){
        this.loadData();
        this.loadData2();
        this.loadweishnhe();
        this.loadweitongguo();
        this.loadyitongguo();
        },
    methods:{

     loadData() {
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
    loadweishnhe() {
                  var th=this;
            this.getRequest('/shopping_mall/commodity/queryweishnhe')
            .then(function (response) {
               th.weishnhe=response;
                console.log(response);
            })
             .catch(function (error) {
                console.log(error);
            });
        },

         loadweitongguo() {
                  var th=this;
            this.getRequest('/shopping_mall/commodity/queryweitongguo')
            .then(function (response) {
               th.weitongguo=response;
                console.log(response);
            })
             .catch(function (error) {
                console.log(error);
            });
        },

         loadyitongguo() {
                  var th=this;
            this.getRequest('/shopping_mall/commodity/queryyitongguo')
            .then(function (response) {
               th.yitongguo=response;
                console.log(response);
            })
             .catch(function (error) {
                console.log(error);
            });
        },



        onsubmit(){

          var th=this;
          this.getRequest('/shopping_mall/commodity/queryList?cname='+th.Commodity.cname+'&ccid='+th.Commodity.ccid+'&cstate='+th.Commodity.cstate+'&cshenhe='+this.Commodity.cshenhe)
          .then(function (response) {
            th.formstate=1;
             th.tableData=response;
              console.log(response);
          })
           .catch(function (error) {
              console.log(error);
          });


        },
        loadData2:function() {
                  var th=this;
                  this.getRequest('/shopping_mall/commodityclassification/queryCcList')
                  .then(function (response) {
                    th.options=response;
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
               },

 handleCurrentChange(cpage) {
    if(this.formstate!=null&&this.formstate==1){
      this.onsubmit();
    }else{
      this.loadData();
    }


        			this.currpage = cpage;


        },

        handleSizeChange(psize) {

            if(this.formstate!=null&&this.formstate==1){
              this.onsubmit();
            }else{
              this.loadData();
}

        			this.pagesize = psize;

        },
        change (row){
          var th=this;

          if( row.cshenhe=="未审核"){
             row.cstate="2";
             alert("此商品未审核无法上架");

          }else if(row.cshenhe=="未通过" ){
             row.cstate="2";
             alert("此商品审核未通过无法上架");
            }else{
              this.$axios.get('/shopping_mall/commodity/updatestate', {
               params: {
                       cid:row.cid,
                   cstate:row.cstate
               }
             })
             .then(function (response) {
            if(this.formstate!=null&&this.formstate==1){
              this.onsubmit();
            }else{
              this.loadData();
}
               console.log(response);
             })
             .catch(function (error) {
               console.log(error);
             });
          }

         

        },
       showMessageFromChild(date){
         this.dialogFormVisibleupdate=date;
       if(this.formstate!=null&&this.formstate==1){
         this.onsubmit();
       }else{
         this.loadData();
        }
       },
       tongguo(row){
           this.$axios.get('/shopping_mall/commodity/updatecshenhe', {
               params: {
                       cid:row.cid,
                   cshenhe:"已审核",
               }
             })
             .then(function (response) {
            if(this.formstate!=null&&this.formstate==1){
              this.onsubmit();
            }else{
              this.loadData();
}
               console.log(response);
             })
             .catch(function (error) {
               console.log(error);
             });
       },

 notongguo(row){
           this.$axios.get('/shopping_mall/commodity/updatecshenhe', {
               params: {
                       cid:row.cid,
                   cshenhe:"未通过",
               }
             })
             .then(function (response) {
            if(this.formstate!=null&&this.formstate==1){
              this.onsubmit();
            }else{
              this.loadData();
}
               console.log(response);
             })
             .catch(function (error) {
               console.log(error);
             });
       },


  },
  components:{
  	up
  },
}
</script>
