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
    <div style="margin-top:10px;margin-left:200px">
      <el-table v-loading="loading" :data="goodsIn" border stripe size="small">
        <el-table-column prop="ceid" label="编号" width="118" align="left"></el-table-column>

        <el-table-column label="商品图片" width="146" align="center">
          <template slot-scope="scope">
            <el-image v-image-preview style="width:146px;height:100px" :src="scope.row.ceimg">
              <div slot="error" class="image-slot" style="width:90px;height:90px">
                <i class="el-icon-picture-outline">图片被吃掉了</i>
              </div>
            </el-image>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="ceimg" label="商品图片" width="146" align="center">
          <img v-image-preview width="146" height="90" :src="goodsIn.ceimg" alt="商品图片" />
        </el-table-column>-->
        <el-table-column prop="commodity.cname" label="商品名称" width="138" align="center"></el-table-column>
        <el-table-column prop="cedate" label="入库时间" width="150" align="center"></el-table-column>
        <el-table-column prop="cebuymoney" label="入库价格" width="115" align="center"></el-table-column>
        <el-table-column prop="cesellmoney" label="出售价格" width="100" align="center"></el-table-column>
        <el-table-column prop="user.uname" label="操作人" width="158" align="center"></el-table-column>
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

    <!-- 入库添加   开始  -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="80%">
      <div>
        <el-form :model="addGoods">
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="商品名称：" prop="cid">
                <el-input
                  v-model="addGoods.cid"
                  size="mini"
                  style="width: 150px"
                  prefix-icon="el-icon-edit"
                  placeholder="请输入商品名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="商品图片：" prop="ceimg">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="入库数量：" prop="cenumber">
                <el-input
                  v-model="addGoods.cenumber"
                  size="mini"
                  style="width: 150px"
                  prefix-icon="el-icon-edit"
                  placeholder="请输入入库数量"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="入库价格：" prop="cebuymoney">
                <el-input
                  v-model="addGoods.cebuymoney"
                  size="mini"
                  style="width: 150px"
                  prefix-icon="el-icon-edit"
                  placeholder="请输入入库价格"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="商品参数：" prop="ccid">
                <el-select
                  v-model="addGoods.ccid"
                  placeholder="商品参数"
                  size="mini"
                  style="width: 150px;"
                >
                  <el-option></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="商品规格：" prop="sid">
                <el-select
                  v-model="addGoods.sid"
                  placeholder="商品规格"
                  size="mini"
                  style="width: 150px;"
                >
                  <el-option></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="display:flex;justify-content:center">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAddGoodsIn">确 定</el-button>
      </span>
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
      searchValue: {
        cname: null,
        uname: null,
        cebuymoney: null,
        beginDate: null,
        cesellmoney: null
      },
      addGoods: {
        cid: 1,
        ceimg: null,
        cenumber: null,
        cebuymoney: null,
        ccid: 1,
        sid: 1
      }
    };
  },
  mounted() {
    this.initGoodsIn();
  },
  methods: {
    uploadSuccess(res, file) {
      this.imageUrl = res.obj;
      this.addGoods.ceimg = res.obj;
    },
    doAddGoodsIn() {
      // this.postRequest(
      //   "/shopping_mall/commodityentry/",
      //   JSON.stringify(this.addGoods)
      // ).then(resp => {
      //   if (resp) {
      //     this.dialogVisible = false;
      //     this.initGoodsIn();
      //   }
      // });

      // axios
      //   .post("/shopping_mall/commodityentry/", JSON.stringify(this.addGoods), {
      //     headers: {
      //       // 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8' 如果使用上面的方式会报415 数据类型异常的问题

      //       "Content-Type": "application/json; charset=UTF-8"
      //     }
      //   })
      //   .then(res => {
      //     if (res) {
      //       this.dialogVisible = false;
      //       this.initGoodsIn();
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });

      axios
        .post("/shopping_mall/commodityentry/", {
          cid: this.addGoods.cid,
          cenumber: this.addGoods.cenumber,
          cebuymoney: this.addGoods.cebuymoney,
          ccid: this.addGoods.ccid,
          sid: this.addGoods.sid
        })
        .then(res => {
          if (res) {
            this.dialogVisible = false;
            this.initGoodsIn();
          }
        })
        .catch(err => {
          console.log(err);
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