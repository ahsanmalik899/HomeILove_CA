import {
  useGetAddressSuggestionsQuery,
  useLazyGetPlaceDetailsQuery,
} from "@/store/api/user/Google";
import Colors from "@src/constants/Colors";
import { renderToastError } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AddressInputProps } from "./type";

export const AdressInput = ({
  title,
  zip,
  city,
  value,
  onSelect,
  touched,
  errors,
  errorText,
  required,
  additonalText,
  multipleFields,
  state,
  lat,
  long,
  setValue = () => {},
  name = "name",
}: AddressInputProps) => {
  const [currentValue, setCurrentValue] = useState<string>(
    value?.toString() || ""
  );
  const [isFocused, setIsFocused] = useState(false);

  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const [getPlaceDetails, { isFetching: isDetailsLoading }] =
    useLazyGetPlaceDetailsQuery();
  const { data: googleData, isFetching } = useGetAddressSuggestionsQuery(
    { input: currentValue },
    { skip: currentValue.length < 3 }
  );

  const handleSelectSuggestion = async (address: string, id: string) => {
    setCurrentValue(address);
    onSelect?.(address);
    setValue(name, address);
    setShowSuggestions(false);

    try {
      const result = await getPlaceDetails({ placeId: id }).unwrap();

      const components = result?.result?.address_components || [];

      const findComponent = (type: string) =>
        components.find((c: any) => c.types.includes(type));

      const cety =
        findComponent("locality")?.long_name ||
        findComponent("administrative_area_level_2")?.long_name ||
        "";

      const stateCode =
        findComponent("administrative_area_level_1")?.short_name || "";

      const zipCode = findComponent("postal_code")?.long_name || "";

      const country = findComponent("country")?.long_name || "";

      const latitude = result?.result?.geometry?.location?.lat ?? null;

      const longitude = result?.result?.geometry?.location?.lng ?? null;

      setValue(city, cety);
      setValue(state, stateCode);
      setValue(zip, zipCode);
      setValue(lat, latitude);
      setValue(long, longitude);
    } catch (err: any) {
      renderToastError(err?.message || "Failed to fetch place details");
    }
  };

  return (
    <View style={{ marginTop: vs(10) }}>
      {title && (
        <View style={{ flexDirection: "row", marginBottom: vs(10) }}>
          <Text style={styles.title}>{title}</Text>
          {required && <Text style={{ color: Colors.light.red }}> *</Text>}
          {additonalText && (
            <Text style={{ paddingLeft: hs(5) }}>{`(${additonalText})`}</Text>
          )}
        </View>
      )}

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          value={currentValue}
          onChangeText={(val) => {
            setCurrentValue(val);
            setValue(name, "");
            setShowSuggestions(true);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 1000)}
          placeholder="Enter address..."
          style={{
            flex: 1,
            backgroundColor: Colors.light.LightGreen,
            borderRadius: ms(18),
            paddingHorizontal: hs(12),
            height: vs(45),
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: "white",
          borderRadius: ms(12),
          marginTop: vs(5),
          maxHeight: vs(150),
          elevation: 5,
        }}
      >
        {isFetching && (
          <View
            style={{
              padding: vs(10),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="small" color={Colors.light.DarkGreen} />
            <Text style={{ marginTop: vs(5) }}>Loading...</Text>
          </View>
        )}
        {showSuggestions && isFocused && (
          <View>
            <FlatList
              data={googleData?.predictions}
              keyboardShouldPersistTaps="handled"
              removeClippedSubviews={false}
              nestedScrollEnabled
              scrollEnabled
              showsVerticalScrollIndicator={true}
              initialNumToRender={10}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    handleSelectSuggestion(item.description, item.place_id)
                  }
                  style={{
                    padding: vs(10),
                    borderBottomWidth: 0.5,
                    borderColor: Colors.light.lightGray,
                    maxHeight: vs(400),
                  }}
                >
                  <Text>{item.description}</Text>
                </TouchableOpacity>
              )}
            />
            {!googleData?.predictions.length && (
              <View
                style={{
                  padding: vs(10),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: Colors.light.DarkGreen }}>
                  No addresses found
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      {touched && errors && (
        <Text style={{ color: Colors.light.red, marginTop: vs(5) }}>
          {errorText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: ms(14), fontWeight: "600", zIndex: 0 },
});
