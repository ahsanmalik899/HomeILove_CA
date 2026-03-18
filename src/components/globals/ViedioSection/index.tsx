import { vs } from "@utils/design/design";
import { Text, View } from "react-native";
import WebView from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";

const VideoSection = ({ url }: { url?: string | null }) => {
  if (!url) {
    return <Text style={{fontFamily: "PopinRegula",}}>No video available</Text>; // fallback for undefined/null
  }

  const ytRegex =
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/;
  const dmRegex = /(?:dailymotion\.com\/video|dai\.ly)\/([a-zA-Z0-9]+)/;
  const vmRegex = /vimeo\.com\/(\d+)/;

  const ytMatch = url.match(ytRegex);
  const dmMatch = url.match(dmRegex);
  const vmMatch = url.match(vmRegex);

  if (ytMatch) {
    return (
      <View style={{ width: "100%" }}>
        <YoutubePlayer
          height={210}
          width={"100%"}
          play={false}
          videoId={ytMatch[1]}
        />
      </View>
    );
  }

  if (dmMatch) {
    return (
      <WebView
        style={{ width: "100%", height: vs(300) }}
        source={{ uri: `https://www.dailymotion.com/embed/video/${dmMatch[1]}` }}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={true}
        startInLoadingState
      />
    );
  }

  if (vmMatch) {
    return (
      <WebView
        style={{ width: "100%", height: vs(300) }}
        source={{ uri: `https://player.vimeo.com/video/${vmMatch[1]}` }}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={true}
        startInLoadingState
      />
    );
  }

  return <Text style={{fontFamily: "PopinRegula",}}>Unsupported video URL</Text>;
};

export default VideoSection;
