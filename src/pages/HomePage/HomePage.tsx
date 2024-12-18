import { FC } from "react";
import "./HomePage.scss";
import Snowfall from "react-snowfall";
import Greeting from "../../components/Greeting/Greeting";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import { newYearDate } from "../../utils/utils";

const HomePage: FC = () => {
  return (
    <div className="page home-page">
      <div className="container home-page__container">
        <Snowfall />
        {/* <div className="home-page__actions">
          <HomeScreenBtn />
        </div> */}
        <div className="home-page__info">
          <Greeting />
          <span className="home-page__info--text">До нового года: </span>
          <CountdownTimer targetDate={newYearDate} />
          <img className="home-page__hero" src="/homeHero.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
