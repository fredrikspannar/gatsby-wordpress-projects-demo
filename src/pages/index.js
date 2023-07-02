import React from "react";
import Layout from "../components/layout"
import { graphql, useStaticQuery } from "gatsby";
import ProjectPosts from "../components/projectposts";

const IndexPage = () => {
    // GraphQL query by slug, get data by object deconstruction into constant "content"
    const data = useStaticQuery(graphql`
            query IndexPageQuery {
                wpPage(slug: {eq: "home"}) {
                    content
                }              
            }
      `);
     const content = data.wpPage.content;

    return (
        <Layout>
            <div dangerouslySetInnerHTML={{ __html:content}} />
            <ProjectPosts />
        </Layout>
    )
  
}

export default IndexPage;