import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import { GatsbyImage } from "gatsby-plugin-image"

const ProjectPosts = () => {
    // GraphQL query by slug, get data by object deconstruction into constant "content"
    const data = useStaticQuery(graphql`
            query ProjectPostsQuery {
                allWpPost {
                    edges {
                        node {
                            id
                            title
                            excerpt
                            featuredImage {
                                node {
                                  publicUrl
                                  localFile {
                                    publicURL
                                    childrenImageSharp {
                                        gatsbyImageData
                                      }                                    
                                  }                                  
                                }
                              }
                        }
                    }
                }                
            }
      `);
     const posts = data?.allWpPost?.edges || [];

     return (
        <>
            <h3 className="text-2xl mt-10 mb-2">Projects</h3>
            {posts && posts.map((item, index) => {
                const featuredImage = item?.node?.featuredImage?.node?.localFile?.childrenImageSharp?.gatsbyImageData || item?.node?.featuredImage?.node?.publicUrl;
                const title = item?.node?.title || null;
                const excerpt = item?.node?.excerpt || null;
                const id = item?.node?.id || index;

                return (
                    <div className="p-4 bg-zinc-600 flex justify-between mt-2 rounded-lg" key={id}>
                        <div className="project-content">
                            <div className="font-bold mb-2">{parse(title)}</div>
                            <div className="italic project-excerpt">{parse(excerpt)}</div>
                        </div>
                        <div className="project-image ml-6">
                            { featuredImage && <img src={featuredImage} alt={`featured ${parse(title)}`} /> }
                        </div>
                    </div>
                )
            })}
        </>
     )
}

export default ProjectPosts;