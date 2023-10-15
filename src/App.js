import logo from './logo.svg';
import './App.css';
import PaginatedTable from "./PaginatedTable";

function App() {
  return (
    <div className="App main-page">
      <div className='page-title'><h2>BookMarks</h2></div>
      <PaginatedTable />
    </div>
  );
}

export default App;
