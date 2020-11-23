<template>
  <div>
    <div id="main"></div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import echarts from "echarts";
export default {
  methods: {
    ...mapActions({
      a: "shopfenlei/a",
    }),
  },
  mounted() {
    this.a();
  },
  watch: {
   // aixos是异步请求，在挂载完成画图拿不到list，监听list数据有再画图没有不画
    list: {
      deep: true,
      handler() {
        if (this.list.length > 0) {
          var myChart = echarts.init(document.getElementById("main"));
          // 指定图表的配置项和数据
          var option = {
            title: {
              text: "商品数量",
            },
            tooltip: {},
            legend: {
              data: ["子分类数量"],
            },
            xAxis: {
              data: this.list.map(item=>item.catename)
            },
            yAxis: {},
            series: [
              {
                name: "数量",
                type: "bar",
                data: this.list.map(item=>{
                   return item.children?item.children.length:0
                })
              },
            ],
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
      },
    },
  },
  computed: {
    ...mapGetters({
      list: "shopfenlei/g",
    }),
  },
};
</script>
<style scoped>
#main {
  width: 80%;
  height: 500px;
  margin: 20px auto;
}
</style>