import {
  useGetAddressSuggestionsQuery,
  useLazyGetPlaceDetailsQuery,
} from "@/store/api/user/Google";
import Serch from "@assets/icons/serch-icon.svg";
import Colors from "@src/constants/Colors";
import { renderToastError } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchType } from "./type";

const AddressSearch = ({
  setAddress,
  setCity,
  setLat,
  setLng,
  setState,
  setZip,
  onpress,
  value,
  latValue,
  longValue,
}: SearchType) => {
  const [currentValue, setCurrentValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
 useEffect(() => {
    if (value) {
      setCurrentValue(value.toString());
    }

    if (latValue && longValue) {
      const latitude = Number(latValue);
      const longitude = Number(longValue);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0005,
          longitudeDelta: 0.0005,
        };

       
      }
    }
  }, [value, latValue, longValue]);
  
  const [getPlaceDetails] = useLazyGetPlaceDetailsQuery();

  // Fetch address suggestions
  const { data: googleData, isFetching } = useGetAddressSuggestionsQuery(
    { input: currentValue },
    { skip: currentValue.length < 3 }
  );

  const handleSelectSuggestion = async (address: string, placeId: string) => {
    setCurrentValue(address);
    setShowSuggestions(false);
    setAddress(address);

    try {
      const result = await getPlaceDetails({ placeId }).unwrap();
      const components = result?.result?.address_components || [];

      const findComponent = (type: string) =>
        components.find((c: any) => c.types.includes(type));

      const cityName =
        findComponent("locality")?.long_name ||
        findComponent("administrative_area_level_2")?.long_name ||
        "";
      const stateCode =
        findComponent("administrative_area_level_1")?.short_name || "";
      const zipCode = findComponent("postal_code")?.long_name || "";
      const latitude = result?.result?.geometry?.location?.lat ?? 51.5074;
      const longitude = result?.result?.geometry?.location?.lng ?? -0.1278;

      setLat(latitude);
      setLng(longitude);
      setCity(cityName);
      setState(stateCode);
      setZip(zipCode);
    } catch (err: any) {
      renderToastError(err?.message || "Failed to fetch place details");
    }
  };

  return (
    <View style={{ width: "100%", position: "relative" }}>
      {/* Input field */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          value={currentValue}
          onChangeText={(val) => {
            setCurrentValue(val);
            setShowSuggestions(true);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 1000)}
          placeholder="Please enter Address, City or Zip code....."
          placeholderTextColor={Colors.light.textGray}
          style={styles.input}
        />

        <TouchableOpacity style={styles.searchButton} onPress={onpress}>
          <Serch />
        </TouchableOpacity>
      </View>

      {/* Suggestions dropdown */}
      {showSuggestions && isFocused && (
        <View style={styles.suggestionsWrapper}>
          {isFetching && (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator size="small" color={Colors.light.DarkGreen} />
              <Text style={{ marginTop: vs(5),fontFamily: "PopinRegula", }}>Loading...</Text>
            </View>
          )}

          <FlatList
            data={googleData?.predictions || []}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item, index) => index.toString()}
            nestedScrollEnabled
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  handleSelectSuggestion(item.description, item.place_id)
                }
                style={styles.suggestionItem}
              >
                <Text>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default AddressSearch;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: Colors.light.textGray,
    borderRadius: ms(8),
    borderColor: Colors.light.textGray,
    paddingHorizontal: hs(12),
    borderWidth: ms(1),
    height: vs(45),
    fontFamily: "PopinRegula",
  },
  searchButton: {
    backgroundColor: Colors.light.red,
    paddingHorizontal: hs(15),
    paddingVertical: vs(10),
    borderRadius: ms(5),
    marginLeft: hs(8),
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionsWrapper: {
    position: "absolute",
    top: Platform.OS === "ios" ? vs(55) : vs(50),
    width: "100%",
    backgroundColor: "white",
    borderRadius: ms(12),
    maxHeight: vs(150),
    elevation: 5,
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingWrapper: {
    padding: vs(10),
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionItem: {
    padding: vs(10),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.light.lightGray,
  },
});
