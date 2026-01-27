import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredContent = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleCopy(content) {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  }

  function handleShare(pasteId) {
    const shareUrl = `${window.location.origin}/pastes/${pasteId}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this paste",
          text: "Sharing a paste with you",
          url: shareUrl,
        })
        .then(() => toast.success("Shared successfully!"))
        .catch(() => toast.error("Share cancelled"));
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    }
  }

  //Date formatter fn
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen mt-5 rounded-2xl bg-[#2b2b2b] text-white px-4 py-10">
      {/* Container */}
      <div className="max-w-4xl mx-auto">
        {/* Search */}
        <input
          type="text"
          placeholder="Search your paste..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black text-gray-300 px-5 py-3 rounded-full outline-none focus:ring-2 focus:ring-gray-600"
        />

        {/* Paste List */}
        <div className="flex flex-col gap-6 mt-8">
          {filteredContent.length > 0 ? (
            filteredContent.map((paste) => (
              <div
                key={paste?._id}
                className="bg-black rounded-2xl p-6 shadow-lg border border-gray-800"
              >
                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-200 mb-2">
                  {paste.title}
                </h2>

                {/* Content */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {paste.content}
                </p>

                {/* Date */}
                <p className="text-xs text-gray-500 mb-5">
                  {formatDate(paste.createdAt)}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                  <NavLink
                    to={`/pastes/${paste?._id}`}
                    className="px-4 py-2 rounded-full bg-[#1f1f1f] !text-[#646CFF] text-sm hover:bg-gray-700 transition"
                  >
                    View
                  </NavLink>

                  <NavLink
                    to={`/?pasteId=${paste?._id}`}
                    className="px-4 py-2 rounded-full bg-[#1f1f1f] !text-[#646CFF] text-sm hover:bg-gray-700 transition"
                  >
                    Edit
                  </NavLink>

                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="px-4 py-2 rounded-full bg-[#1f1f1f] text-[#646CFF] text-sm hover:bg-red-600 transition"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleCopy(paste?.content)}
                    className="px-4 py-2 rounded-full bg-[#1f1f1f] text-[#646CFF] text-sm hover:bg-gray-700 transition"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => handleShare(paste?._id)}
                    className="px-4 py-2 rounded-full bg-[#1f1f1f] text-[#646CFF] text-sm hover:bg-gray-700 transition"
                  >
                    Share
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">No pastes found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pastes;

//-------------------------------------------Previous Code---------------------------------------------------------------------
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { removeFromPastes } from "../redux/pasteSlice";
// import toast from "react-hot-toast";
// import { NavLink } from "react-router-dom";

// const Pastes = () => {
//   // First we will fetch overall Data from state(store)
//   const pastes = useSelector((state) => state.paste.pastes);
//   const dispatch = useDispatch(); //event(view,delete,copy,etc.) dispatcher added

//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredContent = pastes.filter(
//     //finding the searched paste by comparing/checking searched-title and paste-title(of each paste)
//     (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   function handleDelete(pasteId) {
//     dispatch(removeFromPastes(pasteId));
//   }

//   function handleCopy(content) {
//     navigator.clipboard.writeText(content);
//     toast.success("Copied to clipboard!");
//   }

//   function handleShare(pasteId) {
//     const shareUrl = `${window.location.origin}/pastes/${pasteId}`;
//     if (navigator.share) {
//       navigator
//         .share({
//           title: "Check out this paste",
//           text: "Sharing a paste with you",
//           url: shareUrl,
//         })
//         .then(() => toast.success("Shared successfully!"))
//         .catch(() => toast.error("Share cancelled"));
//     } else {
//       navigator.clipboard.writeText(shareUrl);
//       toast.success("Link copied to clipboard!");
//     }
//   }

//   return (
//     <div>
//       <input
//         className="bg-black p-3 rounded-4xl mt-4 min-w-[700px]"
//         type="text"
//         placeholder="Search Content Here!"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <div className="flex flex-col gap-4 mt-6">
//         {filteredContent.length > 0 &&
//           filteredContent.map((paste) => {
//             // every child paste should have different key identity (should be differes from each other)
//             return (
//               <div className="border" key={paste?._id}>
//                 <div>{paste.title}</div>
//                 <div>{paste.content}</div>
//                 <div>{paste.createdAt}</div>

//                 <div className="flex flex-row gap-3 justify-evenly">
//                   <button>
//                     <NavLink to={`/pastes/${paste?._id}`}>
//                       View {/* It will not re-render whole page */}
//                     </NavLink>
//                     {/* <a href={`/pastes/${paste?._id}`}>
//                       View
//                     </a> */}
//                   </button>

//                   {/* Edit button */}
//                   <button>
//                     {/* <a href={`/?pasteId=${paste?._id}`}>
//                       Edit
//                     </a>  */}
//                     <NavLink to={`/?pasteId=${paste?._id}`}>
//                       Edit {/* It will not re-render whole page */}
//                     </NavLink>
//                   </button>

//                   {/* Delete button */}
//                   <button onClick={() => handleDelete(paste?._id)}>
//                     {" "}
//                     {/* Forwarding ID of a paste using paste?.id */}
//                     Delete
//                   </button>

//                   {/* Copy button */}
//                   <button
//                     onClick={() => handleCopy(paste?.content)} //passing paste content as a argument to copy fn
//                   >
//                     Copy
//                   </button>
//                   {/* <button onClick={() => {
//                       navigator.clipboard.writeText(paste?.content);
//                       toast.success("Copied to clipboard!");
//                       }}>
//                     Copy
//                   </button> */}

//                   {/* Share button */}
//                   <button onClick={() => handleShare(paste?._id)}>
//                     Share
//                   </button>

//                 </div>
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default Pastes;
