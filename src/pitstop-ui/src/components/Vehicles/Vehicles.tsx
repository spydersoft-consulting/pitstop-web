import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faPlus, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectVehicle, deleteVehicle, type Vehicle } from "../../store/slices/vehicleSlice";
import { PageHeader } from "../layout/PageHeader";

export const Vehicles: React.FC = () => {
  const { vehicles, selectedVehicleId } = useAppSelector((s) => s.vehicles);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toastRef = useRef(null);

  const handleDelete = (e: React.MouseEvent, vehicle: Vehicle) => {
    confirmPopup({
      target: e.currentTarget as HTMLElement,
      message: `Remove "${vehicle.name}"?`,
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger p-button-sm",
      rejectClassName: "p-button-sm p-button-outlined",
      accept: () => void dispatch(deleteVehicle(vehicle.id as number)),
    });
  };

  return (
    <div className="space-y-6">
      <ConfirmPopup ref={toastRef} />
      <PageHeader
        title="Vehicles"
        actions={
          <Button
            label="Add Vehicle"
            icon={<FontAwesomeIcon icon={faPlus} className="mr-2" />}
            className="p-button-sm"
            onClick={() => navigate("/vehicles/new")}
          />
        }
      />

      {vehicles.length === 0 ? (
        <Card>
          <div className="text-center py-12 text-gray-400">
            <FontAwesomeIcon icon={faCar} className="text-4xl mb-3" />
            <p className="text-lg mb-4">No vehicles added yet.</p>
            <Button
              label="Add Your First Vehicle"
              icon={<FontAwesomeIcon icon={faPlus} className="mr-2" />}
              className="p-button-sm"
              onClick={() => navigate("/vehicles/new")}
            />
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((vehicle: Vehicle) => (
            <Card
              key={vehicle.id}
              className={`transition-shadow hover:shadow-md ${
                vehicle.id === selectedVehicleId ? "border-2 border-primary" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  className="flex items-start gap-3 flex-1 min-w-0 text-left cursor-pointer bg-transparent border-0 p-0"
                  onClick={() => dispatch(selectVehicle(vehicle.id as number))}
                >
                  <FontAwesomeIcon
                    icon={faCar}
                    className={`text-2xl mt-1 ${
                      vehicle.id === selectedVehicleId ? "text-primary" : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-secondary">{vehicle.name}</p>
                    <p className="text-sm text-gray-500">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                      {vehicle.trim ? ` ${vehicle.trim}` : ""}
                    </p>
                    {vehicle.id === selectedVehicleId && (
                      <span className="text-xs text-primary font-medium">Active</span>
                    )}
                  </div>
                </button>
                <div className="flex gap-1 shrink-0">
                  <Button
                    icon={<FontAwesomeIcon icon={faPencil} />}
                    className="p-button-text p-button-sm p-button-secondary"
                    tooltip="Edit"
                    tooltipOptions={{ position: "top" }}
                    onClick={() => navigate(`/vehicles/${vehicle.id as number}/edit`)}
                  />
                  <Button
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    className="p-button-text p-button-sm p-button-danger"
                    tooltip="Delete"
                    tooltipOptions={{ position: "top" }}
                    onClick={(e) => handleDelete(e, vehicle)}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
