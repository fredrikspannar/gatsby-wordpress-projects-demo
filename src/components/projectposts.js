import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import parse from "html-react-parser"

const ProjectPosts = () => {
    // GraphQL query by slug, get data by object deconstruction into constant "content"
    const data = useStaticQuery(graphql`
            query ProjectPostsQuery {
                allWpPost(sort: { fields: [date], order: DESC }) {
                    edges {
                        node {
                            id
                            title
                            excerpt
                            slug
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
                const slug = item?.node?.slug || "";

                return (
                    <>
                      <div className="p-4 flex flex-col md:flex-row justify-between mt-4 mb-8 rounded-lg" key={id}>
                        <div className="project-content">
                            <div className="font-bold mb-2">{parse(title)}</div>
                            <div className="italic project-excerpt">{parse(excerpt)}</div>
                            <div className="mt-6"><Link className="bg-yellow-700 py-3 px-6 text-white rounded-lg hard-shadow-6px hover:opacity-60" to={`/${slug}`}>Read more &gt;</Link ></div>
                        </div>
                        <div className="project-image ml-6 mt-8 lg:mt-0">
                            { featuredImage && <img src={featuredImage} className="w-[600px] h-[auto]" alt={`featured ${parse(title)}`} /> }
                        </div>
                      </div>
                      <div className="divider w-full h-6"></div>
                    </>
                )
            })}
        </>
     )
}

export default ProjectPosts;