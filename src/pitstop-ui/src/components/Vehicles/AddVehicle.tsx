import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { useAppDispatch } from "../../store/hooks";
import { createVehicle } from "../../store/slices/vehicleSlice";
import { VehicleForm } from "./VehicleForm";
import type { CreateVehicleRequest } from "../../api/generated/types.gen";

export const AddVehicle: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: CreateVehicleRequest) => {
    setSubmitting(true);
    setError(null);
    try {
      await dispatch(createVehicle(values as CreateVehicleRequest)).unwrap();
      navigate("/vehicles");
    } catch {
      setError("Failed to add vehicle. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-secondary">Add Vehicle</h1>
      <Card>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}
        <VehicleForm submitting={submitting} onSubmit={(v) => void handleSubmit(v as CreateVehicleRequest)} />
      </Card>
    </div>
  );
};
