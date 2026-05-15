import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createFillUp } from "../../store/slices/fillUpSlice";
import { FillUpForm } from "./FillUpForm";
import type { CreateFillUpRequest } from "../../api/generated/types.gen";

export const AddFillUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedVehicleId = useAppSelector((s) => s.vehicles.selectedVehicleId);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: CreateFillUpRequest) => {
    if (selectedVehicleId == null) return;
    setSubmitting(true);
    setError(null);
    try {
      await dispatch(createFillUp({ vehicleId: selectedVehicleId, body: values })).unwrap();
      navigate("/fill-ups");
    } catch {
      setError("Failed to save fill-up. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-secondary">Log Fill-Up</h1>
      <Card>
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        <FillUpForm onSubmit={handleSubmit} submitting={submitting} />
      </Card>
    </div>
  );
};
