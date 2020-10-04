import React, { useState, useEffect } from 'react';

interface CounterProps {
  value: number;
  title: string;
  counterColor: string;
  titleColor: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function Counter({ value, title, counterColor, titleColor, onClick }: CounterProps) {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (counter === value) {
        clearInterval(intervalID);
      } else {
        setCounter(counter + 1);
      }
    })
    return () => {
      clearInterval(intervalID);
    }
  }, [value, counter]);

  return (
    <div onClick={onClick} className="inline-block m-1 cursor-pointer">
        <p className="p-0 m-0" style={{ font: 'bold 100px sans-serif', color: counterColor }}>{counter}</p>
        <p className="p-0 m-0" style={{ font: 'bold 20px sans-serif', color: titleColor }}>{title}</p>
    </div>
  );
}