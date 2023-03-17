import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Eda from './pages/Eda';
import Error from './pages/Error';

function App() {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/eda' element={<Eda />}></Route>
                <Route path='*' element={<Error />}></Route>
            </Routes>
        </Router>
    );
}

export default App;