import { Routes, Route  } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import Layout from './components/Layout';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import { ROLES } from './config/roles';
import EmailSent from './pages/email/EmailSent';
import Verify from './pages/email/verify';
import ForgotPassword from './pages/auth/forgot-password';
import SendOTP from './pages/auth/send-otp';
import ResetPassword from './pages/auth/reset-password';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/emailsent/:userEmail" element={<EmailSent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/verify/:userId/:uniqueString" element={<Verify />} />
        <Route path="/forgot-password/" element={<ForgotPassword />} />
        <Route path="/send-otp/:resetToken" element={<SendOTP />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowRoles={[...Object.values(ROLES)]} /> }>
            <Route element={<Prefetch />}>
              <Route path="dashboard" element={<DashLayout />}>

                <Route index element={<Welcome />}/>

                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]}/> }>

                </Route>
              </Route>


            </Route>
          </Route>


        </Route>
      </Route>
    </Routes>
  );
}

export default App;
