import { useState } from 'react';
import Background from './components/background';
import Footer from './components/footer';
import SubmitContext from './contexts/submit-context';
import useSWR from 'swr';
// import axiosInstance from "./axios/config";
import styled from 'styled-components';
import { supabase } from './supabase/config';

// const fetcher = (url) =>
//   axiosInstance
//     .get(url, { headers: { "Cache-Control": "no-cache" } })
//     .then((res) => res.data);

const fetcher = async () => {
  const { data, error } = await supabase.from('gametheory').select('*');
  if (error) throw new Error(error.message);
  return data;
};

const StyledImageContainer = styled.div`
  display: ${(props) => (props.$display ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  z-index: 11;
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.1);
  transition: all 2s;
`;
const StyledImage = styled.img`
  height: 90vh;
  width: 100%;
  object-fit: contain;
  aspect-ratio: 3/2;
`;

export default function Page() {
  const { data, isValidating } = useSWR(
    '/', // Query key
    fetcher,
  );

  const [hadSubmitted, setHadSubmitted] = useState(false);
  const [image, setImage] = useState(null);

  return (
    <SubmitContext.Provider
      value={{ hadSubmitted, setHadSubmitted, image, setImage }}
    >
      <Background data={data} loading={isValidating} />
      <Footer data={data} />
      <StyledImageContainer $display={image} onClick={() => setImage(null)}>
        <StyledImage src={image} alt={image} />
      </StyledImageContainer>
    </SubmitContext.Provider>
  );
}
