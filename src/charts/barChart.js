const generateBarChart = (node , categorizedData, colors, coordinates, categories, secondaryData = [], multiplicationFactor = 10) => {
    const d3 = require('d3')
    const width = 350
    const height = 350

    let svg = d3.select(node)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
    
    if(secondaryData.length !== 0){
        let combinedData = categorizedData.concat(secondaryData)

        let barIterator = 0, colorIterator = 0;
        const g = svg.selectAll('g')
                    .data(combinedData)
                    .enter()
                    .append('g')
        
        g.selectAll('rect')
            .data(d => d)
            .enter()
            .append('rect')
            .attr('x', (_ , i) => {
                return i === 0 ? (barIterator * 40) + 30 : (barIterator++ * 40) + 45
            })
            .attr('y', d => height - (d * multiplicationFactor) - 20)
            .attr('width', 15)
            .attr('height', d => d * multiplicationFactor)
            .style('fill', (_ , i) => i === 0 ? colors[colorIterator] : colors[colors.length - (colorIterator++) - 1])
            .append('svg:title')
            .text(d => d)
        
        svg.selectAll('text')
            .data(combinedData)
            .enter()
            .append('text')
            .attr('x', (_, i) => (i * 40) + 30)
            .attr('y', d => height - (d[0] > d[1] ? d[0]*10 : d[1]*10) - 30)
            .style('font', 'normal 8px sans-serif')
            .text((_, i) => categories[i])
    }else{
        svg.selectAll('rect')
        .data(categorizedData)
        .enter()
        .append('rect')
        .attr('x', (_ , i) => (i * 30) + 15)
        .attr('y', d => height - (d * multiplicationFactor) - 20)  
        .attr('width', 25)
        .attr('height', d => d * multiplicationFactor)
        .style('fill', (_ , i) => colors[i])
        .append('svg:title')
        .text(d => d)

        svg.selectAll('text')
        .data(categorizedData)
        .enter()
        .append('text')
        .attr('x', (_, i) => (i * 30) + 15)
        .attr('y', d => height - (d * multiplicationFactor) - 30)
        .style('font', 'normal 8px sans-serif')
        .text((_, i) => categories[i])  
    }

    svg.append('text')
        .attr('x', width/4 + 10)
        .attr('y', height - 5)
        .text(coordinates[0])
        .style('font', 'bold 10px sans-serif')
    
    svg.append('text')
        .attr('x', 10)
        .attr('y', height/2)
        .attr('transform', `rotate(90, 0, ${height / 2})`)
        .text(coordinates[1])
        .style('font', 'bold 10px sans-serif')
}

export {
    generateBarChart
}