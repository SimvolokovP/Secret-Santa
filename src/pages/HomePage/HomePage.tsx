import { FC } from "react";
import "./HomePage.scss";
import Snowfall from "react-snowfall";
import Greeting from "../../components/Greeting/Greeting";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import { dateTimeAfterThreeDays } from "../../utils/utils";
import HomeScreenBtn from "../../components/HomeScreenBtn/HomeScreenBtn";

const HomePage: FC = () => {
  return (
    <div className="page home-page">
      <div className="container">
        <Snowfall />
        <div className="home-page__actions">
          <HomeScreenBtn />
        </div>
        <div className="home-page__info">
          <Greeting />
          <span className="home-page__info--text">До Нового Года: </span>
          <CountdownTimer targetDate={dateTimeAfterThreeDays} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
