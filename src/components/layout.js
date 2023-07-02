import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"

const Layout = ({ isHomePage, children }) => {
  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  return (
    <div className="global-wrapper bg-black h-screen w-screen" data-is-root-path={isHomePage}>
      <div className="container mx-auto w-3/4 bg-zinc-900 h-full p-6 text-white rounded-xl flex flex-col">

        <header className="global-header pb-6 text-center border-b-2 border-blue-500">
            <span className="font-bold text-4xl">{title}</span>
        </header>

        <main className="mt-20">{children}</main>

        {/*<footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
          {` `}
          And <a href="https://wordpress.org/">WordPress</a>
        </footer>*/}

      </div>
    </div>
  )
}

export default Layout
