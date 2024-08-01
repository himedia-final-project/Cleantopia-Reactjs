import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from './AuthContext';
import { useState , useEffect } from 'react';
import Login from './pages/login/Login';
import Layout from './layouts/Layout';
import './styles/App.css';

import FacilityandLaundry from './pages/client/facilityandLaundry/FacilityandLaundry';
import LaundryRegistration from './pages/client/laundryRegistration/LaundryRegistration';

import EmployeeResource from './pages/admin/human_resource/employee/EmployeeResource';
import BranchResource from './pages/admin/human_resource/branch/BranchResource';
import DriverResource from './pages/admin/human_resource/driver/DriverResource';
import TempResource from './pages/admin/human_resource/Temp/TempResource';

// 도아
// /관리자
import BranchSales from './pages/admin/report/reportsMenu/BranchSales';
import BranchSalesDetail from './pages/admin/report/reportsMenu/BranchSalesDetail';
import NewReports from './pages/admin/report/newReportsMenu/NewReports'
import ExpenseDetail from './pages/admin/report/reportsMenu/ExpenseDetail';
// import AdminBranchSales from './pages/admin/report/reportsMenu/AdminBranchSales';
import VehicleRepairDetail from './pages/admin/report/reportsMenu/VehicleRepairDetail';
import RepairDetail from './pages/admin/report/reportsMenu/RepairDetail'
// /지점장
import LocationMyReports from './pages/client/locationReports/locationMyReportsMenu/LocationMyReports';
import LocationNewReports from './pages/client/locationReports/locationNewReportsMenu/LocationNewReports'; 

import StockApplication from './pages/admin/stock/StockApplication';
import StockHistory from './pages/admin/stock/StockHistory';
import StockHistoryLayout from './pages/admin/stock/StockHistoryLayout';
import BranchOrderHistory from './pages/admin/stock/BranchOrderHistory';

import FacilityManagement from './pages/client/facilityManagement/FacilityManagement';

import Branch from './pages/admin/branch/Branch';
import BranchClient from './pages/client/branchClient/BranchClient';


import Car from './pages/admin/car/Car';
import MainPage from './pages/admin/main_page/MainPage';




// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
//   if (!user) {
//     return <Navigate to="/" />;
//   }
//   return children;
// };
// 12

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/company" element={<Layout/>}>
            <Route index element={<MainPage/>}/>
            <Route path='financial' element={<MainPage/>}>
            
            </Route>
            
            

            <Route path="stock">
              <Route index element={<StockApplication/>}/>
              <Route path='application' element={<StockApplication/>}/>
              <Route path='history' element={<StockHistoryLayout/>}>
                <Route index element={<StockHistory/>}/>
                <Route path='headquaters' element={<StockHistory/>}/>
                <Route path='branch' element={<BranchOrderHistory/>}/>
              </Route>
            </Route>

            <Route path="paper">
                <Route index element={<BranchSales/>}/>
                <Route path='newReports' element={<NewReports/>}/>
                <Route path='reports' element={<BranchSales/>}/>
                <Route path='reports/branchSales/:branchReportCode' element={<BranchSalesDetail/>}/>
                {/* <Route path='reports/branchSales/admin/:branchReportCode' element={<AdminBranchSales/>}/> */}
                <Route path='reports/expenseReports/:expenseReportCode' element={<ExpenseDetail/>}/>
                <Route path='reports/vehicleRepair/:vehicleReportCode' element={<VehicleRepairDetail/>}/>
                <Route path='reports/repairReports/:repairReportCode' element={<RepairDetail/>}/>
            </Route>

            <Route path="branch">
              <Route index element={<Branch/>} />
            </Route>

            <Route path="members">
              <Route index element={<EmployeeResource/>}/>
              <Route path='employee' element={<EmployeeResource/>}/>
              <Route path='branch' element={<BranchResource/>}/>
              <Route path='driver' element={<DriverResource/>}/>
              <Route path='temp' element={<TempResource/>}/>
            </Route>

            <Route path="car">
                <Route index element={<Car/>}/>
            </Route>

          </Route>

          <Route path="/location" element={<Layout />}>
            <Route index element={<FacilityandLaundry />} />
            <Route path="FacilityandLaundry" element={<FacilityandLaundry />} />
            <Route path="LaundryRegistration" element={<LaundryRegistration />} />

            <Route path="paper">
                <Route index element={<LocationNewReports/>}/>
                <Route path='locationNewReports' element={<LocationNewReports/>}/>
                <Route path='myReports' element={<LocationMyReports/>}/>
            </Route>

            <Route path="branchClient">
              <Route index element={<BranchClient/>} />
            </Route>

            <Route path="facility" element={<FacilityManagement/>}>
              <Route index element={<FacilityManagement/>}/>
            </Route>

          </Route>

          

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;