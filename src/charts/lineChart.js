const generateLineChart = (node, allPoints, lineColor, pointsColor) => {
    const d3 = require('d3')
    const margin = { top: 20, bottom: 20, left: 20, right: 20 }
    const width = 350
    const height = 350

    const svg = d3.select(node)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
    
    const g = svg.append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
    
    let xPointsGenerator = d3.scaleLinear()
                             .domain([0, allPoints.length - 1])
                             .range([margin.left ,width - margin.left - margin.right])
    
    let yPointsGenerator = d3.scaleLinear()
                             .domain([0, 10])
                             .range([height - margin.top - margin.bottom, margin.bottom])

    let area = d3.line()
                .x((_, i) => xPointsGenerator(i))
                .y(d => yPointsGenerator(d))
    
    g.append('path')
     .datum(allPoints)
     .attr('fill', 'none')
     .attr('stroke', lineColor)
     .attr('stroke-width', 2)
     .attr('d', area)
    
    g.selectAll('circle')
     .data(allPoints)
     .enter()
     .append('circle')
     .attr('cx', (_, i) => xPointsGenerator(i))
     .attr('cy', d => yPointsGenerator(d))
     .attr('r', 5)
     .attr('fill', (_, i) => pointsColor[i])
     .append('svg:title')
     .text(d => d)

     g.append("g")
     .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
     .call(
        d3.axisBottom(xPointsGenerator)
        .tickFormat(d => {
            if(d === 0)
                return 'SSLC'
            if(d === 1)
                return 'HSC'
            else
                return (d % 1 === 0.5) ? '' : `Sem-${Math.trunc(d - 1)}`
        }))
     .append('text')
     .attr("text-anchor", "end")
     .text("GPA")

    g.append("g")
        .call(d3.axisLeft(yPointsGenerator))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("GPA")

}

export default generateLineChart