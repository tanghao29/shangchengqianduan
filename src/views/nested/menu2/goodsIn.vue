<template>
  <!-- 包裹着 搜索  表格  弹出层 -->
  <div>
    <div>
      <!-- 头部搜索 开始 -->
      <div style="display:flex;justify-content:space-between;margin-top:13px">
        <div>
          <el-input
            v-model="searchValue.cname"
            placeholder="输入商品名称搜索，可以直接回车搜索"
            prefix-icon="el-icon-search"
            clearable
            style="width:350px;margin-right:18px;margin-left:26px"
            :disabled="showAdvanceSearchView"
            @clear="initGoodsIn"
            @keydown.enter.native="initGoodsIn"
          />
          <el-button
            icon="el-icon-search"
            type="primary"
            size="mini"
            :disabled="showAdvanceSearchView"
            @click="initGoodsIn"
          >搜索</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="showAdvanceSearchView =!showAdvanceSearchView"
          >
            <i
              :class="showAdvanceSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'"
              aria-hidden="true"
            />
            高级搜索
          </el-button>
        </div>
        <div style="margin-right:30px">
          <el-button size="small" icon="el-icon-refresh" type="success" @click="initGoodsIn" />
          <el-button type="primary" size="small" icon="el-icon-plus" @click="showAddGoods">新增入库</el-button>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="dialogVisibleyiyou=true">已有入库</el-button>
        </div>
      </div>
      <!-- 头部搜索 结束 -->

      <!-- 高级搜索   开始 -->
      <transition name="slide-fade">
        <div
          v-show="showAdvanceSearchView"
          style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding: 10px;margin: 20px 20px;"
        >
          <el-row :gutter="20">
            <el-col :span="7">
              操作人：
              <el-input
                v-model="searchValue.uname"
                clearable
                style="width:180px"
                size="mini"
                placeholder="操作人..."
              />
            </el-col>

            <el-col :span="10">
              操作时间：
              <el-date-picker
                v-model="searchValue.beginDate"
                type="daterange"
                size="mini"
                unlink-panels
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-col>
            <el-col :span="7">
              出售价格：
              <el-input
                v-model="searchValue.cesellmoney"
                clearable
                style="width:180px"
                size="mini"
                placeholder="出售价格..."
              />
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:6px">
            <el-col :span="7">
              入库价格：
              <el-input
                v-model="searchValue.cebuymoney"
                clearable
                style="width:180px"
                size="mini"
                placeholder="入库价格..."
              />
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px" type="flex" justify="center">
            <el-col :span="5" :offset="4">
              <el-button size="mini" @click="showAdvanceSearchView = !showAdvanceSearchView">取消</el-button>
              <el-button
                size="mini"
                icon="el-icon-search"
                type="primary"
                @click="initGoodsIn('advanced')"
              >搜索</el-button>
            </el-col>
          </el-row>
        </div>
      </transition>
      <!-- 高级搜索  结束  -->
    </div>

    <!-- 表格 开始 -->
    <div style="width:100%">
      <el-table v-loading="loading" :data="goodsIn" border stripe size="mini">
        <el-table-column prop="ceid" label="编号" width="118" align="left" />
        <el-table-column prop="cid" label="商品图片" width="146" align="center">
          <!-- <img width="166" height="80" :src="goodsIn.ceimg" alt="商品图片" /> -->
          <img v-image-preview width="146" height="90" src="./banner2.jpg" alt="商品图片">
        </el-table-column>
        <el-table-column prop="commodity.cname" label="商品名称" width="138" align="center" />
         <!-- <el-table-column prop="cenumber" label="库存量" width="300" align="center"  > -->
          <el-table-column
      label="库存量"
      width="180">
      <template slot-scope="scope">
  
        <input  type="text" v-model="shuliagn[scope.$index]"  @keyup.enter="huiceshijian(scope.row,scope.$index)"/>

            <el-tag size="medium">{{ scope.row.cenumber }}</el-tag>
   
    
      </template>
    </el-table-column>
         <!-- </el-table-column> -->
        <el-table-column prop="cedate"  label="入库时间" width="150" align="center" />
        <el-table-column prop="cebuymoney" label="入库价格" width="115" align="center" />
        <el-table-column prop="cesellmoney" label="出售价格" width="100" align="center" />
        <el-table-column prop="user.uname" label="操作人" width="158" align="center" />
      </el-table>
      <!-- 分页开始 -->
      <div style="display: flex;justify-content: flex-end;margin-top:8px;margin-right:60px">
        <el-pagination
          background
          layout="sizes, prev, pager, next, jumper, ->, total, slot"
          :total="total"
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </div>
      <!-- 分页结束 -->
    </div>

    <!-- 未有入库添加   开始  -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="80%">
    <div>

      <el-form ref="form" :model="commodity" label-width="80px">
  <el-form-item label="商品名称">
    <el-input v-model="commodity.cname"></el-input>
  </el-form-item>

 <el-form-item label="商品参数">

  <el-select v-model="commodity.ccid" filterable @change="chanfcanshu(this.value)" placeholder="请选择商品参数">
    <el-option
      v-for="item in options"
      :key="item.ccid"
      :label="item.ccname"
      :value="item.ccid">
    </el-option>
  </el-select>

  </el-form-item>
 <el-form-item label="数量">
     <el-input v-model="commodity.cenumber"></el-input>
  </el-form-item>
   <el-form-item label="图片">
    <el-upload
  class="avatar-uploader"
  :action="srcimages"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
   <el-form-item label="商品所属用户">
      <el-select v-model="commodity.uid" filterable  placeholder="请选择用户">
    <el-option
      v-for="item in options2"
      :key="item.uid"
      :label="item.uname"
      :value="item.uid">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item label="进价">
    <el-input v-model="commodity.cebuymoney"></el-input>
  </el-form-item>
   <el-form-item label="售价">
    <el-input v-model="commodity.cesellmoney"></el-input>
  </el-form-item>
  <el-form-item label="规格">
  <el-select v-model="commodity.sid" filterable placeholder="请选择商品参数">
    <el-option
      v-for="item in options3"
      :key="item.sid"
      :label="item.sname"
      :value="item.sid">
    </el-option>
  </el-select>
  </el-form-item >
  <el-form-item label="规格颜色" v-if="commodity.ccid=='1'">
    <el-color-picker v-model="commodity.cecoloutr"></el-color-picker>
  </el-form-item>





  
  <el-form-item>
    <el-button type="primary" @click="onsubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

    </div>
 
    </el-dialog>


  <!-- 已有入库添加   开始  -->
    <el-dialog title="已有商品入库" :visible.sync="dialogVisibleyiyou" width="80%">
    <div>
        {{commodity.ccname}}
      <el-form ref="form" :model="commodity" label-width="80px">
  <el-form-item label="商品名称">
  <el-select v-model="commodity.cid" filterable @change="changcommity"  placeholder="请选择商品参数">
    <el-option
      v-for="item in options4"
      :key="item.cid"
      :label="item.cname"
      :value="item.cid">
    </el-option>
  </el-select>

  </el-form-item>
 <el-form-item label="商品参数">
