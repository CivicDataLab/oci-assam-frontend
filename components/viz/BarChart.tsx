import React, { useState, useEffect } from 'react';
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
  const [series, setSeries] = useState([]);
  const [option, setOption] = useState({});

  // settting series
  useEffect(() => {
    const vizSeries = [];

    let stackTrue = '';
    if (stack == 'True') {
      stackTrue = 'x';
    }

    for (
      let columnLength = 1;
      columnLength <= dataset[0].length - 1;
      columnLength++
    ) {
      vizSeries.push({
        type: 'bar',
        barMaxWidht: 16,
        itemStyle: { color: theme[columnLength] },
        stack: stackTrue,
        animation: false,
      });
    }

    setSeries(vizSeries);
  }, [dataset]);

  // setting option
  useEffect(() => {
    const vizOptions = {
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

    setOption(vizOptions);
  }, [series]);

  echarts.use([
    BarChart,
    SVGRenderer,
    GridComponent,
    TitleComponent,
    DatasetComponent,
    LegendComponent,
    TooltipComponent,
  ]);

  return <ReactEChartsCore echarts={echarts} option={option} />;

  // return <ReactEcharts option={options} echarts={echarts} />;
};
export default BarChartViz;
