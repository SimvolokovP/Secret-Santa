import { FC } from "react";
import { useCountdown } from "../../hooks/useCountDown";
import DateTimeDisplay from "../DateTimeDisplay/DateTimeDisplay";

import "./CountdownTimer.scss";

interface CountdownTimerProps {
  targetDate: number;
}

const CountdownTimer: FC<CountdownTimerProps> = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <div>No time</div>;
  } else {
    return (
      <div className="show-counter">
        <DateTimeDisplay value={days} type={"Дней"} isDanger={days <= 3} />

        <DateTimeDisplay value={hours} type={"Часов"} isDanger={false} />

        <DateTimeDisplay value={minutes} type={"Минут"} isDanger={false} />

        <DateTimeDisplay value={seconds} type={"Секунд"} isDanger={false} />
      </div>
    );
  }
};

export default CountdownTimer;
