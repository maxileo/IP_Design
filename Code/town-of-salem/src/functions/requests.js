// TODO: Fill in the base url, test the requests, think about error handling
/*
 Predefined request functions. None of the request functions catch any errors, so error handling has to be done when
 calling these functions. If the status code of the request's response is not within the range 200-299 all the
 functions will return an object with only the propriety errorStatus which will be equal to the response's status code
 If the status code is an expected one it's meaning will be documented, otherwise it can be considered an
 internal server error.
 errorStatus will be set to 401 for any request requiring authentication if the token is not valid.
 */

// Temporary for testing
const baseUrl = "http://localhost:3001"
//const baseUrl = "https:ip.tudorhutu.ro"

/*
 Description: Request used for registering a user.
 Parameters:
             username: user's password,
             password: user's password
 Return: If the registration succeeds the functions returns the token. If the username already exists it will return
 an object with errorStatus equal to 400.
 */
const registerRequest = async (username, password) => {
    const response = await fetch(`${baseUrl}/register`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({
            username: username, password: password
        })
    });

    if (response.ok) {
        const json = await response.json();
        return json;
    }

    return {errorStatus: response.status};
}

/*
 Description: Request for logging in.
 Parameters:
             username: user's password,
             password: user's password
 Return: If the login succeeds the functions returns the token. If the username or password are wrong it will return
 an object with errorStatus equal to 400.
 */
const loginRequest = async (username, password) => {
    const response = await fetch(`${baseUrl}/login`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({
            username: username, password: password
        })
    });

    if (response.ok) {
        const json = await response.json();
        return json;
    }

    return {errorStatus: response.status};
}

/*
 Description: Request to get the profile of the current user. Requires the current user to be logged in.
 Parameters:
             token: JWT token of the user. User will be identified based on this token
 Return: If the request succeeds it will return the username of the current user.
 */
const getOwnProfileRequest = async (token) => {
    const response = await fetch(`${baseUrl}/profile`, {
        method: "GET", headers: {
            "Content-Type": "application/json", "Authorization": token
        },
    });

    if (response.ok) {
        const json = await response.json();
        return json["username"];
    }

    return {errorStatus: response.status};
}

/*
 Description: Request to get the profile of another user. Requires the current user to be logged in.
 Parameters:
             userId: id of the user to be identified,
             token: JWT token of the user who is sending the request
 Return: If the request succeeds it will return the username of the user with specified user id.
 */
const getUserProfileRequest = async (userId, token) => {
    const response = await fetch(`${baseUrl}/profile?userId=${userId}`, {
        method: "GET", headers: {
            "Content-Type": "application/json", "Authorization": token
        },
    });

    if (response.ok) {
        const json = await response.json();
        return json["username"];
    }

    return {errorStatus: response.status};
}

/*
 Description: Request to send a message in chat. Requires the current user to be logged in.
 Parameters:
             lobbyId: lobby of the user's current game
             message: the message which will be sent
             token: JWT token of the user. User will be identified based on this token
 Return: True if the message has been sent.
 */
const sendMessageRequest = async (lobbyId, message, token) => {
    const response = await fetch(`${baseUrl}/lobbies/${lobbyId}/messages`, {
        method: "POST", headers: {
            "Content-Type": "application/json", "Authorization": token
        }, body: JSON.stringify({
            content: message
        })
    });

    if (response.ok) {
        return true;
    }

    return {errorStatus: response.status};
}

/*
 Description: Request to messages written in chat since a specified time. Requires the current user to be logged in
 Parameters:
             lobbyId: lobby of the user's current game
             lastRequestTime: time since which all messages will be retrieved
             token: JWT token of the user. User will be identified based on this token
 Return: String of messages available to user.
 */
const getChatRequest = async (lobbyId, lastRequestTime, token) => {
    const response = await fetch(`${baseUrl}/lobbies/${lobbyId}/messages?from=${lastRequestTime}`, {
        method: "GET", headers: {
            "Content-Type": "application/json", "Authorization": token
        },
    });

    if (response.ok) {
        let json = await response.json();

        return json["messages"];
    }

    return {errorStatus: response.status};
}

/*
 Description: Request to get the will of the current user. Requires the current user to be logged in
 Parameters:
             lobbyId: lobby of the user's current game
             token: JWT token of the user. User will be identified based on this token
 Return: The will of the current user in a string format.
 */
const getOwnWillRequest = async (lobbyId, token) => {
    const response = await fetch(`${baseUrl}/lobbies/${lobbyId}/will`, {
        method: "GET", headers: {
            "Content-Type": "application/json", "Authorization": token
        },
    });

    if (response.ok) {
        const json = await response.json();
        return json["content"];
    }

    return {errorStatus: response.status};
}

/*
 Description: Request to get the will of another user. Requires the current user to be logged in
 Parameters:
            lobbyId: lobby of the user's current game
            userId: id of user whose will will be retrieved
            token: JWT token of the user who is making the request
 Return: The will content as a string.
 */
const getUserWillRequest = async (lobbyId, userId, token) => {
    const response = await fetch(`${baseUrl}/lobbies/${lobbyId}/will?userId=${userId}`, {
        method: "GET", headers: {
            "Content-Type": "application/json", "Authorization": token
        },
    });

    if (response.ok) {
        const json = await response.json();
        return json["content"];
    }

    return {errorStatus: response.status};
}

/*
 Description: Request to update the current users will. Requires the current user to be logged in
 Parameters:
             lobbyId: lobby of the user's current game
             time: the time at which the will was updated
             will: contents of the will
             token: JWT token of the user who is making the request
 Return: Content of the will which was updated ???
 // idk why this is returns content it should probably return just a 200 and error: false
 */
const updateWillRequest = async (lobbyId, time, will, token) => {
    const response = await fetch(`${baseUrl}/lobbies/${lobbyId}/will`, {
        method: "PUT", headers: {
            "Content-Type": "application/json", "Authorization": token
        }, body: JSON.stringify({
            time: time, content: will
        })
    });

    if (response.ok) {
        const json = await response.json();
        return json["content"];
    }

    return {errorStatus: response.status};
}

module.exports = {
    registerRequest, loginRequest, getOwnProfileRequest, getUserProfileRequest, sendMessageRequest, getChatRequest,
    getOwnWillRequest, getUserWillRequest, updateWillRequest
}