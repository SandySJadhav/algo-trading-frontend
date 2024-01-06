"use client";

import { useCallback, useState } from "react";

const getFieldValue = (
  val: string,
  min: number,
  max: number,
  previous: string
) => {
  if (val === "" || (parseInt(val) <= max && parseInt(val) >= min)) {
    let fieldValue = val.replace(/\D/, "");
    if (fieldValue.charAt(0) === "0") {
      fieldValue = fieldValue.length === 1 ? "00" : fieldValue.substring(1);
    }
    if (!fieldValue) {
      fieldValue = "00";
    }
    return fieldValue;
  }
  return previous;
};

const displayTime = (val: string) => {
  if (val.length === 2) {
    return val;
  }
  if (parseInt(val) < 10) {
    return `0${val}`;
  }
  return val;
};

type Prop = {
  title?: string;
  onChange?: (time: any) => void;
};

const ReactTimePicker = ({ title, onChange }: Prop) => {
  const [time, setTime] = useState({
    hours: "07",
    minutes: "00",
    meredian: "PM",
  });

  const handleOnChange = useCallback(
    (data: string, min: number, max: number, type: string) => {
      const fieldValue = getFieldValue(
        data,
        min,
        max,
        type === "hours" ? time.hours : time.minutes
      );
      const newTime = { ...time };
      if (type === "hours") {
        newTime.hours = displayTime(fieldValue);
      } else {
        newTime.minutes = displayTime(fieldValue);
      }
      setTime(newTime);
      validateSelection(newTime);
    },
    [time]
  );

  const handleOnSelect = (data: string) => {
    const newTime = {
      ...time,
      meredian: data,
    };
    setTime(newTime);
    validateSelection(newTime);
  };

  const validateSelection = (newTime: any) => {
    onChange?.(newTime);
  };

  return (
    <div className="relative flex flex-col w-full">
      {title && (
        <label className="flex text-sm font-medium text-slate-700 mb-2 ml-1">
          {title}
        </label>
      )}
      <div className="flex border rounded-md text-slate-500 p-3 text-base items-center justify-center">
        <div className="flex justify-center items-center">
          <input
            className="custom_number_input flex w-5 items-end"
            type="number"
            title={`${title}-hours`}
            name={`${title}-hours`}
            id={`${title}-hours`}
            min={1}
            max={12}
            value={displayTime(time.hours)}
            onChange={(e) => handleOnChange(e.target.value, 1, 12, "hours")}
          />
          <div className="flex p-1">:</div>
          <input
            className="custom_number_input flex w-5"
            type="number"
            title={`${title}-minutes`}
            name={`${title}-minutes`}
            id={`${title}-minutes`}
            min={0}
            max={59}
            value={displayTime(time.minutes)}
            onChange={(e) => handleOnChange(e.target.value, 0, 59, "minutes")}
          />
        </div>
        <div className="flex w-2"></div>
        <select
          title="meredian"
          className="py-1"
          onChange={(e) => handleOnSelect(e.target.value)}
          value={time.meredian}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );
};

export default ReactTimePicker;
