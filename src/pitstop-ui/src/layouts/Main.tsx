import { Outlet } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar/NavigationBar";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-light">
      <NavigationBar brand="PitStop" />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-6xl">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
