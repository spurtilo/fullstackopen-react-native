import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../../graphql/mutations';
import ReviewFormContainer from './ReviewFormContainer';

const ReviewForm = () => {
  const [createReview, { error }] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;
    try {
      const { data } = await createReview({
        variables: {
          review: {
            repositoryName,
            ownerName,
            rating,
            text,
          },
        },
      });
      console.log(data);

      const { repositoryId } = data.createReview;
      navigate(`/${repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} error={error} />;
};

export default ReviewForm;
