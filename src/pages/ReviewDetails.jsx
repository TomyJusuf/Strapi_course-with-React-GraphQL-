import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
      data {
        id
        attributes {
          rating
          title
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

export default function ReviewDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { rating, title, body, categories } = data.review.data.attributes;

  return (
    <div className="review-card">
      <div className="rating">{rating}</div>
      <h2>{title}</h2>
      {categories.data.map((c) => (
        <small key={c.id}>{c.attributes.name}</small>
      ))}

      {body && Array.isArray(body) ? (
        body.map((paragraph, index) => (
          <p key={index}>{paragraph.children[0].text}</p>
        ))
      ) : (
        <p>No content available</p>
      )}
    </div>
  );
}
