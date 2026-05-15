import { Outlet } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar/NavigationBar";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface-muted text-content">
      <NavigationBar brand="PitStop" />
      <main className="flex-1 w-full px-4 lg:px-8 xl:px-12 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
