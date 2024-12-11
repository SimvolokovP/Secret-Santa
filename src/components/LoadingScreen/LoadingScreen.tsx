import "./LoadingScreen.scss";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img src="/santa.png" alt="santa" />
      <div className="loading-screen__text">Secret santa</div>
    </div>
  );
};

export default LoadingScreen;
