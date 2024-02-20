import Navigations from './Navigations';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Navigations/>
    </AuthProvider>
  );
}