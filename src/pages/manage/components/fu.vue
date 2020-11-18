<template>
  <div>
    <el-dialog :title="info.name" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="客服专员">
            <el-option v-for="item of arrs" :key= "item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名:">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <!-- 状态 -->
      <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>

      <div slot="footer" class="dialog-footer">
        <el-button @click="rest">取 消</el-button>
        <el-button type="primary">修 改</el-button>
        <el-button type="primary" @click="yeas">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqMAdd,reqJueList } from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      arrs:[]
    };
  },
  methods: {
    // 清空数据方法（先放在这用时调）
    kong() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    rest() {
      // 尽量避免直接修改prop
      this.info.isShow = false;
    },
    // 添加数据就在自己组件用就在本组件请求添加上去就好
    yeas() {
      console.log(this.form);
      reqMAdd(this.form).then((res) => {
        this.kong();
        // 添加后隐藏弹窗
        this.rest();
        this.$emit("xiexie")
      });
    },
    ...mapActions({}),
  },
  mounted() {
    reqJueList().then(res=>{
      this.arrs = res.data.list
    })
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>
<style scoped>
</style>