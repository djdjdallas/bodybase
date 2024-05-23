"use client";
import { useEffect, useState } from "react";
import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  StreamTheme,
  ParticipantView,
  StreamVideoParticipant,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const apiKey = "mmhfdzb5evj2"; // the API key can be found in the "Credentials" section
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWmFtX1dlc2VsbCIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvWmFtX1dlc2VsbCIsImlhdCI6MTcxNTg5OTcxNiwiZXhwIjoxNzE2NTA0NTIxfQ.qcqIRNYa38FzUSzXB0jWrvaYFA4X7ZScVXIluDNkNJE"; // the token can be found in the "Credentials" section
const userId = "Zam_Wesell"; // the user id can be found in the "Credentials" section
const callId = "Z3ZC9UWaMRT1"; // the call id can be found in the "Credentials" section

// set up the user object
const user = {
  id: userId,
  name: "Oliver",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

export default function StreamCallPage() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

const MyUILayout = () => {
  const call = useCall();
  const {
    useCallCallingState,
    useParticipantCount,
    useLocalParticipant,
    useRemoteParticipants,
  } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
};

export const MyParticipantList = ({ participants }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
      {participants.map((participant) => (
        <ParticipantView
          participant={participant}
          key={participant.sessionId}
        />
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = ({ participant }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "15px",
        left: "15px",
        width: "240px",
        height: "135px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 3px",
        borderRadius: "12px",
      }}
    >
      <ParticipantView participant={participant} />
    </div>
  );
};
