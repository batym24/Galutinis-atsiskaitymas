import styled from 'styled-components';

const Spinner = styled.div`
  border: 4px solid #f3f3f3; /* Light gray */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const Loading = () => {
 
  return (
        <LoadingComponent>
          <Spinner />
        </LoadingComponent>
      )}

export default Loading;