import React, { FC } from 'react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import {
  GridComponent,
  DatasetComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import ReactEChartsCore from 'echarts-for-react/lib/core';

//  To import all the things at once
// import ReactEcharts from 'echarts-for-react';

const SetSeries = [];

function seriesMaker(theme, dataset, stack) {
  let stackTrue = '';
  if (stack == 'True') {
    stackTrue = 'x';
  }

  for (
    let columnLenght = 1;
    columnLenght <= dataset[0].length - 1;
    columnLenght++
  ) {
    SetSeries.push({
      type: 'bar',
      barMaxWidht: 16,
      itemStyle: { color: theme[columnLenght] },
      stack: stackTrue,
    });
  }
  return SetSeries;
}

interface BarChartProps {
  xAxisLabel: string;
  yAxisLabel: string;
  theme: string[];
  dataset: any;
  stack: string;
}

const BarChartViz: React.FC<BarChartProps> = ({
  xAxisLabel,
  yAxisLabel,
  theme,
  dataset,
  stack,
}) => {
  const series = seriesMaker(theme, dataset, stack);
  const options = {
    legend: {},
    tooltip: {},
    dataset: { source: dataset },
    grid: {},
    xAxis: {
      type: 'category',
      name: xAxisLabel,
      axisLine: {
        symbol: ['none', 'arrow'],
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      name: yAxisLabel,
      axisLine: { onZero: false, show: true, symbol: ['none', 'arrow'] },
      nameRotate: 90,
    },
    series: series,
  };
  echarts.use([
    BarChart,
    SVGRenderer,
    GridComponent,
    TitleComponent,
    DatasetComponent,
    LegendComponent,
    TooltipComponent,
  ]);

  return <ReactEChartsCore echarts={echarts} option={options} />;

  // return <ReactEcharts option={options} echarts={echarts} />;
};
export default BarChartViz;
