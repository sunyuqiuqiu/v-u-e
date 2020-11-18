<template>
  <div>
    <!-- 5.绑定info.isshow到模板 -->
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 23 list遍历 -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <!-- 15.目录有图标，菜单有地址 -->
        <el-form-item label="菜单图标" v-if="form.type===1" label-width="120px">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else label-width="120px">
          <el-select v-model="form.url" placeholder="请选择">
            <!-- 10.遍历routes -->
            <el-option
              v-for="item in routes"
              :key="item.path"
              :label="item.name+'--/'+item.path"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title==='添加菜单'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { routes } from "../../../router";
import { reqMenuAdd, reqMenuOne,reqMenuWrite } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  // 4.接受info
  //   22.接收list
  props: ["info", "list"],
  data() {
    return {
      //icon集合
      icons: [
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-s-help",
        "el-icon-s-operation",
      ],
      //9.定义routes
      routes: routes,
      //11.初始化form,并通过v-model绑定数据到模板
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    //6.点击了取消
    cancel() {
      this.info.isShow = false;
    },
    //27.上级菜单发生了修改
    changePid() {
      // 如果上级菜单是 顶级菜单，那么 form.type=1;否则是2
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    // 13.form置空
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      };
    },
    //12.点击了添加按钮
    add() {
      //发起添加的请求
      reqMenuAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          //成功
          // 弹个成功
          successAlert("添加成功");
          //弹框消失
          this.cancel();
          //form置空
          this.empty();
          //   //24.通知menu刷新列表数据
          this.$emit("meijia");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },

    //ref触发的事件
    getOne(scope) {
      reqMenuOne(scope).then((res) => {
        this.form = res.data.list;
        // 因为后台修改参数要求多需要个id
        this.form.id = scope;
      });
    },
  update(){
    reqMenuWrite(this.form).then(res=>{
      this.$emit("meijia");
      this.cancel()
      this.empty()
    })
  },
  //关闭时触发 如果是编辑就清空，如果是添加就不清空
  closed(){
    if(this.info.title == "编辑菜单"){
      this.empty()
    }
  }
  },
  mounted() {},
};
</script>
<style scoped>
</style>