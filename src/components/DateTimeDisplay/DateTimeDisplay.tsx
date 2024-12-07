import { FC } from "react";

import "./DateTimeDisplay.scss";

interface DateTimeDisplayProps {
  value: number;
  type: string;
  isDanger: boolean;
}

const DateTimeDisplay: FC<DateTimeDisplayProps> = ({
  value,
  type,
  isDanger,
}) => {
  return (
    <div className={isDanger ? "countdown danger" : "countdown"}>
      <div>{value}</div>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
