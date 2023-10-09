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
                    }
                }                
            }
      `);
     const posts = data?.allWpPost?.edges || [];

     return (
        <>
            <h3 className="text-2xl font-bold mt-10 mb-2">Projects</h3>
            {posts && posts.map((item, index) => {
                const featuredImage = item?.node?.featuredImage?.node?.localFile?.childrenImageSharp?.gatsbyImageData || item?.node?.featuredImage?.node?.publicUrl;
                const title = item?.node?.title || null;
                const excerpt = item?.node?.excerpt || null;
                const id = item?.node?.id || index;
                const slug = item?.node?.slug || "";
                let categories = [];
                let tags = [];

                if ( item && item.node && item.node.categories && item.node.categories.nodes ) {
                    categories = item.node.categories.nodes.map(itemCategory => (itemCategory.name));
                }

                if ( item && item.node && item.node.tags && item.node.tags.nodes ) {
                    tags = item.node.tags.nodes.map(itemTag => (itemTag.name));
                }

                return (
                    <>
                      <div className="p-2 mb:p-4 flex flex-col md:flex-row justify-between mt-4 mb-8 rounded-lg border-2 bg-slate-400 border-slate-400 hard-shadow-10px" key={id}>
                        <div className="project-content">
                            <div className="font-bold text-lg mb-2">{parse(title)}</div>
                            <div className="flex">
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
                            <div className="italic project-excerpt">{parse(excerpt)}</div>
                            <div className="mt-6 mb-6"><Link className="bg-yellow-700 py-3 px-6 text-white rounded-lg hard-shadow-6px hover:opacity-60" to={`/${slug}`}>Read more &gt;</Link ></div>
                        </div>
                        <div className="project-image ml-6 mt-8 lg:mt-0">
                            { featuredImage && <img src={featuredImage} className="w-[600px] h-[auto] mb-2" alt={`featured ${parse(title)}`} /> }
                        </div>
                      </div>
                      <div className="divider w-full h-6 mt-10 mb-10"></div>
                    </>
                )
            })}
        </>
     )
}

export default ProjectPosts;