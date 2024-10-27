# Spotify currently playing

This is a module that uses Spotify's web API to fetch and return the user's current playing song from their Spotify account.

- https://spotify-currently-playing-gilt.vercel.app/

## Features

- Fetches the user's current playing song using Spotify's web API.
- Provides a simple and easy-to-use interface to retrieve the data in a React app.
- Uses `fetch()` to make API requests and handles token refresh with a user's refresh token.

## Requirements

- You must have a Spotify account and a registered Spotify App.
- You must provide your Spotify client ID, client secret, and refresh token in your environment variables.
- Your app must be able to make requests to the Spotify Web API.

## Guide

### Step 1: Setting up your Spotify API

1. Go to Spotify for Developers — https://developer.spotify.com/
2. Login with your Spotify account then navigate to the dashboard. Click on ‘Create App’.
3. Add in the details for you app and click on save. Set the Website URL (Can be your website’s URL) and Redirect URI to ‘https://localhost:3000’
4. Now go to the settings page of the new app and make note of the Client Id and Client Secret.

### Step 2: Generating a Refresh Token

We need to generate a refresh token which will further be used to generate access tokens whenever someone visits the webpage.

1. Create the following link with your client id and refresh token
2. User scopes are used to restrict the access to information, only the information they choose to share will be shared. In order to use the currently playing endpoint we need to set the scope variable to user-read-currently-playing

```
https://accounts.spotify.com/en/authorize?client_id=<your_client_id>&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-currently-playing
```

3. Click on Authorize. Then you’ll will be redirected to the redirect URI. In the URL, make note of the value in the code attribute. We’ll be using that to generate a refresh token.

4. In order to generate a refresh token, we need a base64 encoded string containing the client ID and secret from earlier in the following format ‘clientid:clientsecret’. You can generate the string online here — https://www.base64encode.org/

5. Once you have the encoded string, run the following curl command. You can run it here — https://reqbin.com/curl

```
curl -H "Authorization: Basic <your base64 clientid:clientsecret>"
-d grant_type=authorization_code -d code=<your_code> -d redirect_uri=http%3A%2F%2Flocalhost:3000 https://accounts.spotify.com/api/token
```

You will get a JSON file as response with the refresh token. Note: There is no expiration for Refresh Tokens, it can be deleted only when you revoke access. Make note of the refresh token.

```
{
    "access_token": "BQD...woC",
    "token_type": "Bearer",
    "expires_in": 3600,
    "refresh_token": "AQD...w-e4",
    "scope": "user-read-currently-playing"
}
```
