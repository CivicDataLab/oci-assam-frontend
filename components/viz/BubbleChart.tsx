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
  Title: string;
  subTitle: string;
}

let SetSeries = [];
let setLegendData = [];

function seriesMaker(dataset, color) {
  SetSeries = [];
  setLegendData = [];
  dataset[0].unshift([0, 0, 0, '0', 'Tender Data']); //need to have a better way to make the axis start from zero
  for (let i = 0; i < dataset.length; i++) {
    setLegendData.push(dataset[i][0][4]);
    SetSeries.push({
      data: dataset[i],
      type: 'scatter',
      name: dataset[i][0][4],
      symbolSize: function (data) {
        return Math.sqrt(data[2]) / 300;
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
  Title,
  subTitle,
}) => {
  const series = seriesMaker(bubbleData1, color);
  const options = {
    legend: {
      data: setLegendData,
      top: '20%',
    },
    grid: {
      show: false,
      top: '35%',
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
      nameLocation: 'middle',
      nameGap: 30,
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
      nameLocation: 'middle',
      nameGap: 50,
    },
    title: {
      text: Title,
      left: 'center',
      subtext: subTitle,
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
  return (
    <ReactEChartsCore
      echarts={echarts}
      option={options}
      notMerge={true}
      lazyUpdate={true}
      style={{
        height: '400px',
      }}
    />
  );
};
export default BubbleChart;
