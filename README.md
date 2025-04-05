# Rhythum

## Elevator Pitch

Do you ever try and take a quick study break only to find yourself distracted over an hour later? Rhythum is a tool to help you log your study sessions, so you understand where your time is going and stay on track.

## Key Features

#### Study sessions

Create a study session to track studying and taking breaks for a period of time. At any time you can switch between study and break mode. The blue summary bar will show you your time studying (dark blue) and your time taking breaks (light blue) over the course of the session.

#### Back on track reminders

After 15 minutes of taking a break, you'll get a notification to remind you to resume studying. Included in that notification is an inspirational quote to help you stay motivated for your next section of studying.

#### Session history

Once a session has ended, it goes into your list of past sessions. You can view these past sessions at any time.

#### Group sessions

Wanting to stay on track while studying with a group of friends? You can join another user's session using their session code. All users can view the session summary and start/end breaks.

## Technology breakdown

- HTML - Proper HTML pages for the login/signup page, list view, session detail page, and join with code page.
- CSS - Styling for the overall page layout and spacing, as well as the session progress bars.
- JavaScript - Allows for logging in/out, creating/joining sessions, starting/finishing breaks, ending sessions, and receiving notifications.
- React - Enables easier state management as well as more modular components, such as the summary bar or session info component.
- Service - Backend service with endpoints for:
  - Registering users
  - Logging users in
  - Logging users out
  - Getting all sessions
  - Creating a session
  - Joining a existing session
  - Ending a session
  - Starting/ending a break
- 3rd Party Service - Using https://zenquotes.io/ to get inspirational quotes to display in notifications.
- DB/Login
  - Users have an email, password (hashed), and a list of sessions. Users are able to login/logout with their email and password.
  - Sessions have a list of users, a list of timestamps for when breaks started/ended (sessions always start with studying), a flag for whether the session has ended, and a code to let other users join with.
- WebSocket - Information about starting/ending breaks or ending a session will be sent to all users in a session via WebSockets.

## Rhythum Design

![Rhythum Wireframe](rhythumWireframe.jpg)

---

## HTML deliverable

In this deliverable I built the structure of Rhythum with HTML.

- [x] HTML pages - I have a log in, sign up, list view, session view, and join session page, which represents all the pages for my website.
- [x] Links - Each page has links to other pages so the overall flow of the site is similar to how it will be once it's done.
- [x] Text - There is text for various headers, buttons, and links. There is also text for the notification and session date/time.
- [x] Images - I have an image for the logo. I am also representing the blue summary bars as images for now.
- [x] DB/Login - I have login and sign up pages which both have fields for inputting credentials. The session information will also be coming from the database.
- [x] 3rd Party Service - I have text representing a notification on the session view. The quote will come from a 3rd party API.
- [x] WebSocket - Clicking to start/finish a break or end a session will use WebSockets so other users can be in the same session as you.

## CSS deliverable

In this deliverable I styled the full HTML application using CSS and Bootstrap.

- [x] Header, footer, and main content body - I have a properly styled header and footer, with the main content taking up most of the page.
- [x] Navigation elements - I styled buttons with Bootstrap. I left the link navigation elements the same as I thought it looked best.
- [x] Responsive to window resizing - Tested the full app with the iPhone SE size (portrait and landscape). I made adjustments to the list and session pages to align elements more vertically with smaller screen sizes.
- [x] Application elements - Ensured good styling of elements overall, using both CSS and Bootstrap.
- [x] Application text content - Chose a nice font from Google Fonts and applied it globally.
- [x] Application images - Ensured images were properly aligned and had rounded corners. Also added a border to summary bars.

## React deliverable Phase 1: HTML/CSS

In this deliverable I created a React application and moved all my HTML/CSS into the new application. I also used React Router for navigation and React Bootstrap for styling of components. Finally, I created components for HTML elements that were used in multiple places.

- [x] Bundled using Vite - I am using Vite as the React bundler. You can run `npm run dev` to preview the application now.
- [x] Multiple react components - All of my HTML pages are now their own component. In addition, I've created components for various other sections of pages such as the header and footer, as well as the session card. There is little to no reactivity as this is not needed for this deliverable.
- [x] React router - I am using React Router and the Link component to have multiple pages within one SPA.

## React deliverable Phase 2: Interactivity

For this deliverable I added interactivity throughout the entire application. This means all the features are now fully functional for a single user. I am using local storage to store all the data, rather than a database. This means I'm also not using HTTPS or WebSockets yet. Also, I am not actually keeping track of registered users yet. Finally, I am not fetching quotes using the API yet.

- [x] Components - I created new components to make the code even more modular. These include the `summaryBar` and `sessionTimes` components.
- [x] Login - Type in a username and password to be logged in. Your login info will be stored using local storage and cleared when you log out.
- [x] Database - Right now I am storing all the session information within local storage, rather than the database.
- [x] WebSocket - Currently when you stop or start a break, it updates local storage with that information. Later on I'll switch this out for WebSocket communication.
- [x] Application logic - All of the main logic is there. The biggest piece was using all the times the user started/stopped working for a given session to construct the blue summary bar of how long they were working or not working for. There was also some logic for sending a push notification to the user after 15 minutes of being on a break.
- [x] Router - I separated out the routes into authenticated and unauthenticated routes. Then depending on whether the user is logged in it allow you to go to different routes.
- [x] Hooks - I created a few hooks to manage scheduling and sending the push notifications to remind the user to keep working.

## Service deliverable

For this deliverable I added backend endpoints for handling authentication and getting creating, toggling, and ending sessions.

 - [x] Node.js/Express HTTP service - I have an Node and Express HTTP service up and running.
 - [x] Static middleware for frontend - I'm using Express middleware for the React frontend.
 - [x] Calls to third party endpoints - I am calling the zenquotes.io API to get quotes to display to users when they've been taking a break for 15 minutes. I am routing the request for a quote through my own backend because of CORS restrictions.
 - [x] Backend service endpoints - I have all the HTTP endpoints working for authentication, session, and quotes (using 3rd party API). Right now, these endpoints are all storing data using in memory objects, rather than a database. However, the functionality is all there.
 - [x] Frontend calls service endpoints - I'm using the JavaScript fetch API to call the endpoints I wrote.
 - [x] Supports registration, login, logout, and restricted endpoint - I have registration, login, logout all working. So, you'll need to register with a username and password before you can login. All the other endpoints rely on the user being logged in.

## DB/Login deliverable
In this deliverable I move the backend's data storage from in-memory objects to MongoDB.

- [x] Stores data in MongoDB - I am storing all the sessions within the database. I'm using the SDK for all the CRUD operations.
- [x] Use MongoDB to store credentials - I am also storing credentials on each user in the database. Users have a list of sessions. Each user can only view the sessions they are added to.

## WebSocket deliverable
For this deliverable I implemented WebSocket functionality for showing realtime updates when in a session with others.

- [x] Backend listens for WebSocket connection - The backend listens for WebSocket requests from the client in routes/socket.ts.
- [x] Frontend makes WebSocket connection - The frontend now makes the toggle and end session requests using WebSockets.
- [x] Data sent over WebSocket connection - I'm sending stringified JSON objects over WebSocket of the updated session objects.
- [x] WebSocket data displayed - After the WebSocket session data is sent to the client I'm updating the UI so the users get real-time updates.