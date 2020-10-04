import { Chart } from "./Chart";
import { curveNatural, line } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { axisLeft, axisBottom } from 'd3-axis';
import { max } from 'd3-array';

interface LineChartInitializer {
  name: string;
  xAxis: string;
  yAxis: string;
  node: HTMLElement;
  width: number;
  height: number;
  xAxisLabelFormatter?: (d: number, i?: number) => string;
}

export class LineChart extends Chart {
  public name: string;
  public xAxis: string;
  public yAxis: string;
  public xAxisLabelFormatter: (d: number, i?: number) => string;

  constructor({width, height, name, xAxis, yAxis, node, xAxisLabelFormatter}: LineChartInitializer) {
    super(width, height);
    this.name = name;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    if (xAxisLabelFormatter) {
      this.xAxisLabelFormatter = xAxisLabelFormatter;
    } else {
      this.xAxisLabelFormatter = (d) => `${d}`;
    }
    
    const svgRef = this.svg.node();
    if (svgRef) {
      node.innerHTML = '';
      node.appendChild(svgRef);
    }
  }

  renderLineChart(data: number[]) {
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([this.margin.left ,this.width - this.margin.left - this.margin.right]);
    
    const yScale = scaleLinear()
      .domain([0, max(data, (d) => d) ?? 0])
      .range([this.height - this.margin.top - this.margin.bottom, this.margin.bottom]);
    
    const lineGenerator = line<number>()
      .x((_, i) => xScale(i))
      .y(d => yScale(d))
      .curve(curveNatural);
    
    this.svg.append('g')
      .attr('id', 'yaxis')
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(axisLeft(yScale).ticks(null, 1))
      .call(g => g.select('.domain').remove())
      .call(g => 
        g.append('text')
        .attr('x', -this.margin.left)
        .attr('y', 10)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'start')
        .text(this.yAxis)
      );

    this.svg.append('g')
      .attr('id', 'xaxis')
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .call(
          axisBottom(xScale)
          // @ts-ignore
          .tickFormat(this.xAxisLabelFormatter)
        );
    
    this.svg
    .append('g')
    .datum(data)
      .append('path')
      .attr('fill', 'transparent')
      .attr('stroke-width', 2)
      .attr('d', lineGenerator)
      .style('stroke', schemeCategory10[data.length]);
    
    this.svg
      .append('g')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (_, i) => xScale(i))
      .attr('cy', (d, i) => yScale(d))
      .attr('r', 5)
      .attr('fill', (_, i) => schemeCategory10[i]);
  }
}
