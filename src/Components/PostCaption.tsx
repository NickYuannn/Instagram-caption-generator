import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa6";

type PostCaptionProps = {
  img: File | null;
  caption: string;
};

function PostCaption({ img, caption }: PostCaptionProps) {
  return (
    <div className="bg-white mt-10 py-4 rounded">
      <div className="w-[400px] min-h-[400px] overflow-hidden">
        <div className="flex flex-row items-center mb-2 h-9 ml-1">
          <img
            src="/LinkedIn headshot.jpg"
            className="object-contain rounded-full w-8 h-8"
          />
          <h1 className="mb-1 ml-2 font-bold">nick</h1>

          <BsThreeDots className="ml-auto mr-2" size={20} />
        </div>
        {img && img.type.startsWith("image/") ? (
          <img
            src={URL.createObjectURL(img)}
            alt={caption}
            className="w-full h-auto object-cover block"
          />
        ) : (
          <img
            src={
              "https://s.yimg.com/ny/api/res/1.2/2sdJUb0jEIPANnB1FRQHTQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNztjZj13ZWJw/https://media.zenfs.com/en/athlon_sports_articles_610/16b906494281a587f68ba8b723581c15"
            }
            className="w-full h-auto object-cover block"
          />
        )}
        <div className="w-full flex flex-row items-center mt-2 px-2">
          <FaRegHeart className="inline m-1" size={25} />
          1000
          <FaRegComment className="inline m-1 ml-2" size={25} />
          241
          <FiSend className="inline m-1 ml-2" size={25} />
          395
          <FaRegBookmark className="mr-1 ml-auto" size={25} />
        </div>
        <div className="flex flex-row">
          <h1 className="font-bold ml-3">nick</h1>
          <p className="ml-2">{caption || "Caption couldn't load"}</p>
        </div>
      </div>
    </div>
  );
}

export default PostCaption;
