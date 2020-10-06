import React, { useState, useEffect } from 'react';
import { Sprite } from '../components/Sprite';
import { students } from '../api/students';
import { LineChart } from '../charts/LineChart';

interface SchoolAndCollegeMeta {

}

export function SchoolAndCollege() {
  const [loading, setLoading] = useState(true);
  const [schoolAndCollegeMarks, setSchoolAndCollegeMarks] = useState<number[][]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [currentStudent, setCurrentStudent] = useState<number>(-1);
  const [lineChart, setLineChart] = useState<LineChart>();

  function handleDownload() {
    if (lineChart) {
      lineChart.download();
    }
  }

  async function fetchData() {
    const data = await Promise.all([
      students.getNames(),
      students.getHSCMarks(),
      students.getSSLCMarks(),
      students.getOverallResults()
    ]);
    const schoolAndCollegeMarks = [];
    for(let i = 0; i < data[3].length; i++){
      schoolAndCollegeMarks.push([data[1][i] > 10 ? data[1][i]/10 : data[1][i], data[2][i] > 10 ? data[2][i]/10 : data[2][i], ...data[3][i].map((sem, i) => i === 0 ? +(sem as string).split('-')[0] : +sem)])
    }
    setNames(data[0]);
    setSchoolAndCollegeMarks(schoolAndCollegeMarks);
    setLoading(false);
    setCurrentStudent(0);
  }

  function handleStudentChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentStudent(+event.currentTarget.value);
  }

  function renderChart() {
    const chartArea = document.getElementById('chart') as HTMLElement;
    const chart = new LineChart({
      node: chartArea,
      name: `${names[currentStudent]}`,
      width: 350,
      height: 350,
      xAxis: 'Semester',
      yAxis: 'GPA',
      xAxisLabelFormatter(d: number) {
        switch (d) {
          case 0: return 'SSLC';
          case 1: return 'HSC';
          default: return (d % 1 === 0.5) ? '' : `Sem-${Math.trunc(d - 1)}`;
        }
      }
    });
    chart.renderLineChart(schoolAndCollegeMarks[currentStudent]);
    setLineChart(chart);
  }

  useEffect(() => {
    if (currentStudent !== -1) {
      renderChart();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStudent]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center lg:w-3/4 xl:w-4/5 rounded overflow-hidden shadow-lg px-6 py-4 m-4 relative">
      <h4 className="text-xl text-center">High School vs. College</h4>
      <div>
        <select name="names" id="student-names" onChange={handleStudentChange}>
          {
            names.map((name, index) => <option value={index} key={name}>{ name }</option>)
          }
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