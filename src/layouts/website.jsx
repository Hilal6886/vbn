import { Routes, Route } from "react-router-dom";
import WebsiteNavbar from "@/widgets/layout/WebsiteNavbar"; // Import the navbar
import Wfooter from "@/widgets/layout/websiteFooter"; // Import the footer
import routes from "@/routes"; // Import the website routes

export function Website() {
  return (
    <div className="min-h-screen flex flex-col">
      <WebsiteNavbar />
      <main className="flex-grow">
        <Routes>
          {routes
            .filter((route) => route.layout === "website") // Ensure only website routes are mapped
            .flatMap((route) =>
              route.pages.map(({ id, path, element }) => (
                <Route key={id} path={path} element={element} />
              ))
            )}
        </Routes>
      </main>
      <Wfooter />
    </div>
  );
}

export default Website;
