let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000'
        break;
    case 'ms-my-bookopedia-app.herokuapp.com':
        APIURL = 'https://ms-my-bookopedia-app.herokuapp.com'
}

export default APIURL;