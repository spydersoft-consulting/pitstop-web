import { Outlet } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar/NavigationBar";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface-muted text-content lg:flex">
      <NavigationBar brand="PitStop" />
      <div className="flex-1 min-w-0 flex flex-col">
        <main className="flex-1 w-full px-4 lg:px-8 xl:px-12 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
