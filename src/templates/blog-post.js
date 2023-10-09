import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout"

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }

  let categories = [];
  let tags = [];

  if ( post && post.categories && post.categories.nodes ) {
      categories = post.categories.nodes.map(itemCategory => (itemCategory.name));
  }

  if ( post && post.tags && post.tags.nodes ) {
      tags = post.tags.nodes.map(itemTag => (itemTag.name));
  }

  return (
    <Layout>

      <article
        className="blog-post pb-12"
        itemScope
        itemType="http://schema.org/Article"
      >
        <p className="mb-6"><Link className="bg-yellow-700 py-3 px-6 rounded-lg text-white hover:opacity-60" to="/">&lt; Back</Link></p>
        <header>
          <h1 itemProp="headline" className="text-4xl">{parse(post.title)}</h1>

          <div className="flex mt-4">
              {categories.length > 0 && (
                  <div className="mb-4 mt-2">
                      Categor{categories.length === 1 ? "y" : "ies"}: 
                      {categories.map((category, index) => <span className="px-2 py-1 ml-1 bg-slate-500 text-white rounded-lg" key={`category-${index}`}>{category}</span>)}
                  </div>
              )}
              {tags.length > 0 && (
                  <div className="mb-4 mt-2 ml-4">
                      Tech: 
                      {tags.map((tag, index) => <span className="px-2 py-1 ml-1 bg-stone-600 text-white rounded-lg" key={`category-${index}`} >{tag}</span>)}
                  </div>
              )}
          </div>

          {/* if we have a featured image for this post let's display it */}
          {featuredImage?.data && (
              <GatsbyImage
                image={featuredImage.data}
                alt={featuredImage.alt}
                style={{ marginBottom: 32, marginTop: 16 }}
              />
  
          )}
        </header>

        {!!post.content && (
          <section itemProp="articleBody mb-6">{parse(post.content)}</section>
        )}

        <p className="mt-20"><Link className="bg-yellow-700 py-3 px-6 rounded-lg text-white hover:opacity-60" to="/">&lt; Back</Link></p>
      </article>

    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                placeholder: TRACED_SVG
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
      categories {
        nodes {
            name
        }  
      }
      tags {
          nodes {
            name
          }
        }        
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`
