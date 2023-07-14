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
    <div className="global-wrapper h-full mb-6 mt-6" data-is-root-path={isHomePage}>
      <div className="container mx-auto w-3/4 content-bg 0 p-6 rounded-lg flex flex-col">

        <header className="global-header pb-6 text-center border-b-2 border-blue-500">
            <span className="font-bold text-4xl">{title}</span>
        </header>

        <main className="mt-20">{children}</main>

      </div>
    </div>
  )
}

export default Layout
