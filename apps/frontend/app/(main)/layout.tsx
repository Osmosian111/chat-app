import Header from "@/component/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      {children}
    </div>
  );
}
