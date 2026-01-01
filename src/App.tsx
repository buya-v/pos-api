import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-bg-main">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;