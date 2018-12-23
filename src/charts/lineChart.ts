import * as d3 from "d3";

export function renderLineChart(data: number[], root: string) {
    d3.select(`#${root}`).select('svg').remove();
}