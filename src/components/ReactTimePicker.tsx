"use client";

import { useState } from "react";

const ReactTimePicker = () => {
  const [value, setValue] = useState("10:00");

  const handleOnChange = (data: any) => {
    setValue(data);
  };

  return <div></div>;
};

export default ReactTimePicker;
