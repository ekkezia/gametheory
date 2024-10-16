import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SubmitContext from "../contexts/submit-context";
import { NUMBER_OF_ITEMS, PICS_OPTIONS } from "../shared";
import { Tooltip } from "@mui/material";

const Container = styled.div`
  z-index: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  filter: ${(props) => (props.$hadSubmitted ? "blur(10px)" : "0px")};

  @media (max-width: 744px) {
    grid-template-columns: repeat(auto-fill, 20%);
  }

  @media (min-width: 744px) {
    grid-template-columns: repeat(auto-fill, 10%);
  }
`;

const Item = styled.div`
  border: 1px solid black;
  aspect-ratio: 3/2;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: Courier;
`;

const StyledImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const StyledLink = styled.a`
  width: 100%;
  height: 100%;
  display: inline-block;
`;

const TooltipText = styled.p`
  font-size: 1rem;
`;

const TooltipLink = styled.a`
  font-size: 1rem;
  color: white;
  background: black;
  text-decoration: none;
`;
const DecisionSpan = styled.span`
  font-size: 1rem;
  &.betray {
    background: red;
  }
  &.cooperate {
    background: blue;
  }
`;

const Background = ({ data, loading }) => {
  const { hadSubmitted } = useContext(SubmitContext);

  const calculateImageNumber = (imageNo) => {
    const equilibrium = Math.ceil((PICS_OPTIONS.length - 1) / 2);
    return Math.abs((imageNo + equilibrium) % PICS_OPTIONS.length);
  };

  return (
    <Container $hadSubmitted={hadSubmitted}>
      {[...Array(NUMBER_OF_ITEMS)].map((_, idx) => (
        <Item key={idx} style={{ aspectRatio: "3/2" }}>
          {data && data[idx] ? (
            <Tooltip
              title={
                <TooltipText>
                  <TooltipLink href={`https://instagram.com/${data[idx].name}`}>
                    {data[idx].name}
                  </TooltipLink>
                  &nbsp;chooses to&nbsp;
                  <DecisionSpan className={data[idx].decision}>
                    {data[idx].decision}
                  </DecisionSpan>
                  <span>
                    &nbsp;{data[idx].decision === "cooperate" ? " with " : ""}
                  </span>
                  <TooltipLink
                    href={`https://instagram.com/${
                      idx !== 0 ? data[idx - 1].name : "NONE"
                    }`}
                  >
                    {idx !== 0 ? data[idx - 1].name : "NONE"}
                  </TooltipLink>
                  &nbsp;
                  <em>at {new Date(data[idx].time).toLocaleString("en-US")}</em>
                </TooltipText>
              }
              followCursor
            >
              <StyledLink
                href={`https://instagram.com/${data[idx].name}`}
                target="_blank"
              >
                <StyledImage
                  src={
                    PICS_OPTIONS[
                      calculateImageNumber(data[idx].gameresult) ?? 0
                    ]
                  }
                  alt={`pic-${idx + 1}-${data[idx].decision}-${
                    idx !== 0 ? data[idx].name : ""
                  }-${calculateImageNumber(data[idx].gameresult)}`}
                />
              </StyledLink>
            </Tooltip>
          ) : loading ? (
            "⏳"
          ) : (
            <Tooltip
              title={
                <TooltipText>
                  Hover over the <em>gametheory</em> menu below and submit your
                  game response to unlock Image #{idx + 1}
                </TooltipText>
              }
            >
              <p>{idx + 1}</p>
            </Tooltip>
          )}
        </Item>
      ))}
    </Container>
  );
};

Background.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      decision: PropTypes.oneOf(["betray", "cooperate"]).isRequired,
      gameresult: PropTypes.number.isRequired,
      time: PropTypes.any, // This can be refined depending on what 'time' is
    })
  ),
  loading: PropTypes.bool,
};

export default Background;
