# Rhythum

Do you ever try and take a quick study break only to find yourself distracted over an hour later? Rhythum is a tool to help you track your study sessions, so you never get off track for too long.

## Key Features

#### Study sessions
Create a study session to track studying and taking breaks for a period of time. At any time you can switch between study and break mode. The blue summary bar will show you your time studying (dark blue) and your time taking breaks (light blue) over the course of the session.

#### Session history
Once a session has ended, it goes into your list of past sessions. You can view these past sessions at any time.

#### Back on track reminders
After 15 minutes of taking a break, you'll get a notification to remind you to resume studying. Included in that notification is an inspirational quote to help you stay motivated for your next section of studying.

#### Group sessions
Studying with a group of friends? You can join another user's session using their session code. All users can view the session summary and start/end breaks.

## Technology breakdown
* HTML - Proper HTML pages for the login/signup page, list view, session detail page, and join with code page.
* CSS - Styling for the overall page layout and spacing, as well as the session progress bars.
* JavaScript - Allows for logging in/out, creating/joining sessions, starting/finishing breaks, ending sessions, and receiving notifications.
* React - Enables easier state management as well as more modular components, such as the summary bar or session info component.
* Service - Backend service with endpoints for:
  * Getting all sessions
  * Creating a session
  * Joining a existing session
  * Ending a session
  * Starting/ending a break
* 3rd Party Service - Using https://zenquotes.io/ to get inspirational quotes to display in notifications.
* DB/Login
  * Users have an email, password (hashed), and a list of sessions. Users are able to login/logout with their email and password.
  * Sessions have a list of users, a list of timestamps for when breaks started/ended (sessions always start with studying), and a flag for whether the session has ended.
* WebSocket - Information about starting/ending breaks or ending a session will be sent to all users in a session via WebSockets.


## Rhythum Design
![Rhythum Wireframe](rhythumWireframe.jpg)