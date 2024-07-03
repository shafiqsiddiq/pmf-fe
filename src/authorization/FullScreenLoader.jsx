import { ScaleLoader } from "react-spinners";

export default function FullScreenLoader() {
  return (
    <div
      className="loaderDiv d-flex justify-content-center align-items-center "
      style={{ padding: "20rem" }}
    >
      <div className="spinner">
        <ScaleLoader
          color="#313251"
          loading="true"
          // cssOverride={override}
          size={150}
        />
      </div>
    </div>
  );
}
