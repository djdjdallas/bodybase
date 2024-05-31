"use client";
import { useEffect, useState } from "react";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  StreamTheme,
  useCall,
  useCallStateHooks,
  CallingState,
  CallControls,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import {
  CustomParticipantViewUIBar,
  CustomParticipantViewUISpotlight,
  CustomVideoPlaceholder,
  CustomParticipantViews,
} from "../calendar/CustomParticipantViews";
// import {
//   CustomParticipantViewUIBar,
//   CustomParticipantViewUISpotlight,
//   CustomVideoPlaceholder,
// } from "./CustomParticipantViews";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  CustomAcceptCallButton,
  CustomCancelCallButton,
  CustomRecordButton,
  CustomScreenShareButton,
  CustomToggleAudioPublishingButton,
  CustomToggleVideoPublishingButton,
  ToggleNoiseCancellationButton,
} from "../calendar/CustomButtons";

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWmFtX1dlc2VsbCIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvWmFtX1dlc2VsbCIsImlhdCI6MTcxNTg5OTcxNiwiZXhwIjoxNzE2NTA0NTIxfQ.qcqIRNYa38FzUSzXB0jWrvaYFA4X7ZScVXIluDNkNJE";
const userId = "Zam_Wesell";
const callId = "Z3ZC9UWaMRT1";

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
      <SpeakerLayout
        participantsBarPosition="bottom"
        VideoPlaceholder={CustomVideoPlaceholder}
        ParticipantViewUIBar={CustomParticipantViewUIBar}
        ParticipantViewUISpotlight={CustomParticipantViewUISpotlight}
      />
      <CallControls>
        <CustomAcceptCallButton />
        <CustomCancelCallButton />
        <CustomToggleAudioPublishingButton />
        <CustomToggleVideoPublishingButton />
        <CustomScreenShareButton />
        <ToggleNoiseCancellationButton />
        <CustomRecordButton />
      </CallControls>
    </StreamTheme>
  );
};
