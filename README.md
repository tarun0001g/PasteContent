
# Installation
First we will create vite project with tailwind css : https://tailwindcss.com/docs/installation/using-vite

Then, we will install  "npm i react-router-dom" to routes between different pages.  https://www.npmjs.com/package/react-router-dom
(pages like create paste, view paste, view all listedd paste)

Then we will install redux toolkit for state management. 
 "npm install @reduxjs/toolkit react-redux" from  https://redux-toolkit.js.org/tutorials/quick-start

# Basic setup of redux toolkit
now all installed. 
 - now first we will create store and slice files.
 - now we will connect store with main file & wrap App() with provider
 - in pasteSlice we have added initial state array for storing all pastes and added paste actions.
 - Now we need to import the reducer (pasteReducer fn) function from the pasteSlice and add it to our store. (This reducer fn will handle all states updations of our paste application.)
 - we will pasteReducer and its path into the store file.

# Routing setup
we will add main 3 routes
    ~ / -> Home -> creation or updation of paste
    ~ /pastes -> List of all pastes + edit,delete,view,copy options
    ~ /pastes/:id -> View specific paste
- First we created browserRouter
- Then added Paths & Elements
- Then we have created components and linked/imported in app.jsx

# Defininng each components
- first we will add navlinks in Navbar\
# home.jsx
- then we will edit/configure Home page
- We will use conditional rendering in Home page where, if we creatig new paste->show -> Create Paste button
for updation ->show-> Update the paste button
- Basically edit/update paste will forwarded from Pastes.jsx page with Paste ID
(we will use paste id as a logic, if paste comes with id->Update paste button, else->Create Paste button) Ex.(http://localhost:5173/?pasteId=00144)
- Then we wiill add textarea for creating/updating content
- Then we will add onClick logic in a fn for updating/creating a paste
# pastes
- now we will edit the list of pastes page
- here we will add search section, list of all pastes with content with buttons like Edit/View/Delete/Copy/Share
- For search bar, we will use filtering, for filtering we need to fetch overall data and filter them with Search parameters
- so we will fetch overallData from state(Store) using useSelector 
- now we will find searched content using filter fn and paste title & searched parameter
- now we will add seaarch bar and all pastes with content,date & view/delete/edit/copy buttons
- now we will add logic for onclick of each button
- for view button we will open View.jsx page
# View
- by onclick of view we will route it to the view.jsx page
- we will show any particular paste based on its ID
- it will take id as a parameter like './pastes/id'
- we will copy paste same code from home.jsx and just disable the changes





