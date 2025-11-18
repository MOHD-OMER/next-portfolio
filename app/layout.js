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
        {/* Header navigation bar */}
        <NavBar />
        {/* Page content */}
        <main className="pt-24"> {/* push content below fixed header */}
          {children}
        </main>
      </body>
    </html>
  );
}
