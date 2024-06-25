import { reactive } from "vue";
import { io } from "socket.io-client";
import system_config from "@/system.config";

export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = system_config.baseUrl

export const socket = io(URL, {
    autoConnect: false
});

socket.on("connect", () => {
    console.log('socket connect');
    state.connected = true;
});

socket.on("disconnect", () => {
    console.log('socket disconnect');
    state.connected = false;
});
