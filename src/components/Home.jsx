import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToPastes } from "../redux/pasteSlice";
import { addToPastes } from "../redux/pasteSlice";

const Home = () => {
  let [title, setTitle] = useState("");
  let [value, setValue] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch(); // we are using dispatcher to access reducer function(who performs state managements)
  const allPastes = useSelector((state) => state.paste.pastes); //fetched all pastes from state(store)

  //Main purpose of this useEffect to show data in input field during updation
  useEffect(() => {
    //this is used to show the title & content of a paste for updation
    if (pasteId) {
      // if pasteId is exist
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        //if fetched paste's id === pasteid of paste in localstorage are match then set,
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId]);

  //Onclick Handling fn for create/update
  //we want to add logic that will create/update paste(data) and forward it to the slice(where slice will store it in local storage)
  function handleCreatePaste() {
    //creating a paste(data) object
    const paste = {
      title: title, //paste title
      content: value, //actual content
      _id:
        pasteId || // if pasteid is already exist then use it
        Date.now().toString(36), //if pastid not exist then it will creates its own random id
      createdAt: new Date().toISOString(), // current Date & time of paste creation/updation
    };

    //for Storing a paste object
    if (pasteId) {
      //if pasteId is already exist
      // then, update the paste
      dispatch(updateToPastes(paste)); // we are sharing paste as a payload to slice
    } else {
      //Create a new paste
      dispatch(addToPastes(paste)); // we are sharing paste as a payload to slice
    }

    //after creation/updation of paste, set
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row gap-4 mt-2 text-center place-content-between">
        {/* Title input */}
        <input
          className="bg-black p-1 pl-3 rounded-2xl mt-1 w-[67%]"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Create/Update Button */}
        <button
          className="bg-black p-2 rounded-2xl mt-1 gap-6 w-[25%] disabled:opacity-50"
          onClick={handleCreatePaste}
          disabled={!title.trim() || !value.trim()} //Button will be disabled untill user add something in input
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>

      </div>

      <div className="mt-5">
        {/* Content input */}
        <textarea
          className="bg-black mt-4 min-w-[500px] p-2 rounded-2xl"
          type="text"
          value={value}
          placeholder="Enter your paste content here..."
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
