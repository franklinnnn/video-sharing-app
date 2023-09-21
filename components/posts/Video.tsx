import useVideoPlayer from "@/hooks/useVideoPlayer";
import React, { useRef, useState } from "react";
import { useInView } from "react-hook-inview";

import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillVolumeUpFill,
  BsVolumeMuteFill,
} from "react-icons/bs";

interface VideoProps {
  video: string;
}

const Video = ({ video }: VideoProps) => {
  const [ref, inView] = useInView();
  const videoRef = useRef(null);
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    toggleMute,
  } = useVideoPlayer(videoRef);
  return (
    <div className="relative h-[60vh] w-full bg-black rounded-md">
      <div className="relative flex justify-center w-full overflow-hidden rounded-md group">
        <video
          ref={videoRef}
          onClick={togglePlay}
          onTimeUpdate={handleOnTimeUpdate}
          className="h-[60vh] aspect-[9/16]"
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute -bottom-2 w-full opacity-0 group-hover:opacity-80 transition duration-200">
          <div className="flex items-center justify-between w-full">
            <button
              onClick={togglePlay}
              className="bg-none border-none outline-none cursor-pointer px-1 text-white"
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
      {/* <video
        muted
        controls
        controlsList="nodownload noplayback"
        disablePictureInPicture
        onMouseOver={handleOnMouseOver}
        onMouseOut={handleOnMouseOut}
        className="post-video h-[60vh] rounded-md aspect-[9/16] bg-black/20 focus:outline-none"
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="absolute bottom-2 flex gap-2 px-2 items-center w-full z-10">
        <button className="border-none bg-transparent cursor-pointer opacity-80 transition-all hover:opacity-100 text-white">
          {isPlaying ? (
            <BsFillPlayFill size={30} />
          ) : (
            <BsFillPauseFill size={30} />
          )}
        </button>
        <input type="range" min="0" max="100" value="0" className="timeline" />
        <button>
          <BsFillVolumeUpFill size={30} color="white" />
        </button>
      </div> */}
    </div>
  );
};

export default Video;
//
