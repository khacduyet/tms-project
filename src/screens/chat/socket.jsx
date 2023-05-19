import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://103.130.212.45:4000"; //process.env.NODE_ENV === 'production' ? undefined : 'http://103.130.212.45:4000';

export const socket = io(URL);
