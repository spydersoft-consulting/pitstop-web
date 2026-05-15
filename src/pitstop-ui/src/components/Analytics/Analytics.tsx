import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { useAppSelector } from "../../store/hooks";

export const Analytics: React.FC = () => {
  const { recentFillUps } = useAppSelector((s) => s.fillUps);

  const mpgData = useMemo(() => {
    const withMpg = [...recentFillUps]
      .filter((f) => f.mpgThisFillUp != null)
      .sort(
        (a, b) =>
          new Date(a.filledAt).getTime() - new Date(b.filledAt).getTime(),
      );

    return {
      labels: withMpg.map((f) => new Date(f.filledAt).toLocaleDateString()),
      datasets: [
        {
          label: "MPG",
          data: withMpg.map((f) =>
            parseFloat((f.mpgThisFillUp ?? 0).toFixed(1)),
          ),
          borderColor: "#1d4ed8",
          backgroundColor: "rgba(29,78,216,0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    };
  }, [recentFillUps]);

  const costData = useMemo(() => {
    const sorted = [...recentFillUps]
      .sort(
        (a, b) =>
          new Date(a.filledAt).getTime() - new Date(b.filledAt).getTime(),
      )
      .slice(-12);

    return {
      labels: sorted.map((f) => new Date(f.filledAt).toLocaleDateString()),
      datasets: [
        {
          label: "Total Cost ($)",
          data: sorted.map((f) => f.totalCost),
          backgroundColor: "#f97316",
        },
      ],
    };
  }, [recentFillUps]);

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "top" as const } },
  };

  if (recentFillUps.length < 2) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-secondary">Analytics</h1>
        <Card>
          <div className="text-center py-12 text-gray-400">
            <FontAwesomeIcon icon={faChartLine} className="text-4xl mb-3" />
            <p className="text-lg">
              Log at least two fill-ups to see analytics.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-secondary">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Fuel Economy (MPG)">
          <Chart type="line" data={mpgData} options={chartOptions} />
        </Card>

        <Card title="Cost Per Fill-Up">
          <Chart type="bar" data={costData} options={chartOptions} />
        </Card>
      </div>
    </div>
  );
};
