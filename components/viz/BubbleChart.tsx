import React from 'react';
import * as echarts from 'echarts/core';
import { ScatterChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import {
  GridComponent,
  DatasetComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import ReactEChartsCore from 'echarts-for-react/lib/core';

interface BubbleChartProps1 {
  bubbleData1: any;
  color: any;
  xAxisLabel: string;
  yAxisLabel: string;
}

let SetSeries = [];
let setLegendData = [];

function seriesMaker(dataset, color) {
  SetSeries = [];
  setLegendData = [];
  for (let i = 0; i < dataset.length; i++) {
    setLegendData.push(dataset[i][0][4]);
    SetSeries.push({
      data: dataset[i],
      type: 'scatter',
      name: dataset[i][0][4],
      symbolSize: function (data) {
        return Math.sqrt(data[2]) / 100;
      },
      emphasis: {
        focus: 'series',
        label: {
          show: true,
          formatter: function (param: any) {
            return param.data[3];
          },
          position: 'top',
        },
      },
      itemStyle: {
        color: color[i],
      },
    });
  }
  return SetSeries;
}

const BubbleChart: React.FC<BubbleChartProps1> = ({
  bubbleData1,
  xAxisLabel,
  yAxisLabel,
  color,
}) => {
  console.log(bubbleData1);
  const series = seriesMaker(bubbleData1, color);
  console.log(series);
  const options = {
    legend: {
      data: setLegendData,
    },
    xAxis: {
      name: xAxisLabel,
      axisLine: {
        symbol: ['none', 'arrow'],
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
      scale: true,
    },
    yAxis: {
      name: yAxisLabel,
      axisLine: {
        symbol: ['none', 'arrow'],
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
      scale: false,
    },
    series: series,
  };
  echarts.use([
    ScatterChart,
    CanvasRenderer,
    GridComponent,
    TitleComponent,
    DatasetComponent,
    LegendComponent,
    TooltipComponent,
  ]);
  return <ReactEChartsCore echarts={echarts} option={options} notMerge={true} lazyUpdate={true}/>;
};
export default BubbleChart;