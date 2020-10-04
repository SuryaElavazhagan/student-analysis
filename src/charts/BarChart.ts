import { Chart } from './Chart';
import { scaleBand, scaleLinear } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { axisLeft, axisBottom } from 'd3-axis';
import { max } from 'd3-array';

export interface BarChartData {
  name: string;
  value: number;
}

interface BarChartInitializer {
  name: string;
  xAxis: string;
  yAxis: string;
  node: HTMLElement;
  width: number;
  height: number;
}

export class BarChart extends Chart {
  public name: string;
  public xAxis: string;
  public yAxis: string;
  constructor({width, height, name, xAxis, yAxis, node}: BarChartInitializer) {
    super(width, height);
    this.name = name;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    const svgRef = this.svg.node();
    this.svg.attr('style', 'margin: 0 auto;');
    if (svgRef !== null) {
      node.innerHTML = '';
      node.append(svgRef);
    }
  }

  renderChart(data: BarChartData[]) {
    this.svg.selectAll('*').remove();

    const xScale = scaleBand()
      .domain(data.map(d => d.name))
      .range([this.margin.left, this.width - this.margin.right])
      .padding(0.1);
    
    const yScale = scaleLinear()
      .domain([0, max(data, d => d.value) ?? 0]).nice()
      .range([this.height - this.margin.bottom, this.margin.top]);
    
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
        .call(axisBottom(xScale).tickSizeOuter(0));
    
    this.svg.append('g')
      .attr('id', 'bars')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .style('mix-blend-mode', 'multiply')
      .attr('fill', (d, i) => schemeCategory10[i])
      .attr('x', d => xScale(d.name) ?? 0)
      .attr('y', d => yScale(d.value))
      .attr('height', d => yScale(0) - yScale(d.value))
      .attr('width', xScale.bandwidth());
  }
}