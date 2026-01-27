import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";



export const pasteSlice = createSlice({
  name: "paste", //paste is the name of our Slice
  initialState: {
    // How initial state works:
    //  “When my app starts, check if there are already some pastes saved in the browser.
    // If yes → load them.
    // If no → start with an empty list.”

    // value: 0  //this initial state will have our all pastes(data). so we will use pastes instead of value

    // we will store and get all pastes(data) from our local storage (inspect->application->local storage)
    // pastes is the name of slice values 
    pastes: localStorage.getItem("pastes") //Checks if something is saved in the browser under the key pastes
      ? JSON.parse(localStorage.getItem("pastes")) // if yes, Convert the saved text data into a JavaScript object/array.
      : [], //else, Use an empty array as default.
  },
  reducers: {
    addToPastes: (state, action) => {
      //Add Check: is paste already exist with same name or id ?

      //first we will get entire payload that passed from home.jsx
      const paste = action.payload; //means this(paste) is now our paste object
      // Now we will add this new paste in our list of pastes in store
      state.pastes.push(paste); //adding this paste in the list(array) of all pastes
      //now paste is in centralized store
      //saving it in our local storage
      localStorage.setItem("pastes", JSON.stringify(state.pastes)); //.setItem(Key, value) key and value of paste(data) is added in local storage
      toast("Paste Created Successfully!");
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1); //paste deleted here

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Deleted!");
      }
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;
      //to update any paste, we need to find its index in the state
      // the index will be either 0 or >0 if it is valid(really exist) if it is negative means index not exist
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Updated!");
      }
    },

    resetAllToPastes: (state, action) => {
      state.pastes = []; //state array will be empty
      localStorage.removeItem("pastes"); //local storage will be empty
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, removeFromPastes, updateToPastes, resetAllToPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
