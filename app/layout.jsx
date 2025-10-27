import "./globals.css";

export const metadata = {
  title: "VisualNickBarber — Madrid",
  description: "Precisión visual en cada corte. Degradados limpios, acabado profesional.",
  openGraph: { title: "VisualNickBarber — Madrid", images: ["/og.png"] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
