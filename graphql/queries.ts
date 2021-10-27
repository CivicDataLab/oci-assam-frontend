import gql from 'graphql-tag';

export const GET_ORG_QUERY = gql`
  query dataset($id: String) {
    dataset(id: $id) @rest(type: "Response", path: "package_show?{args}") {
      result {
        organization {
          name
          title
          image_url
        }
      }
    }
  }
`;

export const GET_DATAPACKAGE_QUERY = gql`
  query dataset($id: String) {
    dataset(id: $id) @rest(type: "Response", path: "package_show?{args}") {
      result {
        name
        title
        size
        metadata_created
        metadata_modified
        license_title
        author
        maintainer
        resources {
          name
        }
      }
    }
  }
`;

export const GET_RESOURCES_QUERY = gql`
  query dataset($id: String) {
    dataset(id: $id) @rest(type: "Response", path: "package_show?{args}") {
      result {
        id
        name
        resources {
          name
          title
          description
          url
          format
          created
          last_modified
        }
      }
    }
  }
`;

export const SEARCH_QUERY = gql`
  query search(
    $q: String
    $sort: String
    $rows: Int
    $start: Int
    $facetField: [String!]
    $facetLimit: Int
    $facetMinCount: Int
  ) {
    search(
      q: $q
      sort: $sort
      rows: $rows
      start: $start
      facetfield: $faceField
    ) @rest(type: "Search", path: "package_search?{args}") {
      result {
        count
        results {
          name
          title
          notes
          tags
          organization {
            name
            title
            description
          }
        }
      }
    }
  }
`;

// export const SEARCH_QUERY = gql`
//   query search(
//     $q: String
//     $sort: String
//     $rows: Int
//     $start: Int
//     $facetField: [String]
//     $facetLimit: Int
//     $facetMinCount: Int
//   ) {
//     search(q: $q, sort: $sort, rows: $rows, start: $start, facet.field: $facetField, facet.limit: $facetLimit, facet.mincount: $facetMinCount)
//       @rest(type: "Search", path: "package_search?{args}") {
//       result {
//         count
//         results {
//           name
//           title
//           organization {
//             name
//             title
//             description
//           }
//         }
//       }
//     }
//   }
// `;

export const GET_TOTAL_COUNT_QUERY = gql`
  query search($q: String, $sort: String) {
    search(q: $q, sort: $sort)
      @rest(type: "Search", path: "package_search?{args}") {
      result {
        count
      }
    }
  }
`;

export const GET_POSTS_QUERY = gql`
  query posts {
    posts @rest(type: "Posts", path: "", endpoint: "wordpress-posts") {
      found
      posts
      meta
    }
  }
`;

export const GET_PAGE_QUERY = gql`
  query page($slug: String) {
    page(slug: $slug)
      @rest(type: "Page", path: "{args.slug}", endpoint: "wordpress") {
      title
      content
      excerpt
      slug
      date
      modified
      featured_image
    }
  }
`;

export const GET_DATASET_QUERY = gql`
  query dataset($id: String) {
    dataset(id: $id) @rest(type: "Response", path: "package_show?{args}") {
      result {
        id
        name
        title
        size
        state
        notes
        private
        tags
        groups
        license_id
        license_title
        owner_org
        maintainer
        maintainer_email
        author
        author_email
        url
        metadata_created
        metadata_modified
        resources {
          name
          title
          format
          created
          url
          last_modified
        }
        organization {
          name
          title
          image_url
        }
      }
    }
  }
`;

export const GET_POST_QUERY = gql`
  query post($slug: String) {
    post(slug: $slug)
      @rest(type: "Post", path: "{args.slug}", endpoint: "wordpress") {
      title
      content
      excerpt
      slug
      date
      modified
    }
  }
`;
