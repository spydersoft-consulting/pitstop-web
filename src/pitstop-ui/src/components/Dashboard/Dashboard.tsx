import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGasPump,
  faCar,
  faChartLine,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useAppSelector } from "../../store/hooks";
import type { Vehicle } from "../../store/slices/vehicleSlice";
import type { FillUp } from "../../store/slices/fillUpSlice";

export const Dashboard: React.FC = () => {
  const { vehicles, selectedVehicleId } = useAppSelector((s) => s.vehicles);
  const { recentFillUps } = useAppSelector((s) => s.fillUps);

  const selectedVehicle = vehicles.find(
    (v: Vehicle) => v.id === selectedVehicleId,
  );
  const lastFillUp = recentFillUps[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Dashboard</h1>
        <Button
          label="Log Fill-Up"
          icon={<FontAwesomeIcon icon={faPlus} className="mr-2" />}
          className="p-button-sm"
          onClick={() => {
            window.location.href = "/fill-ups";
          }}
        />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-center">
          <div className="flex flex-col items-center gap-2">
            <FontAwesomeIcon icon={faCar} className="text-primary text-2xl" />
            <p className="text-sm text-gray-500">Vehicle</p>
            <p className="font-semibold">
              {selectedVehicle
                ? `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`
                : "No vehicle selected"}
            </p>
          </div>
        </Card>

        <Card className="text-center">
          <div className="flex flex-col items-center gap-2">
            <FontAwesomeIcon
              icon={faGasPump}
              className="text-accent text-2xl"
            />
            <p className="text-sm text-gray-500">Last Fill-Up</p>
            <p className="font-semibold">
              {lastFillUp
                ? new Date(lastFillUp.filledAt).toLocaleDateString()
                : "None recorded"}
            </p>
          </div>
        </Card>

        <Card className="text-center">
          <div className="flex flex-col items-center gap-2">
            <FontAwesomeIcon
              icon={faChartLine}
              className="text-success text-2xl"
            />
            <p className="text-sm text-gray-500">Total Fill-Ups</p>
            <p className="font-semibold">{recentFillUps.length}</p>
          </div>
        </Card>
      </div>

      {/* Recent fill-ups */}
      <Card title="Recent Fill-Ups">
        {recentFillUps.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <FontAwesomeIcon icon={faGasPump} className="text-4xl mb-3" />
            <p>No fill-ups recorded yet.</p>
            <Button
              label="Add your first fill-up"
              className="p-button-text mt-2"
              onClick={() => {
                window.location.href = "/fill-ups";
              }}
            />
          </div>
        ) : (
          <ul className="divide-y">
            {recentFillUps.slice(0, 5).map((f: FillUp) => (
              <li key={f.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {new Date(f.filledAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {f.gallonsAdded.toFixed(3)} gal &middot;{" "}
                    {f.odometerReading.toLocaleString()} mi
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-accent">
                    ${f.totalCost.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    ${f.pricePerGallon.toFixed(3)}/gal
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};
