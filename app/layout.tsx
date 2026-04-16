import { Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pageMap = await getPageMap()

  return (
    <html lang="en">
      <Head />
      <body>
        <Layout
          navbar={
            <Navbar
              logo={<span>My Product Docs</span>}
              projectLink="https://github.com/your-org/my-docs"
            />
          }
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/your-org/my-docs/tree/main"
          footer={<p>© 2026 My Company</p>}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}