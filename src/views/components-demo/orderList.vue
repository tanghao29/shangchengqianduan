<template>
  <div>
    <div>
      <!-- 头部搜索  开始 -->
      <div style="display: flex;justify-content: space-between;margin-top:13px">
        <div>
          <el-input
            v-model="keyword"
            placeholder="请输入订单编号进行搜索，可以直接回车搜索..."
            prefix-icon="el-icon-search"
            clearable
            style="width: 350px;margin-right: 18px;margin-left:26px"
            :disabled="showAdvanceSearchView"
            @clear="initOrder"
            @keydown.enter.native="initOrder"
          />
          <el-button
            icon="el-icon-search"
            type="primary"
            size="small"
            :disabled="showAdvanceSearchView"
            @click="initOrder"
          >搜索</el-button>
          <el-button
            size="small"
            type="primary"
            @click="showAdvanceSearchView = !showAdvanceSearchView"
          >
            <i
              :class="showAdvanceSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'"
              aria-hidden="true"
            />
            高级搜索
          </el-button>
        </div>
        <div style="margin-right:30px">
          <el-button icon="el-icon-refresh" type="success" @click="initOrder" />
          <el-button type="success" size="small" icon="el-icon-download" @click="exportData">导出数据</el-button>
        </div>
      </div>
      <!-- 头部搜索  结束 -->

      <!-- 高级搜索   开始 -->
      <transition name="slide-fade">
        <div
          v-show="showAdvanceSearchView"
          style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding: 10px;margin: 20px 20px;"
        >
          <el-row :gutter="20">
            <el-col :span="7">
              收货人：
              <el-input
                v-model="ofshname"
                clearable
                style="width:180px"
                size="mini"
                placeholder="姓名..."
              />
            </el-col>
            <el-col :span="8">
              订单状态：
              <el-radio-group v-model="ofstate">
                <el-radio label="-1">退货中</el-radio>
                <el-radio label="1">待发货</el-radio>
                <el-radio label="2">已发货</el-radio>
                <el-radio label="3">退款中</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="9">
              订单生成时间：
              <el-date-picker
                v-model="beginDate"
                type="daterange"
                size="mini"
                unlink-panels
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:6px">
            <el-col :span="7">
              收货人电话：
              <el-input
                v-model="ofshphone"
                clearable
                style="width:180px"
                size="mini"
                placeholder="收货人电话..."
              />
            </el-col>
            <el-col :span="7">
              收货人地址：
              <el-input
                v-model="ofshsite"
                clearable
                style="width:180px"
                size="mini"
                placeholder="收货人地址..."
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
                @click="initOrder('advanced')"
              >搜索</el-button>
            </el-col>
          </el-row>
        </div>
      </transition>
      <!-- 高级搜索  结束  -->
    </div>
    <!-- 表格 开始 -->
    <div style="margin-top:10px;margin-left:26px;margin-right:26px">
      <el-table v-loading="loading" :data="orders" border stripe size="mini">
        <el-table-column prop="ofid" label="编号" width="120" align="left" />
        <el-table-column prop="ofnumber" label="订单数量" width="90" align="center" />
        <el-table-column prop="ofdate" label="订单生成时间" width="140" align="center" />
        <el-table-column prop="ofmoney" label="订单金额" width="108" align="center" />
        <el-table-column prop="ofshname" label="收货人名称" width="115" align="center" />
        <el-table-column prop="ofshphone" label="收货人电话" width="138" align="center" />
        <el-table-column prop="ofshsite" label="收货人地址" width="168" align="center" />
        <el-table-column prop="ofstate" label="订单状态" align="center" width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.ofstate=='-1'">退货中</el-tag>
            <el-tag v-else-if="scope.row.ofstate=='1'" type="info">已发货</el-tag>
            <el-tag v-else-if="scope.row.ofstate=='2'" type="success">待发货</el-tag>
            <el-tag v-else-if="scope.row.ofstate=='3'" type="danger">待付款</el-tag>
            <el-tag v-else-if="scope.row.ofstate=='4'" type="danger">退款中</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="small"
              @click="showEditView(scope.$index,scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页开始 -->
      <div style="display: flex;justify-content: flex-end">
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

    <!-- 修改的弹出框  开始 -->
    <el-dialog title="修改订单地址" :visible.sync="dialogVisible" width="30%">
      <div>
        <div>
          <!-- <el-tag>地址</el-tag>
          <el-input v-model="updatePos.ofshsite" class="updatePostion" size="small" />-->
             <el-form
        :model="addressForm"
        :rules="addressFormRules"
        ref="addressFormRef"
        label-width="100px"
      >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            v-model="addressForm.address1"
            :options="cityData"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import cityData from "./citydata.js";
export default {
  name: "OrderList",
  data() {
    return {
      orders: [],
      total: 0,
      page: 1,
      size: 10,
      loading: false,
      keyword: "",
      showAdvanceSearchView: false,
      ofshname: "",
      ofstate: "",
      beginDate: null,
      ofshphone: "",
      ofshsite: "",
      dialogVisible: false,
      updatePos: {
        ofshsite: ""
      },
      // 修改地址对话框
      addressDialogVisible: false,
      addressForm: {
        address1: [],
        address2: ""
      },
      addressFormRules: {
        address1: [
          { required: true, message: "请选择省市区县", trigger: "blur" }
        ],
        address2: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      },
      cityData
    };
  },
  mounted() {
    this.initOrder();
  },
  methods: {
    nullGoods() {
      (this.ofshname = ""),
        (this.ofstate = ""),
        (this.beginDate = null),
        (this.ofshphone = ""),
        (this.ofshsite = "");
    },
    showEditView(index, data) {
      // 这里data就是你点击的那一行的数据
      Object.assign(this.updatePos, data); // 变量拷贝，js语法， 第一个参数拷贝到哪去
      this.dialogVisible = true;
    },
    doUpdate() {
      this.putRequest("/shopping_mall/orderform/", this.updatePos).then(
        resp => {
          if (resp) {
            // 表示更新成功
            this.initOrder();
            this.updatePos.ofshsite = ""; // 恢复 name 的值
            this.dialogVisible = false;
          }
        }
      );
    },
    sizeChange(size) {
      this.size = size;
      this.initOrder();
    },
    currentChange(page) {
      this.page = page;
      this.initOrder();
    },
    initOrder(type) {
      this.loading = true;
      // 组装url
      let url =
        "/shopping_mall/orderform/?page=" + this.page + "&size=" + this.size;
      if (type && type === "advanced") {
        if (this.ofshname) {
          url += "&ofshname=" + this.ofshname;
        }
        if (this.beginDate) {
          url += "&beginDate=" + this.beginDate;
        }
        if (this.ofshphone) {
          url += "&ofshphone=" + this.ofshphone;
        }
        if (this.ofstate) {
          url += "&ofstate=" + this.ofstate;
        }
        if (this.ofshsite) {
          url += "&ofshsite=" + this.ofshsite;
        }
      }
      this.getRequest(url).then(resp => {
        this.loading = false;
        if (resp) {
          this.orders = resp.data;
          this.total = resp.total;
        }
        (this.ofshname = ""),
          (this.ofstate = ""),
          (this.beginDate = null),
          (this.ofshphone = ""),
          (this.ofshsite = "");
        this.showAdvanceSearchView = false;
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
.updatePostion {
  width: 200px;
  margin-left: 8px;
  size: "small";
}
</style>
