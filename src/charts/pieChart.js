const generatePieChart = (node, categorizedData, colors) => {
    const d3 = require('d3')
    const height = 300;
    const width = 300;
    const radius = width/2;

    let pie = d3.pie()
                .padAngle(0.04)
                .sort(null)
                .value(d => d)
    
    let arc = d3.arc()
                .outerRadius(radius - 30)
                .innerRadius(radius - 60)
                
    let svg = d3.select(node)
                .append('svg')
                .attr('width', width)
                .attr('height', height)

    let g = svg.append('g')
               .attr('transform', `translate(${width / 2}, ${height / 2})`)

    g.selectAll('.arc')
        .data(pie(categorizedData))
        .enter()
        .append('g')
        .attr('class', 'arc')
        .append('path')
        .attr('d', arc)
        .style('fill', (_, i) => colors[i])
        .append('svg:title')
        .text((_, i) => categorizedData[i])

    svg.append('text')
        .attr('x', width/4)
        .attr('y', height - 5)
        .text('Student Semester Analysis')
        .style('font', 'bold 12px sans-serif')
}

export {
    generatePieChart
}