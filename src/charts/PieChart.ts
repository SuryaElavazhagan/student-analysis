import { Chart } from './Chart';
import { PieArcDatum } from 'd3';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { arc, pie } from 'd3-shape';

export interface PieChartData {
  name: string;
  value: number;
}

interface PieChartInitializer {
  name: string;
  node: HTMLElement;
  width: number;
  height: number;
}

export class PieChart extends Chart {
  public name: string;

  constructor({width, height, name, node}: PieChartInitializer) {
    super(width, height);
    this.name = name;
    const svgRef = this.svg.node();
    this.svg.attr('style', 'margin: 0 auto;');
    if (svgRef !== null) {
      node.innerHTML = '';
      node.append(svgRef);
    }
  }

  generatePieChart (data: PieChartData[]) {
    const labelHeight = 18;
    const radius = (this.width / 3);
    const pies = pie<PieChartData>().sort(null).value((d: PieChartData): number => d.value);
    const arcs = arc<PieArcDatum<PieChartData>>().innerRadius(radius - 60).outerRadius(radius - 30);

    this.svg.select('.legend').remove();
  
    this.svg
      .attr('width', this.width)
      .attr('height', this.height);
  
    const group = this.svg
      .append('g')
      .attr('transform', `translate(${this.width / 3}, ${this.height / 2})`);
  
    group.selectAll('path')
      .data(pies(data))
      .join('path')
      .attr('fill', (_, i) => schemeCategory10[i])
      .attr("d", arcs);

    const legend = this.svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${radius * 2 + 20},0)`);
    
    legend
      .selectAll(null)
      .data(data)
      .enter()
      .append('rect')
      .attr('y', (_, i) => labelHeight * i * 1.8)
      .attr('width', labelHeight)
      .attr('height', labelHeight)
      .attr('fill', (_, i) => schemeCategory10[i])
      .attr('stroke', 'grey')
      .style('stroke-width', '1px');
  
    legend
      .selectAll(null)
      .data(data)
      .enter()
      .append('text')
      .text(d => d.name)
      .attr('x', labelHeight * 1.2)
      .attr('y', (_, i) => labelHeight * i * 1.8 + labelHeight) 
      .style('font-family', 'sans-serif')
      .style('font-size', `${labelHeight}px`);
  }  
}