import Header from "./components/Header";
import Sidebar from "./components/sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex  bg--white">
      {/* Sidebar */}
      <Sidebar />
      

      {/* Main content */}
      <main className="flex-1 p-6">
        <Header />
        {children}
        </main>
    </div>
  );
}
