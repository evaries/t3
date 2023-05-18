import Header from "./Header"
import Footer from "./Footer"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-rows-[80px_minmax(calc(100vh-160px),_1fr)_80px]">
      <Header />
      <main className="w-full flex align-center justify-center bg-gray-100 " >
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
