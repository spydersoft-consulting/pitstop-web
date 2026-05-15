import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump, faPlus, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteFillUp } from "../../store/slices/fillUpSlice";
import type { FillUp } from "../../store/slices/fillUpSlice";
import { PageHeader } from "../layout/PageHeader";

export const FillUpHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { recentFillUps } = useAppSelector((s) => s.fillUps);
  const selectedVehicleId = useAppSelector((s) => s.vehicles.selectedVehicleId);
  const toastRef = useRef<HTMLDivElement>(null);

  const handleDelete = (event: React.MouseEvent, row: FillUp) => {
    confirmPopup({
      target: event.currentTarget as HTMLElement,
      message: "Delete this fill-up?",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger p-button-sm",
      accept: () => {
        if (selectedVehicleId != null) {
          void dispatch(deleteFillUp({ vehicleId: selectedVehicleId, id: Number(row.id) }));
        }
      },
    });
  };

  const dateTemplate = (row: FillUp) =>
    new Date(row.filledAt ?? "").toLocaleDateString();

  const costTemplate = (row: FillUp) =>
    `$${Number(row.totalCost).toFixed(2)}`;

  const priceTemplate = (row: FillUp) =>
    `$${Number(row.pricePerGallon).toFixed(3)}/gal`;

  const odometerTemplate = (row: FillUp) =>
    `${Number(row.odometerReading).toLocaleString()} mi`;

  const gallonsTemplate = (row: FillUp) => Number(row.gallonsAdded).toFixed(3);

  const actionsTemplate = (row: FillUp) => (
    <div className="flex gap-2">
      <Button
        icon={<FontAwesomeIcon icon={faPencil} />}
        className="p-button-text p-button-sm p-button-secondary"
        onClick={() => navigate(`/fill-ups/${String(row.id)}/edit`)}
        aria-label="Edit fill-up"
      />
      <Button
        icon={<FontAwesomeIcon icon={faTrash} />}
        className="p-button-text p-button-sm p-button-danger"
        onClick={(e) => handleDelete(e, row)}
        aria-label="Delete fill-up"
      />
    </div>
  );

  return (
    <div className="space-y-6" ref={toastRef}>
      <ConfirmPopup />
      <PageHeader
        title="Fill-Up History"
        actions={
          <Button
            label="Add Fill-Up"
            icon={<FontAwesomeIcon icon={faPlus} className="mr-2" />}
            onClick={() => navigate("/fill-ups/new")}
          />
        }
      />

      <Card>
        {recentFillUps.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <FontAwesomeIcon icon={faGasPump} className="text-4xl mb-3" />
            <p className="text-lg mb-4">No fill-ups recorded yet.</p>
            <Button
              label="Log Your First Fill-Up"
              icon={<FontAwesomeIcon icon={faPlus} className="mr-2" />}
              className="p-button-sm"
              onClick={() => navigate("/fill-ups/new")}
            />
          </div>
        ) : (
          <DataTable
            value={recentFillUps}
            paginator
            rows={20}
            rowsPerPageOptions={[10, 20, 50]}
            sortField="filledAt"
            sortOrder={-1}
            className="p-datatable-sm"
          >
            <Column
              field="filledAt"
              header="Date"
              body={dateTemplate}
              sortable
            />
            <Column
              field="odometerReading"
              header="Odometer"
              body={odometerTemplate}
              sortable
            />
            <Column
              field="gallonsAdded"
              header="Gallons"
              body={gallonsTemplate}
              sortable
            />
            <Column
              field="pricePerGallon"
              header="Price/Gal"
              body={priceTemplate}
              sortable
            />
            <Column
              field="totalCost"
              header="Total"
              body={costTemplate}
              sortable
            />
            <Column field="stationName" header="Station" />
            <Column body={actionsTemplate} style={{ width: "6rem" }} />
          </DataTable>
        )}
      </Card>
    </div>
  );
};
