<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="banner">
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="banner.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <div class="impupload">
            <h3>+</h3>
            <img :src="imgUrl" class="img" v-if="imgUrl" />
            <input v-if="info.isshow" type="file" class="inp" @change="changeFile" />
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="banner.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title==='编辑轮播图'" @click="updated">修改</el-button>
        <el-button type="primary" @click="add" v-else>添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqBanAdd, reqBanOne, reqBanX } from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      imgUrl: "",
      banner: {
        title: "",
        status: "",
      },
    };
  },
  methods: {
    // 图片上传
    changeFile(e) {
      // 后台
      this.banner.img = e.target.files[0];
      //  前台
      this.imgUrl = URL.createObjectURL(e.target.files[0]);
    },
    clear() {
      this.banner = {
        title: "",
        status: "",
      };
    },
    // 修改
    updated() {
      reqBanX(this.banner).then((res) => {
        this.a();
        this.info.isshow = false
      });
    },
    cancel() {},
    closed() {},
    // 添加请求
    add() {
      reqBanAdd(this.banner).then((res) => {
        this.clear();
        this.imgUrl = "";
        this.info.isshow = false;
        this.a();
      });
    },
    // 请求一条
    one(id) {
      reqBanOne(id).then((res) => {
        this.banner = res.data.list;
        this.imgUrl = this.$host + res.data.list.img;
        this.banner.id = id;
      });
    },
    ...mapActions({
      a: "vbanner/a",
    }),
  },
  mounted() {},
  computed: {
    ...mapGetters({}),
  },
};
</script>
<style scoped>
.impupload {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
}
.impupload h3 {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 25px;
}
.impupload .inp {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.impupload .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>