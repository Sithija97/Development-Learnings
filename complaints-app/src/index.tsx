import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  Complaints,
  Fines,
  Home,
  Login,
  ForgotPassword,
  Payment,
  Register,
  Reports,
  UserProfile,
  VerifyUser,
  ReportRequest,
  UserPaymentList,
  PaymentList,
  UsersList,
  ComplaintList,
  FineList,
  ReportsList,
  UserReportRequestList,
  ReportRequestList,
  UploadReport,
  ContactInfo,
} from "./pages";
import { store } from "./store/store";
import PrivateRoute from "./components/privte-route";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="" element={<PrivateRoute />}>
      <Route path="/home" element={<Home />} />
      </Route>

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="" element={<PrivateRoute />}>
      <Route path="/users-list" element={<UsersList />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
      <Route path="/profile" element={<UserProfile />} />
      </Route>

      <Route path="/verify-user" element={<VerifyUser />} />

      <Route path="" element={<PrivateRoute />}>
      <Route path="/fines" element={<Fines />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
      <Route path="/reports" element={<Reports />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
      <Route path="/reports-list" element={<ReportsList />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
      <Route path="/report-request" element={<ReportRequest />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
      <Route path="/upload-report" element={<UploadReport />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
      <Route path="/report-request-list" element={<ReportRequestList />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
      <Route path="/user-report-requests" element={<UserReportRequestList />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
      <Route path="/complaints" element={<Complaints />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
      <Route path="/complaints-list" element={<ComplaintList />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
      <Route path="/payment" element={<Payment />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
      <Route path="/payments-list" element={<PaymentList />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
      <Route path="/fines-list" element={<FineList />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
      <Route path="/user-payments" element={<UserPaymentList />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
      <Route path="/contact-info" element={<ContactInfo />} />
      </Route>
    </Route>
  )
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
