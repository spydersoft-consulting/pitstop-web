import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/Main";
import { Dashboard } from "./Dashboard/Dashboard";
import { FillUpHistory } from "./FillUpHistory/FillUpHistory";
import { AddFillUp } from "./FillUpHistory/AddFillUp";
import { EditFillUp } from "./FillUpHistory/EditFillUp";
import { Analytics } from "./Analytics/Analytics";
import { Vehicles } from "./Vehicles/Vehicles";
import { AddVehicle } from "./Vehicles/AddVehicle";
import { EditVehicle } from "./Vehicles/EditVehicle";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchVehicles } from "../store/slices/vehicleSlice";
import { fetchFillUps } from "../store/slices/fillUpSlice";
import { useAuth } from "../context";

export const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const { selectedVehicleId } = useAppSelector((s) => s.vehicles);

  useEffect(() => {
    if (isAuthenticated) {
      void dispatch(fetchVehicles());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (selectedVehicleId != null) {
      void dispatch(fetchFillUps(selectedVehicleId));
    }
  }, [dispatch, selectedVehicleId]);

  return (
    <Router basename="/">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/fill-ups" element={<FillUpHistory />} />
          <Route path="/fill-ups/new" element={<AddFillUp />} />
          <Route path="/fill-ups/:id/edit" element={<EditFillUp />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/new" element={<AddVehicle />} />
          <Route path="/vehicles/:id/edit" element={<EditVehicle />} />
        </Route>
      </Routes>
    </Router>
  );
};
