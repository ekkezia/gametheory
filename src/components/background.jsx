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
  display: grid;
  filter: ${(props) => (props.hadSubmitted ? "blur(10px)" : "0px")};

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
`;

const Background = ({ data }) => {
  const { hadSubmitted } = useContext(SubmitContext);

  const calculateImageNumber = (imageNo) => {
    const equilibrium = Math.ceil((PICS_OPTIONS.length - 1) / 2);
    return Math.abs((imageNo + equilibrium) % PICS_OPTIONS.length);
  };

  return (
    <Container hadSubmitted={hadSubmitted}>
      {/* Background */}
      {[...Array(NUMBER_OF_ITEMS)].map((_, idx) => (
        <Item key={idx} style={{ aspectRatio: "3/2" }}>
          {`${idx + 1}`}
        </Item>
      ))}

      {/* Content */}
      {data &&
        data.map(({ name, decision, gameresult, time }, idx) => (
          <Item key={idx} style={{ aspectRatio: "3/2" }}>
            <Tooltip
              title={
                <div>
                  <p>
                    <a href={`https://instagram.com/${name}`}>{name}</a> chooses
                    to {decision}
                    {decision === "cooperate" ? " with " : " "}
                    <a
                      href={`https://instagram.com/${
                        idx !== 0 ? data[idx - 1].name : ""
                      }`}
                    >
                      {idx !== 0 ? data[idx - 1].name : ""}
                    </a>
                  </p>
                  {time.stringValue !== "" && <em>at {time}</em>}
                </div>
              }
              followCursor
            >
              <StyledImage
                src={PICS_OPTIONS[calculateImageNumber(gameresult) ?? 0]}
                alt={`pic-${idx + 1}-${decision}-${
                  idx !== 0 ? data[idx - 1].name : ""
                }-${calculateImageNumber(gameresult)}`}
              />
            </Tooltip>
          </Item>
        ))}
    </Container>
  );
};

Background.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Background;
