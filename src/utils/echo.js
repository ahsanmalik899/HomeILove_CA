import Echo from "laravel-echo";
import Pusher from "pusher-js";

global.Pusher=Pusher;

export const echo=new Echo({

broadcaster:'pusher',

key:'my_live_key',
 cluster: "mt1",   
wsHost:'homeilove.us',

wsPort:6001,

forceTLS:false,

disableStats:true,
 enabledTransports: ["ws", "wss"],
});