import SmoothScroll from "@/src/components/layout/SmoothScroll";
import RouteTransition from "@/src/components/layout/RouteTransition";
import { MenuProvider } from "@/src/components/nav/MenuContext";
import Navbar from "@/src/components/nav/Navbar";
import MenuOverlay from "@/src/components/nav/MenuOverlay";
import Footer from "@/src/components/layout/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MenuProvider>
      <SmoothScroll>
        <Navbar />
        <MenuOverlay />
        <RouteTransition />
        <main>{children}</main>
        <Footer />
      </SmoothScroll>
    </MenuProvider>
  );
}
