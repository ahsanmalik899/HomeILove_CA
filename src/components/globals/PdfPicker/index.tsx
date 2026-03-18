import Cross from "@assets/CreateProfile/cross.svg";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import * as DocumentPicker from "expo-document-picker";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

/* ================= TYPES ================= */
interface PdfPickerProps {
  text1?: string;
  text2?: string;
  text3?: string;
  additionalText?: string;
  Logo: React.FC<any>;
  setValue: (name: string, value: any) => void;
  name: string;
  border?: boolean;
  value: any;
  withCircule?: boolean;
  limt: number;
}

/* ================= HELPERS ================= */
const normalizePDFs = (val: any) => {
  if (!val) return [];

  const arr = Array.isArray(val) ? val : [val];

  return arr
    .map((item) => {
      // ✅ Existing PDF from backend (string)
      if (typeof item === "string") {
        return {
          uri: item, // keep the original URL or path
          name: item.split("/").pop(),
          type: "application/pdf",
          existing: true, // mark as existing
        };
      }

      // ✅ Picked PDF (local)
      if (typeof item === "object" && item.uri) {
        return { ...item, existing: false }; // new file
      }

      return null;
    })
    .filter(Boolean);
};

/* ================= COMPONENT ================= */
const PdfPicker = ({
  text1,
  text2,
  text3,
  additionalText,
  Logo,
  setValue,
  name,
  border,
  value,
  withCircule = false,
  limt,
}: PdfPickerProps) => {
  const pdfs = normalizePDFs(value);

  /* ================= PICK PDF ================= */
  const pickPDF = async () => {
    const remaining = limt - pdfs.length;

    if (remaining <= 0) {
      alert(`You can upload only ${limt} PDF${limt > 1 ? "s" : ""}`);
      return;
    }

    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      multiple: limt > 1,
    });

    if (result.canceled) return;

    const files = result.assets
      .slice(0, remaining)
      .map((asset) => ({
        uri: asset.uri,
        name: asset.name,
        type: "application/pdf",
        existing: false, // mark as new file
      }));

    setValue(name, [...pdfs, ...files]);
  };

  /* ================= REMOVE PDF ================= */
  const removePDF = (index: number) => {
    const updated = pdfs.filter((_, i) => i !== index);
    setValue(name, updated);
  };

  /* ================= UI ================= */
  return (
    <View style={{ marginBottom: vs(20) }}>
      {/* ---------- LABEL ---------- */}
      {text1 && (
        <View className="flex-row">
          <Text style={{ fontSize: ms(15), fontWeight: "600",fontFamily: "PopinRegula", }}>
            {text1}
            <Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}>{text2}</Text>
            {text3}
          </Text>
          {additionalText && <Text style={{fontFamily: "PopinRegula",}}>{` (${additionalText})`}</Text>}
        </View>
      )}

      {/* ---------- CONTAINER ---------- */}
      <View
        style={{
          marginTop: vs(10),
          backgroundColor: "white",
          borderWidth: border ? 0.5 : 0,
          borderColor: Colors.light.textGray,
          borderRadius: ms(10),
          paddingVertical: vs(10),
          alignItems: "center",
        }}
      >
        {/* ---------- PREVIEW ---------- */}
        {pdfs.length > 0 && (
          <View className="flex-row flex-wrap gap-2 justify-center">
            {pdfs.map((pdf, index) => (
              <View key={index} className="relative">
                <TouchableOpacity
                  onPress={() => removePDF(index)}
                  className="absolute right-1 top-1 z-10 bg-white"
                >
                  <Cross />
                </TouchableOpacity>

                <View style={styles.pdfCard}>
                  <Text numberOfLines={2} style={styles.pdfText}>
                    {pdf.name}
                  </Text>
                  {pdf.existing && (
                    <Text style={{ fontSize: ms(10), color: Colors.light.textGray,fontFamily: "PopinRegula", }}>
                      Existing
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ---------- ADD BUTTON ---------- */}
        {pdfs.length < limt && (
          <TouchableOpacity onPress={pickPDF}>
            <View
              style={[
                withCircule
                  ? {
                      borderWidth: 1,
                      paddingHorizontal: hs(50),
                      paddingVertical: vs(50),
                      borderRadius: ms(80),
                      borderColor: Colors.light.lightGray,
                    }
                  : { paddingVertical: vs(30) },
              ]}
            >
              <Logo />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PdfPicker;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  pdfCard: {
    width: hs(140),
    height: hs(90),
    borderRadius: hs(8),
    backgroundColor: Colors.light.lightGray,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: hs(8),
  },
  pdfText: {
    fontSize: ms(12),
    textAlign: "center",
    fontFamily: "PopinRegula",
  },
});
