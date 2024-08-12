import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RULES } from "../shared";
import SubmitContext from "../contexts/submit-context";
import { postSubmission } from "../actions/post-submission";

const Text = styled.div`
  color: #000;
  font-size: 0.85rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const FormInput = styled.input`
  border: none;
  background: none;
  border-bottom: 1px solid #7a7a7a;
  font-size: 0.85rem;
  padding: 8px;
`;

const Button = styled.button`
  margin-top: 16px;
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border-radius: 0;
  border: 1px solid #000;
  background: none;
  color: #000;
  cursor: pointer;
  box-shadow: none;
  &:hover {
    background: #ffffff;
    color: #000000;
  }
  &:disabled {
    opacity: 0.1;
  }
`;

const FormContainer = styled.form`
  position: relative;
  opacity: 1;
`;

const Blur = styled.div`
  opacity: 1;
  .blur {
    opacity: 0.1;
  }
`;

const WarningText = styled.div`
  position: absolute;
  top: 0;
  opacity: 1 !important;
  color: #ff0000;
`;

const GameTheoryForm = ({ lastSubmission }) => {
  const { setHadSubmitted } = useContext(SubmitContext);

  const checkLocalStorage =
    typeof window !== "undefined"
      ? localStorage.getItem("username_is_submitted")
      : false;

  const [userAlreadySubmitted, setUserAlreadySubmitted] =
    useState(checkLocalStorage);

  const [loading, setLoading] = useState("idle");

  const getGameResult = (currDecision) => {
    let lastSubmissionResult = lastSubmission.gameresult;
    if (lastSubmission.decision === "cooperate") {
      if (currDecision === "cooperate") return lastSubmissionResult + RULES.c_c;
      else if (currDecision === "betray")
        return lastSubmissionResult + RULES.c_b;
    } else if (lastSubmission.decision === "betray") {
      if (currDecision === "cooperate") return lastSubmissionResult + RULES.b_c;
      else if (currDecision === "betray")
        return lastSubmissionResult + RULES.b_b;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = document.querySelector("form");
    const data = Object.fromEntries(new FormData(form).entries());
    if (data) {
      setLoading("loading");
      await postSubmission(
        data.name,
        data.decision,
        getGameResult(data.decision.toString())
      ).then((res) => {
        if (res) {
          setHadSubmitted(true);
          setTimeout(() => {
            setLoading("success");
          }, 1000);
        } else {
          setLoading("fail");
        }
      });

      setUserAlreadySubmitted(checkLocalStorage);
    }
  };

  return (
    <FormContainer id="game-theory" method="post" onSubmit={handleSubmit}>
      {userAlreadySubmitted && (
        <WarningText>
          you already submitted! take turn with others please.. share it on your
          ig or sumthing!
        </WarningText>
      )}

      <Blur className={userAlreadySubmitted && "blur"}>
        <Text>
          In response to the cooperation/betrayal from the previous user, I,
        </Text>
        <InputContainer>
          <FormInput
            type="text"
            placeholder="IG Username / Your Name @ekezia"
            aria-label="Name"
            name="name"
          />
        </InputContainer>
        <Text style={{ marginBottom: 16 }}>am consciously deciding to</Text>

        <div>
          <div>
            <div>
              <input
                type="radio"
                id="answer1"
                name="decision"
                value="cooperate"
              />
              <div className="text-sm font-bold">cooperate</div>
            </div>
            <img
              id="answer1"
              src="https://lmgbcuolwhkqoowxnaik.supabase.co/storage/v1/object/public/gametheory/cooperate.jpg"
              alt="answer1"
              width="150px"
              height="100px"
            />
          </div>
          <div>
            <div className="text-sm">or</div>
          </div>
          <div>
            <div className="flex gap-1">
              <input type="radio" id="answer2" name="decision" value="betray" />
              <div className="text-sm font-bold">betray</div>
            </div>
            <img
              id="answer2"
              src="https://lmgbcuolwhkqoowxnaik.supabase.co/storage/v1/object/public/gametheory/betray.jpg"
              alt="answer2"
              width="150px"
              height="100px"
            />
          </div>
        </div>
        <Button type="submit" disabled={userAlreadySubmitted ? true : false}>
          {loading === "idle" && "Submit"}
          {loading === "loading" && "Submitting..."}
          {loading === "success" && "Submitted"}
          {loading === "fail" && "Failed Submitting"}
        </Button>
      </Blur>
    </FormContainer>
  );
};

GameTheoryForm.propTypes = {
  lastSubmission: PropTypes.object.isRequired,
};

export default GameTheoryForm;