<el-input v-model="commodity.ccname" readonly></el-input>

  </el-form-item>
 <el-form-item label="数量">
     <el-input v-model="commodity.cenumber"></el-input>
  </el-form-item>
   <el-form-item label="图片">
    <el-upload
  class="avatar-uploader"
  :action="srcimages"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
   <el-form-item label="商品所属用户">
      <el-select v-model="commodity.uid" filterable  placeholder="请选择用户">
    <el-option
      v-for="item in options2"
      :key="item.uid"
      :label="item.uname"
      :value="item.uid">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item label="进价">
    <el-input v-model="commodity.cebuymoney"></el-input>
  </el-form-item>
   <el-form-item label="售价">
    <el-input v-model="commodity.cesellmoney"></el-input>
  </el-form-item>
  <el-form-item label="规格">
  <el-select v-model="commodity.sid" filterable placeholder="请选择商品参数">
    <el-option
      v-for="item in options3"
      :key="item.sid"
      :label="item.sname"
      :value="item.sid">
    </el-option>
  </el-select>
  </el-form-item >
  <el-form-item label="规格颜色" v-if="commodity.ccid=='1'">
    <el-color-picker v-model="commodity.cecoloutr"></el-color-picker>
  </el-form-item>





  
  <el-form-item>
    <el-button type="primary" @click="onsubmityiyou">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

    </div>
 
    </el-dialog>



  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GoondIn",

  data() {
    return {
      imageUrl: null, // 上传图片回显
      uploadUrl: process.env.VUE_APP_UPLOAD_URL, // 上传图片路径
      total: 0,
      page: 1,
      size: 10,
      showAdvanceSearchView: false,
      loading: false,
      goodsIn: [],
      title: "新增入库",
      dialogVisible: false,
      dialogVisibleyiyou:false,
      searchValue: {
        cname: null,
        uname: null,
        cebuymoney: null,
        beginDate: null,
        cesellmoney: null
      },
      commodity:{
        cid:'',
          cname:'',
          ccid:'',
          cenumber:'',
          ceimg:'',
          uid:'',
          cebuymoney:'',
          cesellmoney:'',
          sid:'',
          cecoloutr:'',
          ccname:'',

      },
      options:[],
      options2:[],
      options3:[],
      options4:[],
       imageUrl: '',
        srcimages:'/upload/uploadImage',
        shuliagn:[],

    }
  },
  mounted() {
    this.initGoodsIn();
    this.onloadcanshu();
    this.onloaduser();
    this.oladcommity();
  },
  methods: {
    huiceshijian(row,indexs){
        console.log(row);
        console.log(Number(row.cenumber)+Number( this.shuliagn[indexs]));
        var th=this;
 this.$axios.get('/shopping_mall/commodityentry/updatecenumber',{
            params:{
           ceid:row.ceid,
           cenumber:Number(row.cenumber)+Number( this.shuliagn[indexs]),

          }})
              .then(function (response) {
                    th.initGoodsIn();
                  console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });


    },
    changcommity(data){
      var th=this;
          console.log(th.commodity)
          this.$axios.get('/shopping_mall/commodity/queryById',{
            params:{
           cid:data,

          }})
              .then(function (response) {
                  th.commodity.ccname=response.ccname;

                  th.chanfcanshu(response.ccid);
                  console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
       
    },
    onsubmit(){
          var th=this;
          console.log(th.commodity)
          this.$axios.get('/shopping_mall/commodityentry/save',{

            params:{
           cname:this.commodity.cname,
          ccid:this.commodity.ccid,
          cenumber:this.commodity.cenumber,
          ceimg:this.commodity.ceimg,
          uid:this.commodity.uid,
          cebuymoney:this.commodity.cebuymoney,
          cesellmoney:this.commodity.cesellmoney,
          sid:this.commodity.sid,
          cecoloutr:this.commodity.cecoloutr,


          }})
              .then(function (response) {
             th.dialogVisible = false;
             th.commodity='';
             th.imageUrl='';
             th.initGoodsIn();
                  console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

    },
    
        onsubmityiyou(){
          var th=this;
          console.log(th.commodity)
          this.$axios.get('/shopping_mall/commodityentry/save',{

            params:{
              cid:this.commodity.cid,
           cname:this.commodity.cname,
          ccid:this.commodity.ccid,
          cenumber:this.commodity.cenumber,
          ceimg:this.commodity.ceimg,
          uid:this.commodity.uid,
          cebuymoney:this.commodity.cebuymoney,
          cesellmoney:this.commodity.cesellmoney,
          sid:this.commodity.sid,
          cecoloutr:this.commodity.cecoloutr,


          }})
              .then(function (response) {
             th.dialogVisibleyiyou = false;
             th.commodity='';
             th.imageUrl='';
             th.initGoodsIn();
                  console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

    },
    handleAvatarSuccess(res, file) {
      this.commodity.ceimg = URL.createObjectURL(file.raw);
      this.imageUrl = URL.createObjectURL(file.raw);
      },
           beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    onloaduser(){
    var th=this;
          this.$axios.get('/shopping_mall/user/userqueryall')
              .then(function (response) {
                th.options2=response;
                  console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
    },
     oladcommity(){
    var th=this;
          this.$axios.get('/shopping_mall/commodity/queryListCommodtiy')
              .then(function (response) {
                th.options4=response;
                  console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
    },

    onloadcanshu(){
      var th=this;
       this.$axios.get('/shopping_mall/commodityclassification/queryCcList')
    		  .then(function (response) {
            th.options=response;
              console.log(response);
    		  })
    		  .catch(function (error) {
    		    console.log(error);
    		  });
    }, 
    chanfcanshu(ccid){
var th=this;
       this.$axios.get('/shopping_mall/specification/querySpecifcationList?ccid='+this.commodity.ccid)
    		  .then(function (response) {
            th.options3=response;
            th.commodity.ccname=th.options3[0].ccname;
            console.log(th.options3[0].ccname+"*********")
              console.log(response);
    		  })
    		  .catch(function (error) {
    		    console.log(error);
    		  });
    },

    showAddGoods() {
      this.dialogVisible = true;
    },
    currentChange(page) {
      this.page = page;
      this.initGoodsIn();
    },
    sizeChange(size) {
      this.size = size;
      this.initGoodsIn();
    },
    initGoodsIn(type) {
      this.loading = true;
      let url =
        "/shopping_mall/commodityentry/?page=" +
        this.page +
        "&size=" +
        this.size;
      if (type && type === "advanced") {
        if (this.searchValue.cid) {
          url += "&cid=" + this.searchValue.cid;
        }
        if (this.searchValue.uname) {
          url += "&uname=" + this.searchValue.uname;
        }
        if (this.searchValue.cebuymoney) {
          url += "&cebuymoney=" + this.searchValue.cebuymoney;
        }
        if (this.searchValue.cesellmoney) {
          url += "&cesellmoney=" + this.searchValue.cesellmoney;
        }
        if (this.searchValue.beginDate) {
          url += "&beginDate=" + this.searchValue.beginDate;
        }
      }
      this.getRequest(url).then(resp => {
        this.loading = false;
        if (resp) {
          this.goodsIn = resp.data;
          this.total = resp.total;
        }
        this.searchValue = {
          uname: null,
          cebuymoney: null,
          beginDate: null,
          cesellmoney: null
        };
      });
    }
  }
};
</script>
<style>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.6s ease;
}

.slide-fade-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
 {
  transform: translateX(10px);
  opacity: 0;
}

.el-dialog__body {
  padding: 20px 45px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 158px;
  height: 158px;
  line-height: 158px;
  text-align: center;
}
.avatar {
  width: 158px;
  height: 158px;
  display: block;
}

.el-icon-picture-outline {
  display: inline-block;
  background-position: center center;
  background-size: 70px 70px;
}
</style>