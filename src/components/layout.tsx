export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <header>
        <h1 className="my-8 text-center text-4xl font-bold">시장에 가면</h1>
      </header>
      <main>{children}</main>
      <footer className="w-full p-4 text-center">
        <p>2025 House Study</p>
      </footer>
    </div>
  );
}
