import * as d3 from "d3";


export function renderBarChart(data: number[], root: string): void{
    
    d3.select(`#${root}`).select('svg').remove();

    const width = window.innerWidth <= 400 ? window.innerWidth : 400;
    const height = 400;
    
    const margin = {
        bottom: 10,
        left: 20,
        right: 20,
        top: 10
    }

    const domains = ['5-6', '6-6.5', '6.5-7', '7-7.5', '7.5-8', '8-8.5', '8.5-9'];
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const barWidth = Math.floor(width / data.length) - 20;

    const xScale = d3.scaleLinear()
                    .domain([0, data.length])
                    .range([margin.left + margin.right, width - margin.left - margin.right]);

    const yScale = d3.scaleLinear()
                    .domain([0, Math.max.apply(null, data)])
                    .range([height - margin.top - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const svg = d3.select(`#${root}`)
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);
    
    // Appending Chart
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (_, i) => xScale(i))
        .attr('y', d => yScale(d))
        .attr('width', () => barWidth)
        .attr('height', d => height - yScale(d) - margin.top - margin.bottom)
        .attr('fill', (_, i) => color(domains[i]));
    
    // Appending axes
    svg.append("g")
        .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
        .attr("class", "axis")
        .call(xAxis);
    svg.append("g")
        .attr("transform", `translate(${margin.left + margin.right} , 0)`)
        .attr("class", "axis")
        .call(yAxis);
}