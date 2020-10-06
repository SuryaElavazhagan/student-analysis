import React, { useState, useEffect } from 'react';
import { Sprite } from '../components/Sprite';
import { students } from '../api/students';
import { BarChart, BarChartData } from '../charts/BarChart';

export function Semester() {
  const [loading, setLoading] = useState(true);
  const [semesterResults, setSemesterResults] = useState<number[][]>([]);
  const [currentSemester, setCurrentSemester] = useState<number>(-1);
  const [barChart, setBarChart] = useState<BarChart>();

  function handleSemesterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentSemester(+event.target.value);
  }

  function parseCurrentSemester(semester: number): BarChartData[] {
    const currentSemesterData: BarChartData[] = [
      { name: '5-6', value: 0 },
      { name: '6-6.5', value: 0 },
      { name: '6.5-7', value: 0 },
      { name: '7-7.5', value: 0 },
      { name: '7.5-8', value: 0 },
      { name: '8-8.5', value: 0 },
      { name: '8.5-9', value: 0 },
    ];
    semesterResults[semester].forEach(result => {
      if (result >= 5 && result < 6) {
        currentSemesterData[0].value++;
      } else if (result >= 6 && result < 6.5) {
        currentSemesterData[1].value++;
      } else if (result >= 6.5 && result < 7) {
        currentSemesterData[2].value++;
      } else if (result >= 7 && result < 7.5) {
        currentSemesterData[3].value++;
      } else if (result >= 7.5 && result < 8) {
        currentSemesterData[4].value++;
      } else if (result >= 8 && result < 8.5) {
        currentSemesterData[5].value++;
      } else if (result >= 8.5 && result < 9) {
        currentSemesterData[6].value++;
      }
    });

    return currentSemesterData;
  }

  async function fetchData() {
    const results = await students.getSemesterResults();
    setSemesterResults(results);
    setCurrentSemester(0);
    setLoading(false);
  }

  function renderChart() {
    const chartArea = document.getElementById('chart') as HTMLElement;
    const chart = new BarChart({
      node: chartArea,
      name: `SemesterAnalysis: Semester ${currentSemester + 1}`,
      width: 350,
      height: 350,
      xAxis: 'Semester',
      yAxis: 'Students'
    });
    const currentSemesterData = parseCurrentSemester(currentSemester);
    chart.renderChart(currentSemesterData);
    setBarChart(chart);
  }

  function handleDownload() {
    if (barChart !== undefined) {
      barChart.download();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (currentSemester !== -1) {
      renderChart();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSemester]);

  return (
    <div className="flex flex-col items-center lg:w-3/4 xl:w-4/5 rounded overflow-hidden shadow-lg px-6 py-4 m-4 relative">
      <h4 className="text-xl text-center">Semester Analysis</h4>
      <div className="my-3">
        Semester:
        <select name="semesters" id="pet-select" onChange={handleSemesterChange}>
          <option value="0">1</option>
          <option value="1">2</option>
          <option value="2">3</option>
          <option value="3">4</option>
          <option value="4">5</option>
        </select>
      </div>
      <div id="chart" className="max-w-sm m-3 w-full"></div>
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