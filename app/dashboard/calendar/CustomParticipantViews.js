import React from "react";
import { useParticipantViewContext } from "@stream-io/video-react-sdk";

export const CustomParticipantViewUIBar = () => {
  const { participant } = useParticipantViewContext();
  return (
    <div className="bar-participant-name">
      {participant.name || participant.id}
    </div>
  );
};

export const CustomParticipantViewUISpotlight = () => {
  const { participant } = useParticipantViewContext();
  return (
    <div className="spotlight-participant-name">
      {participant.name || participant.id}
    </div>
  );
};

export const CustomVideoPlaceholder = ({ style }) => {
  const { participant } = useParticipantViewContext();
  return (
    <div className="video-placeholder" style={style}>
      <img src={participant.image} alt={participant.id} />
    </div>
  );
};
