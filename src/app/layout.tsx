import type { Metadata } from "next";
import Container from "react-bootstrap/Container";
import AppNavBar from "@/components/AppNavBar";
import Footer from "@/components/Footer";
import { Provider } from "@/components/ui/provider";
import ClientWrapper from "./ClientWrapper";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";
import "notyf/notyf.min.css";

export const metadata: Metadata = {
  title: "My App",
  description: "Migrated from CRA to Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <ClientWrapper>
            <AppNavBar />
            <Container>{children}</Container>
            <Footer />
          </ClientWrapper>
        </Provider>
      </body>
    </html>
  );
}
