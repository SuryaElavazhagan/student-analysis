import React, { useState, useEffect } from 'react';
import { students } from '../api/students';
import { Sprite } from '../components/Sprite';
import { PieChart, PieChartData } from '../charts/PieChart';

export function Caste() {
  const [loading, setLoading] = useState(true);
  const [chart, setChart] = useState<PieChart>();

  async function fetchData() {
    const chartArea = document.getElementById('chart') as HTMLElement;
    const casteDetails = await students.getCaste();
    console.log(casteDetails);
    const counts: Map<string, number> = new Map();
    const pieData: PieChartData[] = []
    casteDetails.forEach(caste => {
      const CASTE_NAME = caste.toUpperCase();
      let value = counts.get(CASTE_NAME) ?? 0;
      if (/(BC|BCM|MBC|SC|ST|FC|OC)/.test(CASTE_NAME)) {
        counts.set(CASTE_NAME, value + 1);
      } else {
        counts.set('OTHERS', value + 1);
      }
    });
    counts.forEach((value, key) => {
      pieData.push({ name: key, value });
    });
    const pieChart = new PieChart({
      node: chartArea,
      name: 'Caste Analysis',
      width: 400,
      height: 350
    });
    pieChart.generatePieChart(pieData);
    setChart(pieChart);
    setLoading(false);
  }

  function handleDownload() {
    if (chart) {
      chart.download();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center lg:w-3/4 xl:w-4/5 rounded overflow-hidden shadow-lg px-6 py-4 m-4">
      <h4 className="text-xl text-center">Caste Analysis</h4>
      <div id="chart" className="max-w-sm m-3"></div>
      {
        loading ? <Sprite name="loading" /> : undefined
      }
      <div>
        <button onClick={handleDownload} className="flex bg-purple-500 hover:shadow hover:bg-purple-600 text-white font-bold px-4 py-2 rounded">
          <Sprite width={24} height={24} viewBox="0 0 24 24" fill="white" name="download" />
          <span className="mx-2">Download</span>
        </button>
      </div>
      <div className="hidden">
        Icons made by <a href="https://www.flaticon.com/authors/becris" title="Becris">Becris</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </div>
    </div>
  );
}