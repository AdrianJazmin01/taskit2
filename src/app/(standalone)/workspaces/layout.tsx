interface StandaloneLayoutProps {
  children: React.ReactNode;
};

const StandaloneLayout = ({ children }: StandaloneLayoutProps) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto mx-w-screen-2xl p-4">
      <div className="flex flex-col items-center justify-center py-4">
      {children}
      </div>
      </div>
    </main>
  )
}

export default StandaloneLayout