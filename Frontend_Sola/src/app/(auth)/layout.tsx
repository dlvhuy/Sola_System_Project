export default function authLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted [300px]:max-w-[320px] mx-5">
      {children}
    </div>
  )
}
