import Comment from "@assets/icons/Comment.svg";
import Like from "@assets/icons/Like.svg";
import Share from "@assets/icons/share.svg";
import ThreeDots from "@assets/icons/threedots.svg";
import image from "@assets/test/test.jpeg";
import { LegendList } from '@legendapp/list';
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from '@utils/design/design';
import { formatPrice } from "@utils/PriceFormater";
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CircleImage from '../CircleImage/CircleImage';
import CommentInput from '../CommentInput';
import LableImage from '../LabelImage/LableImage';
import { postDataType } from './type';

const index = ({ data, isfetching }: postDataType) => {
    const insets = useSafeAreaInsets();
    const [expanded, setExpanded] = useState(false);
    const renderItem = ({ item }) => {

        return (
            <View className="bg-white" style={styles.card}>
                <View className="flex-row items-center justify-between">
                    <View className="flex-row">
                        <CircleImage source={image} Size={40} />
                        <View style={styles.uperSection}>
                            <View className="flex-row">
                                <Text style={styles.name}>{item.name}</Text>
                                {item.connection_type && (
                                    <Text style={{fontFamily: "PopinRegula",}}> ({item.connection_type})</Text>
                                )}

                            </View>
                            <Text style={{fontFamily: "PopinRegula",}}>{item.post_created_date || item.created_date}</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <ThreeDots />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.description}>
                        {expanded
                            ? item.description
                            : item.description?.slice(0, 70) + (item.description?.length > 70 ? "...." : " ")}
                        {item.description?.length > 70 && (
                            <Text
                                style={styles.moreText}
                                onPress={() => setExpanded(!expanded)}
                            >
                                {expanded ? " Show Less" : " Read More"}
                            </Text>
                        )}
                    </Text>

                    <LableImage price={formatPrice(item.price)} title={item.title} source={image} />
                    <View
                        className="flex-row justify-between"
                        style={{ marginTop: vs(20), marginBottom: vs(10) }}
                    >
                        <View className="flex-row">
                            <View className="flex-row items-center ">
                                <TouchableOpacity>
                                    <Like />
                                </TouchableOpacity>
                                <Text
                                    style={{ color: Colors.light.DarkGreen, paddingLeft: hs(2),fontFamily: "PopinRegula", }}
                                >
                                    {item.likes}
                                </Text>
                            </View>
                            <View
                                className="flex-row items-center"
                                style={{ paddingLeft: hs(10) }}
                            >
                                <TouchableOpacity>
                                    <Comment />
                                </TouchableOpacity>
                                <Text
                                    style={{ color: Colors.light.DarkGreen, paddingLeft: hs(2),fontFamily: "PopinRegula", }}
                                >
                                    16
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Share />
                        </TouchableOpacity>
                    </View>
                    <View></View>
                    <CommentInput />
                </View>
            </View>
        )


    };
    return (

        <View style={{ paddingBottom: insets.bottom }}>
        {!isfetching ? (
  <LegendList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.id.toString()}
    estimatedItemSize={200}
  />
) : (
  <Text style={{ textAlign: "center", marginTop: 20 ,fontFamily: "PopinRegula",}}>Loading...</Text>
)}

                </View>
    );
}

export default index

const styles = StyleSheet.create({
    card: {
        marginHorizontal: hs(10),
        marginVertical: vs(10),
        paddingHorizontal: hs(15),
        paddingVertical: vs(15),
        borderRadius: ms(20),
    },
    name: {
        fontWeight: "bold",
        fontFamily: "PopinRegula",
    },
    uperSection: {
        marginLeft: hs(10),
    },
    description: {
        marginVertical: vs(10),
        fontFamily: "PopinRegula",
    },
    moreText: {
        color: Colors.light.DarkGreen,
        fontWeight: '600',fontFamily: "PopinRegula",
    }
})