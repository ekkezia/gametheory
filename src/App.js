"use client";

import { useEffect, useState } from "react";
import Background from "./components/background";
import Footer from "./components/footer";
import SubmitContext from './contexts/submit-context';
import { getSubmission } from "./actions/get-submission";

export default function Page() {
  const [hadSubmitted, setHadSubmitted] = useState(false);

  const [data, setData] = useState();

  useEffect(() => {
    getSubmission().then((res) => {
      setData(res);
    });
  }, [hadSubmitted]);

  return (
    <SubmitContext.Provider value={{ hadSubmitted, setHadSubmitted }}>
      <Background data={data} />
      <Footer data={data} />
    </SubmitContext.Provider>
  );
}
