<template>
  <div class="view-index">
    <Crumb><span slot="icon"><Icon type="ios-help-circle-outline" size="22" />配置</span></Crumb>
    <div class="panel">
      <ul>
        <li></li>
        <li></li>
        <li>
          <div class="panel-title">销售额类别占比</div>
          <div class="chart" id="pieChart"></div>
        </li>
        <li>
          <div class="panel-title">卖场月销售目标达成率</div>
          <div class="chart" id="barChart"></div>
        </li>
        <li>
          <div class="panel-title">地区月销售目标达成率</div>
          <div class="chart" id="barChart2"></div>
        </li>
        <li>
          <div class="panel-title">卖场销售趋势分析</div>
          <div class="chart" id="lineChart"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { helper, echarts } from '@/helper';

export default {
  data() {
    return {

    }
  },
  created() {
    // this.createChart('barChart');
  },
  methods: {
    createChart(id) {
      echarts(function(echarts) {
        var myChart = echarts.init(document.getElementById(id));
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          grid: {
            show: false,
            bottom: 60,
            height: '150px',
            borderColor: '#000',
          },
          legend: {
            data: ['预期目标', '实际目标'],
            bottom: 4,
            textStyle: {
              color: '#666',
              fontSize: 11
            },
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 12,
          },
          xAxis: [{
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
            axisPointer: {
              type: 'shadow'
            }
          }],
          yAxis: [{
            type: 'value',
            name: '',
            axisLabel: {
              textStyle: { color: '#444' },
              formatter: '{value}'
            },
            splitLine: {
              lineStyle: {
                color: ['#eee'],
                type: 'dotted',
              }
            }
          }],
          series: [{
              name: '预期目标',
              type: 'bar',
              barGap: 0,
              data: [2.0, 4.9, 7.0, 23.2, 30, 27, 15, 20, 16],
              barWidth: '13px',
              barMinHeight: 0,
              itemStyle: {
                normal: {
                  color: '#3fa1ff'
                }
              }
            },
            {
              name: '实际目标',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 29, 15.6, 18.2, 8.7],
              barWidth: '13px',
              barMinHeight: 0,
              itemStyle: {
                normal: {
                  color: '#50cb74'
                }
              }
            }
          ]
        });
      });
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>