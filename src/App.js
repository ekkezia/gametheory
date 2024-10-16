import { useState } from "react";
import Background from "./components/background";
import Footer from "./components/footer";
import SubmitContext from "./contexts/submit-context";
import useSWR from "swr";
import axiosInstance from "./axios/config";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

export default function Page() {
  const { data, isValidating } = useSWR(
    process.env.REACT_APP_BACKEND_API_URL,
    fetcher
  );

  const [hadSubmitted, setHadSubmitted] = useState(false);

  return (
    <SubmitContext.Provider value={{ hadSubmitted, setHadSubmitted }}>
      <Background data={data} loading={isValidating} />
      <Footer data={data} />
    </SubmitContext.Provider>
  );
}
