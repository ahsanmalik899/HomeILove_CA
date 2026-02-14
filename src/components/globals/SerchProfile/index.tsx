
import { useGetProfileNamesQuery } from "@/store/api/user/MainApi";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  title?: string;
  value: string;
  onSelect: (item: { id: number; business_name: string }) => void;
  required?: boolean;
  errorText?: string;
  touched?: boolean;
  errors?: boolean;
  type:string;
}

export const SearchProfile = ({
  title,
  value,
  onSelect,
  required,
  touched,
  errors,
  errorText,
  type,
}: Props) => {
  const [search, setSearch] = useState(value || "");
  const [focused, setFocused] = useState(false);

  const { data, isFetching } = useGetProfileNamesQuery({type});

  const filteredData = data?.data?.filter((item: any) =>
    item.business_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <KeyboardAvoidingView>
    <View style={{ marginTop: vs(10) }}>
      {title && (
        <View style={{ flexDirection: "row", marginBottom: vs(10) }}>
          <Text style={styles.title}>{title}</Text>
          {required && <Text style={{ color: Colors.light.red }}> *</Text>}
        </View>
      )}

      <TextInput
        value={search}
        onChangeText={(val) => setSearch(val)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 900)}
        placeholder="Search by developer name"
        placeholderTextColor={Colors.light.DarkGreen}
        style={styles.input}
      />

      {focused && (
        <View style={styles.dropdown}>
          {isFetching && (
            <View style={styles.loader}>
              <ActivityIndicator size="small" />
              <Text>Loading...</Text>
            </View>
          )}

          <FlatList
            keyboardShouldPersistTaps="handled"
            data={filteredData}
            scrollEnabled
            nestedScrollEnabled={true}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSearch(item.business_name);
                  onSelect?.(item);
                  setFocused(false);
                  router.navigate({pathname:"/ProfileSigleView",
                    params:{type,id:item.id}
                  })
                }}
                style={styles.item}
              >
                <Text>{item.business_name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {touched && errors && (
        <Text style={{ color: Colors.light.red, marginTop: vs(5) }}>
          {errorText}
        </Text>
      )}
    </View>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: ms(14),
    fontWeight: "600",
  },
  input: {
    color: Colors.light.DarkGreen,
    backgroundColor: Colors.light.LightGreen,
    borderRadius: ms(18),
    paddingHorizontal: hs(12),
    height: vs(45),
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: ms(12),
    marginTop: vs(5),
    maxHeight: vs(200),
    elevation: 5,
  },
  item: {
    padding: vs(10),
    borderBottomWidth: 0.5,
    borderColor: Colors.light.lightGray,
  },
  loader: {
    padding: vs(10),
    alignItems: "center",
  },
});
