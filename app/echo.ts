import Echo from "laravel-echo";
import Pusher from "pusher-js/react-native";

(global as any).Pusher = Pusher;

let echo: any;

try {

    echo = new Echo({
        broadcaster: "pusher",
        key: "come.homeilove.us",
        wsHost: "homeilove.us",
        wsPort: 8080,
        forceTLS: false,
        disableStats: true,
        enabledTransports: ["ws"],
    });

    console.log("Echo initialized");

} catch (error) {

    console.log("Echo error:", error);

}

export default echo;