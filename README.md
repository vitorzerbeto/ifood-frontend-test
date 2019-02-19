# Spotifood

An application for food and music lovers, so you can listen to the best playlists while enjoying the best of food

## Installing

To use the app, clone this in to your desktop and use ```yarn``` or ```npm``` to install the dependenses:

```
yarn i
```

## Refresh Token

The application uses the Spotify API to work. To perform the query, you need a token generated by Spotify, which has a life time of one hour.

To auto-generate the token, I built an application in NodeJS to accomplish this task for us.
It's called [Spotify Refresh Token](https://github.com/vitorzerbeto/spotify_refresh_token#usage). All information required to run the application is in the application repository

The only thing necessary is to leave the server running. After that, we are good to go.

## Start app

After install the dependenses and start the [Spotify Refresh Token](https://github.com/vitorzerbeto/spotify_refresh_token#usage) server, just run the commnad bellow to start the application:

```
yarn start
```

