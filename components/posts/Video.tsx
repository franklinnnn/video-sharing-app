"use client";

import useVideoPlayer from "@/hooks/useVideoPlayer";
import { VideoProps } from "@/types";
import { useRef } from "react";
import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillVolumeUpFill,
  BsVolumeMuteFill,
} from "react-icons/bs";

const Video = ({ video, isBigVideo }: VideoProps) => {
  const videoRef = useRef(null);
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    toggleMute,
  } = useVideoPlayer(videoRef);

  return (
    <div
      className={`w-full bg-main-dark ${
        isBigVideo ? "rounded-none" : "rounded-md"
      }`}
    >
      <div className="relative flex justify-center w-full overflow-hidden rounded-md group">
        <video
          ref={videoRef}
          onClick={togglePlay}
          onTimeUpdate={handleOnTimeUpdate}
          className={`${
            isBigVideo ? "h-screen" : "h-[60vh]"
          } aspect-[9/16] object-cover sm:object-contain`}
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute -bottom-2 w-full opacity-0 group-hover:opacity-80 transition duration-200">
          <div className="flex items-center justify-between w-full">
            <button
              onClick={togglePlay}
              className="bg-none border-none outline-none cursor-pointer px-1 text-main-light"
            >
              {!playerState.isPlaying ? (
                <BsFillPlayFill size={30} />
              ) : (
                <BsFillPauseFill size={30} />
              )}
            </button>
            <button
              className="mute-btn bg-none border-none outline-none cursor-pointer px-1"
              onClick={toggleMute}
            >
              {!playerState.isMuted ? (
                <BsFillVolumeUpFill size={30} color="white" />
              ) : (
                <BsVolumeMuteFill size={30} color="white" />
              )}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleVideoProgress(e)}
            className="video-timeline"
          />
        </div>
      </div>
    </div>
  );
};

export default Video;
