// app/dashboard/calendar/CustomButtons.js
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

export const CustomAcceptCallButton = () => {
  const call = useCall();
  return (
    <button onClick={() => call?.join()}>
      <span className="my-icon">Accept Call</span>
    </button>
  );
};

export const CustomCancelCallButton = ({ reject = false }) => {
  const call = useCall();
  return (
    <button onClick={() => call?.leave({ reject })}>
      <span className="my-icon">Cancel Call</span>
    </button>
  );
};

export const CustomToggleAudioPublishingButton = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, isMute } = useMicrophoneState();
  return (
    <button onClick={() => microphone.toggle()}>
      {isMute ? (
        <span className="my-icon-disabled">Unmute</span>
      ) : (
        <span className="my-icon-enabled">Mute</span>
      )}
    </button>
  );
};

export const CustomToggleVideoPublishingButton = () => {
  const { useCameraState } = useCallStateHooks();
  const { camera, isMute } = useCameraState();
  return (
    <button onClick={() => camera.toggle()}>
      {isMute ? (
        <span className="my-icon-disabled">Enable Video</span>
      ) : (
        <span className="my-icon-enabled">Disable Video</span>
      )}
    </button>
  );
};

export const CustomScreenShareButton = () => {
  const { useScreenShareState, useHasOngoingScreenShare } = useCallStateHooks();
  const { screenShare, isMute: isScreenSharing } = useScreenShareState();
  const isSomeoneScreenSharing = useHasOngoingScreenShare();
  return (
    <button
      disabled={!isScreenSharing && isSomeoneScreenSharing}
      onClick={() => screenShare.toggle()}
    >
      {isScreenSharing ? (
        <span className="my-icon-enabled">Stop Sharing</span>
      ) : (
        <span className="my-icon-disabled">Share Screen</span>
      )}
    </button>
  );
};

export const ToggleNoiseCancellationButton = () => {
  const { isSupported, isEnabled, setEnabled } = useNoiseCancellation();
  if (!isSupported) return null;
  return (
    <button
      className={isEnabled ? "btn-toggle-nc-active" : "btn-toggle-nc"}
      type="button"
      onClick={() => setEnabled((enabled) => !enabled)}
    >
      Toggle Noise Cancellation
    </button>
  );
};

export const CustomRecordButton = () => {
  const call = useCall();
  const isRecording = useIsCallRecordingInProgress();
  return (
    <button
      onClick={() => {
        if (isRecording) {
          call?.stopRecording();
        } else {
          call?.startRecording();
        }
      }}
    >
      {isRecording ? (
        <span className="my-icon-enabled">Stop Recording</span>
      ) : (
        <span className="my-icon-disabled">Start Recording</span>
      )}
    </button>
  );
};
