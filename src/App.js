import { Route, Routes } from 'react-router-dom';
import Export from './components/export/Export.jsx';
import NewJob from './components/export/NewJob.jsx';
import Jobs from './components/export/Jobs.jsx';
import Users from './components/users/Users.jsx';
import JobDetail from './components/export/JobDetail.jsx';
import EditJob from './components/export/EditJob.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Invoice from './components/export/Invoice.jsx';

function App() {
  return (
    <Routes>
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/editJob/:id" element={<EditJob />} />
      <Route path="/jobDetail/:id" element={<JobDetail />} />
      <Route path="/newJob" element={<NewJob />} />
      <Route path="/users" element={<Users />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/invoice" element={<Invoice />} />
    </Routes>
  );
}

export default App;
