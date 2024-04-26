import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const REVIEWS = gql`
  query GetReviews {
    reviews {
      data {
        id
        attributes {
          title
          rating
          body
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
export default function Homepage() {
  const { loading, error, data } = useQuery(REVIEWS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.reviews.data.map((review) => {
        const { attributes, id } = review;
        return (
          <div key={id} className="review-card">
            <div className="rating">{attributes.rating}</div>
            <h2>{attributes.title}</h2>

            {attributes.categories.data.map((c) => {
              const { id, attributes } = c; // Destructuring attributes from category
              return <small key={id}>{attributes.name}</small>;
            })}

            <p>{attributes.body[0].children[0].text.substring(0, 200)} ...</p>
            <Link to={`/details/${id}`}>Read more</Link>
          </div>
        );
      })}
    </div>
  );
}
