import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"


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
                                }
                              }
                        }
                    }
                }                
            }
      `);
     const posts = data.allWpPost.edges;

     return (
        <>
            <h3 className="text-2xl mt-10 mb-2">Projects</h3>
            {posts && posts.map((item) => (
                <div className="p-4 bg-zinc-600 flex justify-between mt-2 rounded-lg" key={item.node.id}>
                    <div className="project-content">
                        <div className="font-bold mb-2">{item.node.title}</div>
                        <div className="italic project-excerpt" dangerouslySetInnerHTML={{ __html:item.node.excerpt}}></div>
                    </div>
                    <div className="project-image ml-6">
                        { (item.node.featuredImage && item.node.featuredImage.node) && <img src={item.node.featuredImage.node.publicUrl} alt={`featured ${item.node.title}`} /> }
                    </div>
                </div>
            ))}
        </>
     )
}

export default ProjectPosts;