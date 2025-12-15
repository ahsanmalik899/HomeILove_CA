import { useGetAddressSuggestionsQuery } from "@/store/api/user/Google";
import Add from "@assets/CreateProfile/Vector.svg";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useEffect, useState } from "react";
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
  value,
  onSelect,
  touched,
  errors,
  errorText,
  required,
  additonalText,
  multipleFields,
  setValue = () => {},
  name = "name",
}: AddressInputProps) => {
  const [currentValue, setCurrentValue] = useState<string>(
    value?.toString() || ""
  );
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const { data: googleData, isFetching } = useGetAddressSuggestionsQuery(
    { input: currentValue },
    { skip: currentValue.length < 3 }
  );

  useEffect(() => {
    setShowSuggestions(currentValue.length > 2);
  }, [currentValue]);
  const handleSelectSuggestion = (address: string) => {
    setCurrentValue(address);
    onSelect?.(address);
    setValue(name,address);
    setShowSuggestions(false);
  };

  const handleAdd = () => {
    if (!currentValue) return;
    if (selectedData.includes(currentValue)) return;
    const updated = [...selectedData, currentValue];
    setSelectedData(updated);
    setValue(name, updated.join(","));
  };

  const handleRemove = (index: number) => {
    const updated = selectedData.filter((_, i) => i !== index);
    setSelectedData(updated);
    setValue(name, updated.join(","));
  };

  return (
    <View style={{ marginTop: vs(10), zIndex: 1000 }}>
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
          onChangeText={setCurrentValue}
          placeholder="Enter address..."
          style={{
            flex: 1,
            backgroundColor: Colors.light.LightGreen,
            borderRadius: ms(18),
            paddingHorizontal: hs(12),
            height: vs(45),
          }}
        />

        {multipleFields && (
          <TouchableOpacity
            style={{
              marginLeft: hs(8),
              backgroundColor: Colors.light.LightGreen,
              borderRadius: ms(8),
              paddingHorizontal: hs(12),
              height: vs(45),
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleAdd}
          >
            <Add />
          </TouchableOpacity>
        )}
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
        ) 
      } 
        {googleData?.predictions.length && showSuggestions && (
          <FlatList
            data={googleData.predictions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectSuggestion(item.description)}
                style={{
                  padding: vs(10),
                  borderBottomWidth: 0.5,
                  borderColor: Colors.light.lightGray,
                }}
              >
                <Text>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        ) }{!googleData?.predictions.length && showSuggestions && (
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

      {touched && errors && (
        <Text style={{ color: Colors.light.red, marginTop: vs(5) }}>
          {errorText}
        </Text>
      )}

  
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: ms(14), fontWeight: "600" },
});
