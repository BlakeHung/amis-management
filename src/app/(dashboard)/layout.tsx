import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { LoadingProvider } from "@/components/providers/loading-provider"
import { ClientSessionProvider } from "@/components/providers/client-session-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full relative">
      <ClientSessionProvider>
        <LoadingProvider>
          <div className="h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
            <Sidebar />
          </div>
          <main className="md:pl-72">
            <Navbar />
            <div className="p-8">
              {children}
            </div>
          </main>
        </LoadingProvider>
      </ClientSessionProvider>
    </div>
  )
} 