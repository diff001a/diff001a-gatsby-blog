import { useStaticQuery } from "gatsby"
export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            social {
              twitter
              github
            }
          }
        }
      }
    `
  )
  return site.siteMetadata
}
