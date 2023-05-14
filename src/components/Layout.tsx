import Header from "./Header"
import Footer from "./Footer"
const Layout = ({ children }: any) => {
  return (
    <div className="grid grid-rows-[80px_minmax(calc(100vh-160px),_1fr)_80px]">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
