export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="w-screen h-[64px] bg-green-700">hello</div>
      {children}
    </div>
  );
}
