'use client';

import React, { useState } from 'react';

export default function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const percentage = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let result: number;

      switch (operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '×':
          result = currentValue * inputValue;
          break;
        case '÷':
          result = currentValue / inputValue;
          break;
        default:
          result = inputValue;
      }

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    if (operation === null || previousValue === null) return;

    const inputValue = parseFloat(display);
    let result: number;

    switch (operation) {
      case '+':
        result = previousValue + inputValue;
        break;
      case '-':
        result = previousValue - inputValue;
        break;
      case '×':
        result = previousValue * inputValue;
        break;
      case '÷':
        result = previousValue / inputValue;
        break;
      default:
        result = inputValue;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const buttons = [
    { label: 'AC', action: clear, type: 'function' },
    { label: '+/-', action: toggleSign, type: 'function' },
    { label: '%', action: percentage, type: 'function' },
    { label: '÷', action: () => performOperation('÷'), type: 'operator' },
    { label: '7', action: () => inputNumber('7'), type: 'number' },
    { label: '8', action: () => inputNumber('8'), type: 'number' },
    { label: '9', action: () => inputNumber('9'), type: 'number' },
    { label: '×', action: () => performOperation('×'), type: 'operator' },
    { label: '4', action: () => inputNumber('4'), type: 'number' },
    { label: '5', action: () => inputNumber('5'), type: 'number' },
    { label: '6', action: () => inputNumber('6'), type: 'number' },
    { label: '−', action: () => performOperation('-'), type: 'operator' },
    { label: '1', action: () => inputNumber('1'), type: 'number' },
    { label: '2', action: () => inputNumber('2'), type: 'number' },
    { label: '3', action: () => inputNumber('3'), type: 'number' },
    { label: '+', action: () => performOperation('+'), type: 'operator' },
    { label: '0', action: () => inputNumber('0'), type: 'number', wide: true },
    { label: '.', action: inputDecimal, type: 'number' },
    { label: '=', action: calculate, type: 'equals' },
  ];

  return (
    <div className="h-full flex flex-col bg-surface-container-lowest">
      <div className="px-6 py-8 flex flex-col items-end justify-end flex-grow-0">
        <span className="text-on-surface-variant text-sm tracking-tight">{display}</span>
        <span className="text-4xl font-light tracking-tighter text-on-surface">{display}</span>
      </div>
      <div className="grid grid-cols-4 gap-1 p-4 flex-grow bg-surface-container-low/20">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.action}
            className={`h-14 rounded-lg transition-colors flex items-center justify-center text-lg font-medium ${
              btn.type === 'function'
                ? 'bg-surface-container-highest/50 hover:bg-surface-container-highest text-primary'
                : btn.type === 'operator'
                ? 'bg-primary text-on-primary hover:bg-primary-dim'
                : btn.type === 'equals'
                ? 'bg-primary-dim text-on-primary hover:brightness-110'
                : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface'
            } ${btn.wide ? 'col-span-2' : ''}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}