const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const errorContainer = document.getElementById('errMsg')
const usernameInput = document.getElementById('username')
const date = new Date()

// A simple async POST request function
const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET'
    })
    return response.json()
}

// A simple async POST request function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

// Login user to access chat room.
const login = async () => {
    /***********************************
     *         YOUR CODE HERE          *
     ***********************************/
    let username = usernameInput.value;

    let dateNow = new Date()
    const hours = dateNow.getHours().toString().padStart(2, '0')
    const mins = dateNow.getMinutes().toString().padStart(2, '0')
    const time = `${hours}:${mins}`

    //alert(`The user name is ${username} and the time is ${time}`);

    const data = await postData('/login', {
        username
    })

    if (data.error) {
        errorContainer.innerHTML = data.error
        return
    }

    socket.emit('newUser', username, time)
    window.location = '/chat'
}