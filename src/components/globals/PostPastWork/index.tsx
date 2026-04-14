import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";

import { userdata } from "@/store/slices/selector/user";
import Profilelogo from "@assets/CreateProfile/uploadprofilewithcircle.svg";
import { Ionicons } from "@expo/vector-icons";
import LargeButton from "@src/components/globals/LaregeButton";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, vs } from "@utils/design/design";
import { Formik } from "formik";
import * as Yup from "yup";
import { AdressInput } from "../AddressInput";
import { FormikInput } from "../FormictInput";
import { FormikDropdown } from "../FormikDropdown/indes";
import Loading from "../Loading";
import UploadPic from "../UploadPic";
import { PastWorkModalProps } from "./type";

const PastWorkSchema = Yup.object().shape({
  property_type: Yup.string().required("Required"),

  property_sub_type: Yup.string().required("Required"),

  beds: Yup.string().required("Required"),

  address: Yup.string().required("Required"),

  city: Yup.string().required("Required"),

  state: Yup.string().required("Required"),

  zip: Yup.string().nullable(),

  deal_features: Yup.string().required("Required"),

  job_description: Yup.string().required("Required"),

  work_section: Yup.string().required("Required"),
});

const PastWorkModal = ({
  visible,
  closeModal,
  editData,
  savePastWork,
  type,
  isLoading,
  refetch,

}: PastWorkModalProps) => {
  const user = useAppSelector(userdata);
  const initialValues = {
    property_type: editData?.property_type || "",

    property_sub_type: editData?.property_sub_type || "",

    beds: editData?.beds || "",

    address: editData?.address || "",

    city: editData?.city || "",

    state: editData?.state || "",

    zip: editData?.zip || "",

    lat: editData?.lat || "",

    lng: editData?.lng || "",

    deal_features: editData?.deal_features || "",

    job_description: editData?.job_description || "",

    work_section: editData?.work_section || type || "",

    work_images:editData?.images|| [],
    user_id: user.id,
    user_past_work_id: editData?.user_past_work_id || "",
  };

  return (
    <Modal visible={visible} animationType="slide">
     
      <View style={styles.container}>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingVertical:vs(10)}}>
          <Text style={styles.title}>
          {editData ? "Edit Past Work" : "Add Past Work"}
        </Text>
        <Ionicons name="close-circle" size={30} color="black" style={{}} onPress={closeModal} />
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={PastWorkSchema}
          enableReinitialize
          onSubmit={async (values) => {
            try {
              const formData = new FormData();

              Object.keys(values).forEach((key) => {
                if (
                  key !== "work_images" &&
                  values[key] !== undefined &&
                  values[key] !== null
                ) {
                  formData.append(key, String(values[key]));
                }
              });

              if (editData?.user_past_work_id) {
                formData.append(
                  "user_past_work_id",
                  String(editData.user_past_work_id)
                );
              }

              if (
                Array.isArray(values.work_images) &&
                values.work_images.length > 0
              ) {
                values.work_images.forEach((img, index) => {
                  if (img?.uri) {
                    formData.append(`work_images[]`, {
                      uri: img.uri,
                      name: img.name || `work_${index}.jpg`,
                      type: img.type || "image/jpeg",
                    });
                  }
                });
              } else {
                formData.append("work_images", JSON.stringify([]));
              }

              for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
              }

              await savePastWork(formData);
              
                refetch()
              closeModal();
            } catch (error) {
              console.log("Error:", error);
            }
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            handleBlur,
            setFieldValue,
            errors,
            touched,
          }) => (
            <ScrollView>
              <FormikDropdown
                key={"propertytype"}
                onSelect={(value) => {
                  setFieldValue("property_type", value);
                  setFieldValue("property_sub_type", "");
                }}
                options={["House", "Commercial", "Farms/Lands"]}
                title="Property Type "
                placeholder="Select"
                value={values.property_type}
                touched={!!touched}
                errors={!!errors}
                required
                errorText={errors.property_type}
              />

              <View className="flex-1 ">
                <FormikDropdown
                  title={"Sub-type"}
                  key={values.property_type}
                  setValue={setFieldValue}
                  touched={!!touched}
                  errors={!!errors}
                  errorText={errors.property_sub_type}
                  placeholder="Property sub type"
                  value={values.property_sub_type}
                  required
                  options={
                    values.property_type === "House"
                      ? [
                          "Detached house",
                          "Semi-detached house",
                          "Town house Condo",
                          "Bungalow Co-op",
                          "Flats/ Apartments Condop",
                          "Penthouse",
                          "Park homes",
                          "Others",
                        ]
                      : values.property_type === "Commercial"
                      ? [
                          "office",
                          "office workspace",
                          "Retail properties",
                          "Leisure / Hospitality",
                          "Others",
                        ]
                      : [
                          "Land",
                          "Commercial development",
                          "Industrial development",
                          "Residential development",
                          "Farms",
                        ]
                  }
                  name="property_sub_type"
                  onSelect={() => {}}
                />
              </View>

              <FormikDropdown
                onSelect={() => {}}
                options={[
                  "Studio",
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "10+",
                ]}
                title="Beds"
                name="beds"
                setValue={setFieldValue}
                placeholder="Beds"
                value={values.beds}
                touched={!!touched.beds}
                errors={!!errors.beds}
                required={false}
                errorText={errors.beds}
              />

              <AdressInput
                city={"city"}
                zip={"zip_code"}
                state={"state"}
                lat={"lat"}
                long={"lng"}
                withmap={false}
                latValue={Number(values.lat)}
                longValue={Number(values.lng)}
                name="address"
                setValue={setFieldValue}
                onSelect={() => {}}
                title="Property Location"
                placeholder="Enter complete address or street"
                value={values.address}
                touched={!!touched.address}
                errors={!!errors.address}
                required={false}
                errorText={errors.address}
              />

              <FormikInput
                title=""
                placeholder="e.g Garden, Parking, Pool etc"
                onChangeText={handleChange("deal_features")}
                onBlur={handleBlur("deal_features")}
                value={values.deal_features}
                touched={!!touched.deal_features}
                errors={!!errors.deal_features}
                required={false}
                mulipleFields
                name="deal_features"
                setValue={setFieldValue}
                errorText={errors.deal_features}
              />
              <FormikInput
                title="More Description"
                placeholder="Write here (Upto 5000 characters)"
                onChangeText={handleChange("job_description")}
                onBlur={handleBlur("job_description")}
                value={values.job_description}
                touched={!!touched.job_description}
                errors={!!errors.job_description}
                errorText={errors.job_description}
                multiline
                required={false}
              />
              <UploadPic
                key="propertyimg"
                Logo={Profilelogo}
                text1="Upload IMAGES"
                text2=""
                additionalText={`Upload upto 10 images.\n More images get more attractions`}
                value={values.work_images}
                limt={10}
                name="work_images"
                border
                setValue={setFieldValue}
              />
              
              
                <LargeButton
                  text="Submit"
                  handleSubmit={() => {
                    handleSubmit();
                    console.log(errors);
                  }}
                />
              
            </ScrollView>
          )}
        </Formik>
      </View>
      <Loading isLoading={isLoading} text="Loading..."/>
    </Modal>
  );
};

export default PastWorkModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: hs(15),
    paddingVertical: vs(15),
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  error: {
    color: "red",
    marginBottom: 10,
  },

  imageBtn: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },

  imageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },

  remove: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    width: 22,
    height: 22,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
