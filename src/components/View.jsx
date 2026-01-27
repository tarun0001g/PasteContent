import React from "react";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToPastes } from "../redux/pasteSlice";
import { addToPastes } from "../redux/pasteSlice";
// import { Copy } from "lucide-react";
import toast from "react-hot-toast";

const View = () => {
  const { id } = useParams(); //fetched id from parameter(path)

  const pastes = useSelector((state) => state.paste.pastes);

  //  const paste = pastes.filter((paste) => paste._id === id)[0];
  const paste = pastes.find((paste) => paste._id === id);
  if (!paste) {
    return <div className="text-white mt-10">Loading paste...</div>;
  }

  // Copy button logic
  const handleCopy = (content) => {
  navigator.clipboard.writeText(content);
  toast.success("Content copied!");
};


   return (
    <div>
      <div className="flex flex-row gap-4 mt-2 text-center place-content-between">
        {/* Title input */}
        <input
          className="bg-black p-1 pl-3 rounded-2xl mt-1 w-[67%]"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          // onChange={(e) => setTitle(e.target.value)}
          disabled //marked as disabled
        />
        <button
          className="bg-black p-2 rounded-2xl mt-1 gap-6 w-[25%] disabled:opacity-50"
          onClick={() => handleCopy(paste?.content)}
        >
          Copy Content
        </button>
      </div>

      {/* Content input */}

       <div className="mt-5">
        <textarea
          className="bg-black mt-4 min-w-[500px] p-2 rounded-2xl"
          type="text"
          value={paste.content}
          placeholder="Enter content here"
          // onChange={(e) => setValue(e.target.value)}
          rows={20}
          disabled //marked as disabled
        />
      </div>
      
    </div>
  );

};

export default View;
