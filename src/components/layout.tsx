export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <header>
        <div className="my-8">
          <h1 className="text-center text-4xl font-bold">시장에 가면</h1>
        </div>
      </header>
      <main className="w-full max-w-7xl p-4">{children}</main>
    </div>
  );
}
