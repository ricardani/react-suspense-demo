import { BURGERS, BURGERS_COMMENTS, BURGERS_DETAILS } from './data';

let fakeRequestTime = 1000;
let onProgress = () => true;
let shouldPauseNewRequests = false;
let notifiers = {};
let isPausedUrl = {};

export const setFakeRequestTime = val => {
    fakeRequestTime = val;
};

export const setProgressHandler = handler => {
    onProgress = handler;
};

export const setPauseNewRequests = value => {
    shouldPauseNewRequests = value;
};

export const setPaused = (url, isPaused) => {
    const wasPaused = isPausedUrl[url];
    isPausedUrl[url] = isPaused;
    if (isPaused !== wasPaused) {
        notifiers[url]();
    }
};

const makeFakeAPICall = (url, result) => {
    let i = 1;
    return new Promise(resolve => {
        isPausedUrl[url] = shouldPauseNewRequests;
        function notify() {
            if (!isPausedUrl[url]) {
                i++;
            }
            onProgress(url, i, isPausedUrl[url]);
            if (isPausedUrl[url]) {
                return;
            }
            if (i === 100) {
                resolve(result);
            } else {
                setTimeout(notify, fakeRequestTime / 100);
            }
        }
        notifiers[url] = notify;
        notify();
    });
};

export function slowImport(value, timeout) {
    return new Promise(resolve => {
        setTimeout(() => resolve(value), timeout || fakeRequestTime);
    });
}

export const fetchBurgerList = () => {
    return makeFakeAPICall('/api/burgers', BURGERS(fakeRequestTime))
};

export const fetchBurgerDetails = id => {
    return makeFakeAPICall(`/api/burger-details/${id}`, BURGERS_DETAILS(fakeRequestTime)[id])
};

export const fetchBurgerComments = id =>{
    return makeFakeAPICall(`/api/burger-comments/${id}`, BURGERS_COMMENTS()[id])
};
