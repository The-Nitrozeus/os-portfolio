import { OSProvider } from './context/OSContext';
import WindowManager from './components/OS/WindowManager';

function App() {
  return (
    <OSProvider>
      <WindowManager />
    </OSProvider>
  );
}

export default App;
