import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {View} from "@tsu.intime/tsu-intime-ui";
import BottomNavigation from "./components/BottomNavigation";
import RequestsPage from "./pages/keys-page/RequestsPage";
import CreateRequestPage from "./pages/keys-page/CreateRequestPage";
import RequestFormPage from "./pages/keys-page/RequestFormPage";

function App() {
  return (
      <Router>
          <View>
              <Routes>
                  <Route path='/' element={<CreateRequestPage />} />
                  <Route path='/form' element={<RequestFormPage />} />
                  <Route path='/requests' element={<RequestsPage />} />
              </Routes>
              <div className={"bottom-menu"}>
                  <BottomNavigation />
              </div>
          </View>
      </Router>
  );
}

export default App;
