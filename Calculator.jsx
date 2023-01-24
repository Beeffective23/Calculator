import React from "react";
import { useState } from "react";

function Calculator() {
  let [number1, setNumber1] = useState(0);
  let [number2, setNumber2] = useState(0);
  let [display, setDisplay] = useState(0);
  let [decimal1, setDecimal1] = useState("");
  let [decimal2, setDecimal2] = useState("");
  let [operation, setOperation] = useState("");
  let [percentage1, setPercentage1] = useState(1);
  let [percentage2, setPercentage2] = useState(1);
  let [minus1, setMinus1] = useState("");
  let [minus2, setMinus2] = useState("");
  let [count, setCount] = useState(0);
  const numbers = [
    "AC",
    "+/-",
    "%",
    "/",
    7,
    8,
    9,
    "X",
    4,
    5,
    6,
    "-",
    1,
    2,
    3,
    "+",
    0,
    ",",
    "=",
  ];
  const reset = () => {
    setCount(0);
    setNumber1(0);
    setDecimal1("");
    setNumber2(0);
    setDecimal2("");
    setPercentage1(1);
    setPercentage2(1);
    setMinus1("");
    setMinus2("");
  };
  const Result = () => {
    switch (operation) {
      case "+":
        setDisplay(
          (
            Number(minus1 + decimal1 + number1) / percentage1 +
            Number(minus2 + decimal2 + number2) / percentage2
          ).toPrecision(4)
        );
        reset();
        break;
      case "-":
        setDisplay(
          (
            Number(minus1 + decimal1 + number1) / percentage1 -
            Number(minus2 + decimal2 + number2) / percentage2
          ).toPrecision(4)
        );
        reset();
        break;
      case "/":
        setDisplay(
          (
            Number(minus1 + decimal1 + number1) /
            percentage1 /
            Number(minus2 + decimal2 + number2) /
            percentage2
          ).toPrecision(4)
        );
        reset();
        break;
      case "X":
        setDisplay(
          (
            ((Number(minus1 + decimal1 + number1) / percentage1) *
              Number(minus2 + decimal2 + number2)) /
            percentage2
          ).toPrecision(4)
        );
        reset();
        break;
    }
  };

  function clickHandler(num) {
    if (count == 0 && typeof num == "number") {
      setNumber1(number1 * 10 + num);
      setDisplay(minus1 + decimal1 + (number1 * 10 + num));
    }
    if (count > 0 && typeof num == "number") {
      setNumber2(number2 * 10 + num);
      setDisplay(decimal2 + (number2 * 10 + num));
    }
    if (num == "+" || num == "-" || num == "X" || num == "/") {
      setOperation(num);
      setDisplay(0);
      setCount(1);
    }

    if (num == "%") {
      if (count == 0) {
        setDisplay(Number(decimal1 + number1) / 100);
        setPercentage1(100);
      } else {
        setDisplay(Number(decimal2 + number2) / 100);
        setPercentage2(100);
      }
    }

    if (num == ",") {
      if (count == 0) {
        setDisplay(number1 + ".");
        setDecimal1(number1 + ".");
        setNumber1(0);
      } else {
        setDisplay(number2 + ".");
        setDecimal2(number2 + ".");
        setNumber2(0);
      }
    }

    if (num == "AC") {
      setDisplay(0);
      reset();
    }

    if (num == "+/-") {
      if (count == 0) {
        setMinus1("-");
        setDisplay(Number("-" + decimal1 + number1));
      } else {
        setMinus2("-");
        setDisplay(Number("-" + decimal2 + number2));
      }
    }

    if (num == "=") {
      Result();
    }
  }

  return (
    <div className="calculator">
      <div className="result">
        <h2>{display}</h2>
      </div>
      <div className="container">
        {numbers.map((num) => (
          <button
            key={num}
            className={`number${num}`}
            onClick={() => {
              clickHandler(num);
            }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
