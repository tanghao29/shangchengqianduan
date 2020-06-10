<template>
  <div>
    <el-form ref="ruleForm" :model="commodityclassification" label-width="100px">
      <el-form-item label="参数名称" prop="ccname">
        <el-input v-model="commodityclassification.ccname" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'DragTable',
  props: ['ids'],
  data() {
    return {
      commodityclassification: {
        ccname: ''
      }
    }
  },

  mounted() {
    console.log(this.ids)
    this.queryss(this.ids)
  },
  methods: {

    submitForm() {
      var th = this
      this.$axios.get('/shopping_mall/commodityclassification/addCc', {
        params: {
          ccname: th.commodityclassification.ccname

        }
      })
        .then(function(response) {
          var falg = false
          th.$emit('isfromadd', falg)
        })
        .catch(function(error) {
          console.log(error)
        })
    }

  }
}

</script>
