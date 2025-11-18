import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "Mohammed Abdul Omer | Portfolio",
  description: "Portfolio of Mohammed Abdul Omer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-dark text-text">
        {/* Fixed Navbar */}
        <NavBar />

        {/* Page Content */}
        {/* pt-16 for mobile, pt-24 for desktop so hero never gets cut */}
        <main className="pt-16 md:pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
