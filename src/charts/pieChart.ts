import * as d3 from "d3";

export default function renderPieChart(data: number[], root: string) {
    d3.select(`#${root}`).select('svg').remove();

    const width = window.innerWidth <= 400 ? window.innerWidth : 400;
    const height = 400;

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const svg = d3.select(`#${root}`)
                .append('svg')
                .attr('width', width)
                .attr('height', height);
    
    const radius = Math.ceil(width / 2);

    const arc = d3.arc()
                .innerRadius(radius * 0.67)
                .outerRadius(radius - 1);

    const pie = d3.pie();

    const g = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`)

    g.selectAll('g')
        .data(pie(data))
        .enter()
        .append('g')
        .append('path')
        .attr('d', arc as any)
        .attr('fill', (_, i) => color(`${i}`));
}