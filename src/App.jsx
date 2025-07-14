import {BrowserRouter} from "react-router-dom"
import './App.css';

import Links from './Links/Links';

function App() {
 
  return (
    <BrowserRouter>
      <div className="App">
        <Links/>
      </div>
    </BrowserRouter>
  );
}

export default App;