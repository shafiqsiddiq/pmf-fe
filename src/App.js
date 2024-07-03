import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense } from "react";
import FullScreenLoader from "./authorization/FullScreenLoader";
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./RouterConfig";
import { ProvideAuth } from "./authorization/ProvidedAuth";
function App() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <ProvideAuth>
        <BrowserRouter>
          <RouterConfig />
        </BrowserRouter>
      </ProvideAuth>
    </Suspense>
  );
}

export default App;
