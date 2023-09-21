import React, { useState } from "react";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlayVideo = (event: React.MouseEvent<HTMLVideoElement>) => {
    if (event.currentTarget.paused) {
      event.currentTarget.play();
      setIsPlaying(true);
    } else {
      event.currentTarget.pause();
      setIsPlaying(false);
    }
  };
  const handleOnMouseOver = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.currentTarget.play();
    setIsPlaying(true);
  };

  const handleOnMouseOut = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.currentTarget.pause();
    setIsPlaying(false);
  };

  return (
    <div className="relative h-[60vh]">
      <video
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
          {/* <BsVolumeMuteFill /> */}
        </button>
      </div>
    </div>
  );
};

export default Video;
//
