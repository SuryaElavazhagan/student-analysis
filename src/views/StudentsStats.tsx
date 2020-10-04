import React, { useState, useEffect } from 'react';
import { students } from '../api/students';
import { Sprite } from '../components/Sprite';
import { Counter } from '../components/Counter';

interface Student {
  name: string;
  board: string;
  gender: string;
  quota: string;
}

interface StudentStats {
  students: Student[];
  male: number;
  female: number;
  state: number;
  cbse: number;
  government: number;
  management: number;
  diploma: number;
}

export function StudentsStats() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StudentStats>({
    students: [],
    male: 0,
    female: 0,
    state: 0,
    cbse: 0,
    government: 0,
    management: 0,
    diploma: 0
  });

  async function fetchData() {
    const [board, gender, quota, names] = await Promise.all([students.getBoard(), students.getGender(), students.getQuota(), students.getNames()]);
    const studentStats: StudentStats = {
      students: [],
      male: 0,
      female: 0,
      state: 0,
      cbse: 0,
      government: 0,
      management: 0,
      diploma: 0
    };
    names.forEach((name, index) => {
      studentStats.students.push({
        name,
        board: board[index],
        gender: gender[index],
        quota: quota[index]
      });

      if (quota[index] === 'MQ') {
        studentStats.management++;
      } else {
        studentStats.government++;
      }

      if (board[index].toLowerCase().includes('state')) {
        studentStats.state++;
      } else if (board[index].toLowerCase().includes('cbse')) {
        studentStats.cbse++;
      } else {
        studentStats.diploma++;
      }

      if (gender[index].toLowerCase() === 'female') {
        studentStats.female++;
      } else {
        studentStats.male++;
      }
    });

    setLoading(false);
    setStats(studentStats);
  }

  function renderGenderData() {
    if (loading) {
      return (<Sprite name="loading" />);
    } else {
      return (
        <div className="flex justify-around w-full">
          <Counter value={stats.female} title="Female" counterColor="#2ca02c" titleColor="black" onClick={() => undefined} />
          <Counter value={stats.male} title="Male" counterColor="#2ca02c" titleColor="black" onClick={() => undefined} />
        </div>
      );
    }
  }

  function renderQuota() {
    if (loading) {
      return (<Sprite name="loading" />);
    } else {
      return (
        <div className="flex justify-around w-full">
          <Counter value={stats.government} title="Government" counterColor="#2ca02c" titleColor="black" onClick={() => undefined} />
          <Counter value={stats.management} title="Management" counterColor="#2ca02c" titleColor="black" onClick={() => undefined} />
        </div>
      );
    }
  }

  function renderBoard() {
    if (loading) {
      return (<Sprite name="loading" />);
    } else {
      return (
        <div className="flex justify-around w-full">
          <Counter value={stats.diploma} title="Diploma" counterColor="#2ca02c" titleColor="black" onClick={() => undefined} />
          <Counter value={stats.state} title="State" counterColor="#2ca02c" titleColor="black" onClick={() => undefined} />
          <Counter value={stats.cbse} title="CBSE" counterColor="#2ca02c" titleColor="black" onClick={() => undefined} />
        </div>
      );
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="flex flex-col items-center lg:w-3/4 xl:w-4/5 rounded overflow-hidden shadow-lg px-6 py-4 m-4">
      <h1 className="text-2xl">Gender</h1>
      {
        renderGenderData()
      }
      <hr className="w-full m-2" />
      <h1 className="text-2xl">Quota</h1>
      {
        renderQuota()
      }
      <hr className="w-full m-2" />
      <h1 className="text-2xl">Board</h1>
      {
        renderBoard()
      }
    </div>
  );
}