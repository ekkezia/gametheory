import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RULES } from "../shared";
import { mutate } from "swr";

const Text = styled.div`
  color: #000;
  font-size: 0.85rem;
  line-height: 1.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const FormInput = styled.input`
  border: none;
  background: #d9d9d9;
  font-size: 1.5rem;
  padding: 2px;
  text-align: center;
  color: #000000;
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
  &.blur {
    opacity: 0.1;
  }
`;
const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;
const Option = styled.div`
  display: flex;
`;
const OptionText = styled.div`
  color: #000000;
  font-size: 1.5rem;
`;

const WarningText = styled.div`
  position: absolute;
  top: 0;
  opacity: 1 !important;
  color: #ff0000;
  font-size: 1.5rem;
`;

const GameTheoryForm = ({ lastSubmission }) => {
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

      axios
        .post(process.env.REACT_APP_BACKEND_API_URL, {
          name: data.name,
          decision: data.decision,
          gameresult: getGameResult(data.decision),
        })
        .then((response) => {
          console.log("response", response);
          setLoading("success");
          mutate(process.env.REACT_APP_BACKEND_API_URL); // revalidate backend
          localStorage.setItem("username_is_submitted", true);
        })
        .catch((error) => {
          console.error(error);
          setLoading("fail");
          setTimeout(() => {
            setLoading("idle");
          }, [3000]);
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
          <OptionContainer>
            <Option>
              <input
                type="radio"
                id="answer1"
                name="decision"
                value="cooperate"
              />
              <OptionText style={{ color: "blue" }}>cooperate</OptionText>
            </Option>
            <img
              id="answer1"
              src="https://lmgbcuolwhkqoowxnaik.supabase.co/storage/v1/object/public/gametheory/cooperate.jpg"
              alt="answer1"
              width="150px"
              height="100px"
            />
          </OptionContainer>
          <Text>or</Text>
          <OptionContainer>
            <Option>
              <input type="radio" id="answer2" name="decision" value="betray" />
              <OptionText style={{ color: "red" }}>betray</OptionText>
            </Option>
            <img
              id="answer2"
              src="https://lmgbcuolwhkqoowxnaik.supabase.co/storage/v1/object/public/gametheory/betray.jpg"
              alt="answer2"
              width="150px"
              height="100px"
            />
          </OptionContainer>
        </div>
        <Button
          type="submit"
          disabled={userAlreadySubmitted || loading !== "idle"}
        >
          {loading === "idle" && "Submit"}
          {loading === "loading" && "Submitting..."}
          {loading === "success" &&
            "Submitted, check the image board to see your result!"}
          {loading === "fail" && "Failed Submitting 😭 Try again?"}
        </Button>
      </Blur>
    </FormContainer>
  );
};

GameTheoryForm.propTypes = {
  lastSubmission: PropTypes.object.isRequired,
};

export default GameTheoryForm;
