## Codenames

The goal of the project is to create a web application that allows users to independently connect remotely through their browsers or mobile devices. 

For this, the multiplayer game CodeNames was implemented, where players via socket.io connect to the server over the network. After registering, the player can either create a new room and start the game, or connect to an existing room. The detailed process of the game will be described in Module 2. You can find out more about the game rules from this link.

The application interface is interactive and easy to navigate
On the start page, the player can join an existing room or create a new one. By scrolling down you can see the description of the game and information about the developers of the application. If the user already has a profile, then he can log in or go through registration. 

In the profile page user can access the account, history and scoreboard tabs. through the account tab, the user can view the account details and reset password. in the history tab, the user can view the win-lose ratio and right-wrong ratio by spymaster or operative. in the scorebar tab, user can view first three top players and the score points of global players

## Launch

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
