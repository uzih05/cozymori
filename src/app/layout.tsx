import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="antialiased bg-bg-primary text-text-primary font-body">
        {children}
      </body>
    </html>
  );
}
