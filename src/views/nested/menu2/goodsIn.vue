<template>
  <!-- 包裹着 搜索  表格  弹出层 -->
  <div>
    <div>
      <!-- 头部搜索 开始 -->
      <div style="display:flex;justify-content:space-between;margin-top:13px">
        <div>
          <el-input
            v-model="keyword"
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
            size="small"
            :disabled="showAdvanceSearchView"
            @click="initGoodsIn"
          >搜索</el-button>
          <el-button
            size="small"
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
                v-model="searchValue.uid"
                style="width:180px"
                size="mini"
                placeholder="操作人..."
              />
            </el-col>
            <el-col :span="7">
              订单编号：
              <el-input
                v-model="searchValue.cid"
                style="width:180px"
                size="mini"
                placeholder="订单编号..."
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
          </el-row>
          <el-row :gutter="20" style="margin-top:6px">
            <el-col :span="7">
              入库价格：
              <el-input
                v-model="searchValue.cebuymoney"
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
      <el-table v-loading="loading" :data="goodsIn" border stripe size="mini">
        <el-table-column prop="ceid" label="编号" width="118" align="left" />
        <el-table-column prop="cid" label="商品图片" width="166" align="center">
          <!-- <img width="166" height="80" :src="goodsIn.ceimg" alt="商品图片" /> -->
          <img v-image-preview width="166" height="80" src="./banner2.jpg" alt="商品图片">
        </el-table-column>
        <el-table-column prop="cid" label="商品名称" width="138" align="center" />
        <el-table-column prop="cedate" label="入库时间" width="150" align="center" />
        <el-table-column prop="cebuymoney" label="入库价格" width="115" align="center" />
        <el-table-column prop="cesellmoney" label="出售价格" width="100" align="center" />
        <el-table-column prop="uid" label="操作人" width="158" align="center" />
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
  </div>
</template>

<script>
export default {
  name: 'GoondIn',

  data() {
    return {
      total: 0,
      page: 0,
      size: 10,
      keyword: '',
      showAdvanceSearchView: false,
      loading: false,
      goodsIn: [],
      commodity: [],
      user: [],
      searchValue: {
        cid: null,
        uid: null,
        cebuymoney: null,
        beginDate: null
      }
    }
  },
  mounted() {
    this.initGoodsIn()
  },
  methods: {
    currentChange(page) {
      this.page = page
      this.initGoodsIn()
    },
    sizeChange(size) {
      this.size = size
      this.initGoodsIn()
    },
    initGoodsIn(type) {
      this.loading = true
      let url =
        '/shopping_mall/commodityentry/?page=' +
        this.page +
        '&size=' +
        this.size

      if (type && type === 'advanced') {
        if (this.searchValue.cid) {
          url += '&cid=' + this.searchValue.cid
        }
        if (this.searchValue.uid) {
          url += '&uid=' + this.searchValue.uid
        }
        if (this.searchValue.cebuymoney) {
          url += '&cebuymoney=' + this.searchValue.cebuymoney
        }
        if (this.searchValue.beginDate) {
          url += '&beginDate=' + this.searchValue.beginDate
        }
      }

      this.getRequest(url).then(resp => {
        this.loading = false
        if (resp) {
          this.goodsIn = resp.data
          this.total = resp.total
        }
      })
    }
  }
}
</script>

<style>
</style>
