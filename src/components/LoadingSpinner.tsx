import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default LoadingSpinner;
