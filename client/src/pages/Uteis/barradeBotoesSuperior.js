import Spinner from "react-bootstrap/Spinner";

const barradeBotoesSuperior = () => {
  return (
    <div className="container-spinner">
      <div className="box">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
};

export default barradeBotoesSuperior;
