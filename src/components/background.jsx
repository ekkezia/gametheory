import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SubmitContext from '../contexts/submit-context';
import { NUMBER_OF_ITEMS, PICS_OPTIONS } from '../shared';
import { Tooltip } from '@mui/material';

const Container = styled.div`
	z-index: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: grid;
	filter: ${(props) => (props.$hadSubmitted ? 'blur(10px)' : '0px')};

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

const TooltipText = styled.div`
	font-size: 1rem;
`;

const TooltipLine = styled.div`
	margin-top: 4px;
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

const formatDecisionTime = (decisionTimeMs) => {
	if (decisionTimeMs == null) return null;

	const totalSeconds = Math.round(decisionTimeMs / 1000);
	if (totalSeconds < 60) {
		return `${totalSeconds} second${totalSeconds === 1 ? '' : 's'}`;
	}

	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}m ${seconds}s`;
};

const Background = ({ data, loading }) => {
	const { hadSubmitted, setImage } = useContext(SubmitContext);

	const calculateImageNumber = (imageNo) => {
		const equilibrium = Math.ceil((PICS_OPTIONS.length - 1) / 2);
		return Math.abs((imageNo + equilibrium) % PICS_OPTIONS.length);
	};

	const getPreviousSubmission = (idx) => data?.[idx - 1];

	return (
		<Container $hadSubmitted={hadSubmitted}>
			{[...Array(NUMBER_OF_ITEMS)].map((_, idx) => (
				<Item
					key={idx}
					style={{ aspectRatio: '3/2' }}
				>
					{data && data[idx] ? (
						<Tooltip
							title={
								<TooltipText>
									<TooltipLink href={`https://instagram.com/${data[idx].name}`}>
										{data[idx].name}
									</TooltipLink>
									<TooltipLine>
										{data[idx].decision_change_count == null ? (
											<></>
										) : (
											<>
												changed their decision {data[idx].decision_change_count}{' '}
												x and took&nbsp;
												{formatDecisionTime(data[idx].decision_time_ms)
													? formatDecisionTime(
															data[idx].decision_time_ms,
														)
													: 'an unrecorded amount of time'}
												&nbsp;before choosing to&nbsp;
											</>
										)}
										<DecisionSpan className={data[idx].decision}>
											{data[idx].decision}
										</DecisionSpan>
										&nbsp;in response to&nbsp;
										{getPreviousSubmission(idx) ? (
											<TooltipLink
												href={`https://instagram.com/${
													getPreviousSubmission(idx).name
												}`}
											>
												{getPreviousSubmission(idx).name}
											</TooltipLink>
										) : (
											'NONE'
										)}
									</TooltipLine>
									<TooltipLine>
										at&nbsp;
										<em>{new Date(data[idx].time).toLocaleString('en-US')}</em>
									</TooltipLine>
									<TooltipLine>
										{data[idx].location_status === 'shared' &&
										data[idx].location_latitude != null &&
										data[idx].location_longitude != null
											? `near ${data[idx].location_latitude}, ${data[idx].location_longitude}`
											: 'location not shared'}
									</TooltipLine>
								</TooltipText>
							}
							followCursor
						>
							{/* <StyledLink
                href={`https://instagram.com/${data[idx].name}`}
                target="_blank"
              > */}
							<StyledImage
								src={
									PICS_OPTIONS[calculateImageNumber(data[idx].gameresult) ?? 0]
								}
								alt={`pic-${idx + 1}-${data[idx].decision}-${
									getPreviousSubmission(idx)?.name ?? ''
								}-${calculateImageNumber(data[idx].gameresult)}`}
								onClick={() =>
									setImage(
										PICS_OPTIONS[
											calculateImageNumber(data[idx].gameresult) ?? 0
										],
									)
								}
							/>
							{/* </StyledLink> */}
						</Tooltip>
					) : loading ? (
						'⏳'
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
			decision: PropTypes.oneOf(['betray', 'cooperate']).isRequired,
			gameresult: PropTypes.number.isRequired,
			decision_time_ms: PropTypes.number,
			decision_change_count: PropTypes.number,
			prediction: PropTypes.oneOf(['betray', 'cooperate']),
			location_status: PropTypes.oneOf([
				'not_requested',
				'shared',
				'denied',
				'unavailable',
			]),
			location_latitude: PropTypes.number,
			location_longitude: PropTypes.number,
			time: PropTypes.any, // This can be refined depending on what 'time' is
		}),
	),
	loading: PropTypes.bool,
};

export default Background;
