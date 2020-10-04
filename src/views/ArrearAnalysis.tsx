import React, { useState, useEffect } from 'react';
import { students } from '../api/students';
import { Sprite } from '../components/Sprite';
import Toggle from 'react-toggle';
import '../styles/toggle.css';
import { PieChart, PieChartData } from '../charts/PieChart';

interface ArrearReportData {
  HOA: PieChartData[];
  SA: PieChartData[];
}

export function ArrearAnalysis() {
  const [loading, setLoading] = useState(true);
  const [chart, setChart] = useState<PieChart>();
  const [isStandingArrear, setIsStandingArrear] = useState(true);
  const [arrearReport, setArrearReport] = useState<ArrearReportData>({ HOA: [], SA: [] });

  async function fetchData() {
    const data: ArrearReportData = { HOA: [], SA: [] };
    const report = await students.getArrearReport();
    report.forEach(arrearReport => {
      let value = 0;
      if(+arrearReport[0] === 0 || isNaN(+arrearReport[0])) {
        value = data.SA[0]?.value ?? 0 + 1;
        data.SA[0] = { name: '= 0', value: value };
      } else if (+arrearReport[0] >=1 && +arrearReport[0] < 5) {
        value = data.SA[1]?.value ?? 0 + +arrearReport[0];
        data.SA[1] = { name: '0 - 5', value: value };
      } else if (+arrearReport[0] >=5 && +arrearReport[0] < 10) {
        value = data.SA[2]?.value ?? 0 + +arrearReport[0];
        data.SA[2] = { name: '5 - 10', value: value };
      } else if (+arrearReport[0] >=10 && +arrearReport[0] < 15) {
        value = data.SA[3]?.value ?? 0 + +arrearReport[0];
        data.SA[3] = { name: '10 - 15', value: value };
      } else if (+arrearReport[0] >=15 && +arrearReport[0] < 20) {
        value = data.SA[4]?.value ?? 0 + +arrearReport[0];
        data.SA[4] = { name: '15 - 20', value: value };
      } else if (+arrearReport[0] >=20) {
        value = data.SA[5]?.value ?? 0 + +arrearReport[0];
        data.SA[5] = { name: '> 20', value: value };
      }
      if(+arrearReport[1] === 0 || isNaN(+arrearReport[1])) {
        value = (data.HOA[0]?.value ?? 0) + 1;
        data.HOA[0] = { name: '= 0', value: value };
      } else if (+arrearReport[1] >=1 && +arrearReport[1] < 5) {
        value = data.HOA[1]?.value ?? 0 + +arrearReport[1];;
        data.HOA[1] = { name: '0 - 5', value: value };
      } else if (+arrearReport[1] >=5 && +arrearReport[1] < 10) {
        value = data.HOA[2]?.value ?? 0 + +arrearReport[1];;
        data.HOA[2] = { name: '5 - 10', value: value };
      } else if (+arrearReport[1] >=10 && +arrearReport[1] < 15) {
        value = data.HOA[3]?.value ?? 0 + +arrearReport[1];;
        data.HOA[3] = { name: '10 - 15', value: value };
      } else if (+arrearReport[1] >=15 && +arrearReport[1] < 20) {
        value = data.HOA[4]?.value ?? 0 + +arrearReport[1];;
        data.HOA[4] = { name: '15 - 20', value: value };
      } else if (+arrearReport[1] >=20) {
        value = data.HOA[5]?.value ?? 0 + +arrearReport[1];;
        data.HOA[5] = { name: '> 20', value: value };
      }
    });
    setLoading(false);
    setArrearReport(data);
  }

  function renderChart() {
    const chartArea = document.getElementById('chart') as HTMLElement;
    const chart = new PieChart({
      width: 400,
      height: 350,
      name: isStandingArrear ? 'Standing Arrear Analysis' : 'History of Arrear Analysis',
      node: chartArea
    });
    chart.generatePieChart(isStandingArrear ? arrearReport.SA : arrearReport.HOA);
    setChart(chart);
  }

  function handleStandingArrearSwitch() {
    const SA = document.getElementsByClassName('ml-2')[0] as HTMLElement;
    const HOA = document.getElementsByClassName('mr-2')[0] as HTMLElement;
    SA.classList.toggle('font-bold');
    HOA.classList.toggle('font-bold');
    setIsStandingArrear(!isStandingArrear);
  }

  function handleDownload() {
    if (chart) {
      chart.download();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    renderChart();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStandingArrear, arrearReport]);

  return (
    <div className="flex flex-col items-center lg:w-3/4 xl:w-4/5 rounded overflow-hidden shadow-lg px-6 py-4 m-4">
      <h4 className="text-xl text-center">Arrear Analysis</h4>
      <div className="flex mt-4 mb-4">
        <span className="mr-2">History of Arrear</span>
        <Toggle
          defaultChecked={isStandingArrear}
          icons={false}
          onChange={handleStandingArrearSwitch} />
        <span className="ml-2 font-bold">Standing Arrear</span>
      </div>
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