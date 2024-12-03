import React from 'react';
import PropTypes from 'prop-types';
import GameTheoryForm from './form';
import styled from 'styled-components';
import { CARD_WIDTH, CARD_WIDTH_SM } from '../shared';

export const TITLE_HEIGHT = '20vh';

const Container = styled.div`
  position: relative;
  z-index: 20;
  display: flex;
  justify-content: center;
`;

const FooterContainer = styled.div`
  position: fixed;
  z-index: 20;
  width: ${CARD_WIDTH};
  height: 100vh;
  background: rgba(255, 255, 255, 0.99);
  border-radius: 200px 200px 0% 0%;
  backdrop-filter: blur(10px);
  text-align: center;
  transition: all 1.5s ease;
  transform: translateY(80vh);
  padding: 0 32px 32px 32px;
  border: 1px solid #7a7a7a;
  overflow-y: scroll;
  font-family: Helvetica;

  .title {
    height: ${TITLE_HEIGHT};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .contentContainer {
    transform: translateY(${TITLE_HEIGHT});
    transition: all 1s;
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 32px;
  }

  a {
    text-decoration: none;
    color: #000;
    transition: all 1s;

    &:hover {
      color: #ff0000;
    }
  }

  &:hover {
    transform: translateY(0vh);
    border-radius: 0;

    .contentContainer {
      transform: translateY(0);
      transition: all 1s;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .title {
      color: #7a7a7a;

      a {
        color: #7a7a7a;
        &:hover {
          color: #ff0000;
        }
      }
    }
  }

  @media (max-width: 600px) {
    width: ${CARD_WIDTH_SM};
    transform: translateY(70vh);
    padding: 0 16px 16px 16px;

    .contentContainer {
      height: auto;
    }
  }
`;

const Text = styled.div`
  font-size: 0.85rem;
  color: #7a7a7a;

  a {
    text-decoration: none;
  }
`;

const Footer = ({ data }) => {
  return (
    <Container>
      <FooterContainer>
        <h1 className='title'>game theory</h1>
        <div className='contentContainer'>
          <Text className='description'>
            this is a game where you are invited to play to cooperate or to
            betray.
          </Text>
          <GameTheoryForm lastSubmission={1} />

          {/* {data ? (
            <GameTheoryForm lastSubmission={data[data.length - 1]} />
          ) : (
            'Loading...'
          )} */}
          <div className='credit'>
            <Text>
              concept by{' '}
              <a
                href='https://instagram.com/ekezia'
                target='_blank'
                rel='noopener noreferrer'
              >
                ekezia
              </a>{' '}
              +{' '}
              <a
                href='https://instagram.com/marco1ee'
                target='_blank'
                rel='noopener noreferrer'
              >
                marco1ee
              </a>
              .
            </Text>
            <Text>
              player01 is{' '}
              <a
                href='https://instagram.com/bby.diwata'
                target='_blank'
                rel='noopener noreferrer'
              >
                bby.diwata
              </a>
              , player02 is{' '}
              <a
                href='https://instagram.com/parano0dle'
                target='_blank'
                rel='noopener noreferrer'
              >
                parano0dle
              </a>
              .
            </Text>
          </div>
        </div>
      </FooterContainer>
    </Container>
  );
};

Footer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      decision: PropTypes.oneOf(['betray', 'cooperate']).isRequired,
      gameresult: PropTypes.number.isRequired,
      time: PropTypes.any, // This can be refined depending on what 'time' is
    }),
  ),
};

export default Footer;
