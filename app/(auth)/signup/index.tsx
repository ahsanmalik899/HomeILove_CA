/* eslint-disable global-require */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'; // Correct import for useState from 'react'
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Assuming the logo is a local asset (replace with your logo path)
import logo from '../../../assets/Splashimg/logo1.png'; // Adjust the path to your logo file
import backgroundImage from '../../../assets/signupbg/bg.png';

const { height, width } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Horizontally scale the font size
const hs = (size: number) => (width / guidelineBaseWidth) * size;
// Vertically scale the font size
const vs = (size: number) => (height / guidelineBaseHeight) * size;
// Moderately scale the font size
const ms = (size: number, factor: number = 0.5) =>
  size + (hs(size) - size) * factor;

export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password
  const [selectedBusinessType, setSelectedBusinessType] = useState(
    'Select Business Type',
  ); // State for selected business type
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [imageUri, setImageUri] = useState(''); // State to store uploaded image URI

  // Form state
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Error states
  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [businessTypeError, setBusinessTypeError] = useState('');
  const [uploadLogoError, setUploadLogoError] = useState('');

  // Updated business types array based on the image
  const businessTypes = [
    'Select Business Type',
    'Business',
    'Private buyer or Seller',
  ]; // Updated to match the image

  // Validation functions
  const validateName = (value: string) => {
    if (!value.trim()) return 'Name is required';
    if (value.trim().length < 2) return 'Name must be at least 2 characters';
    return '';
  };

  const validateMobile = (value: string) => {
    if (!value.trim()) return 'Mobile is required';
    if (!/^\+?[\d\s-]{10,}$/.test(value)) return 'Invalid mobile number';
    return '';
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value.trim()) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const validateConfirmPassword = (value: string) => {
    if (!value.trim()) return 'Confirm Password is required';
    if (value !== password) return 'Passwords must match';
    return '';
  };

  const validateBusinessType = (value: string) => {
    if (!value || value === 'Select Business Type')
      return 'Please select a valid business type';
    return '';
  };

  const validateUploadLogo = (value: string) => {
    if (!value.trim()) return 'Please upload a logo';
    return '';
  };

  // Handle input changes with validation
  const handleNameChange = (text: string) => {
    setName(text);
    setNameError(validateName(text));
  };

  const handleMobileChange = (text: string) => {
    setMobile(text);
    setMobileError(validateMobile(text));
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(validateEmail(text));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(validatePassword(text));
    setConfirmPasswordError(validateConfirmPassword(confirmPassword)); // Re-validate confirm password
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError(validateConfirmPassword(text));
  };

  const handleImagePick = () => {
    pickImage();
    setImageUri('dummy-image-uri'); // Placeholder for testing
    setUploadLogoError(validateUploadLogo('dummy-image-uri'));
  };

  // Dummy function to handle image selection
  const pickImage = () => {
    Alert.alert(
      'Image Selection',
      'Image picking functionality is not implemented yet. Please use a library like expo-image-picker or react-native-image-picker.',
    );
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      !nameError &&
      !mobileError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      !businessTypeError &&
      !uploadLogoError
    );
  };

  // Handle form submission
  const handleSubmit = () => {
    setNameError(validateName(name));
    setMobileError(validateMobile(mobile));
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));
    setConfirmPasswordError(validateConfirmPassword(confirmPassword));
    setBusinessTypeError(validateBusinessType(selectedBusinessType));
    setUploadLogoError(validateUploadLogo(imageUri));

    if (isFormValid()) {
      Alert.alert('Success', 'Form submitted successfully!');
    } else {
      Alert.alert('Error', 'Please fix the errors in the form.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image source={backgroundImage} style={styles.backgroundImage} />

      {/* Top section with logo */}
      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logoImage} resizeMode="contain" />
        </View>
      </View>

      {/* Bottom section with form */}
      <ScrollView
        style={styles.bottomSection}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account.</Text>
          <Text style={styles.subtitle}>
            Join HomeLove to discover homes & trusted services tailored for you.
          </Text>

          <Text style={styles.label}>Fill in the Details</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={handleNameChange}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Mobile"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={handleMobileChange}
          />
          {mobileError ? (
            <Text style={styles.errorText}>{mobileError}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={handleEmailChange}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.innerInput}
              placeholder="Enter Password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={handlePasswordChange}
            />
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.innerInput}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
            />
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.dropdownContainer}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={[
                styles.dropdownText,
                selectedBusinessType === 'Select Business Type' &&
                  styles.placeholderText,
              ]}
            >
              {selectedBusinessType}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#999" />
          </TouchableOpacity>
          {businessTypeError ? (
            <Text style={styles.errorText}>{businessTypeError}</Text>
          ) : null}

          <View style={styles.uploadContainer}>
            <TextInput
              style={[styles.input, styles.uploadInput]}
              placeholder="Upload logo (image)"
              placeholderTextColor="#999"
              editable={false}
              value={imageUri}
            />
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleImagePick}
            >
              <Image
                source={require('../../../assets/signinicon/solar.png')}
                style={styles.uploadIcon}
              />
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
          {uploadLogoError ? (
            <Text style={styles.errorText}>{uploadLogoError}</Text>
          ) : null}

          <View style={styles.loginTextContainer}>
            <Text style={styles.loginTextBlack}>Already have an account? </Text>
            <Text style={styles.loginTextGreen}>Login</Text>
          </View>

          <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal for business type selection */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Business Type</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            {businessTypes.slice(1).map(type => (
              <TouchableOpacity
                key={type}
                style={styles.modalItem}
                onPress={() => {
                  setSelectedBusinessType(type);
                  setBusinessTypeError(validateBusinessType(type));
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalItemText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90A4', // Teal background color matching the image
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '0%',
    opacity: 0.8, // Adjust opacity to make form readable over image
  },
  topSection: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: vs(50),
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: hs(120),
    height: vs(60),
    tintColor: '#fff',
  },
  bottomSection: {
    flex: 0.75,
    backgroundColor: '#E8F4F8', // Light blue background
    borderTopLeftRadius: ms(30),
    borderTopRightRadius: ms(30),
    paddingTop: vs(20),
  },
  formContainer: {
    paddingHorizontal: hs(25),
    paddingBottom: vs(40),
  },
  title: {
    fontSize: ms(28),
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: vs(8),
  },
  subtitle: {
    fontSize: ms(14),
    color: '#666',
    marginBottom: vs(25),
    lineHeight: ms(20),
  },
  label: {
    fontSize: ms(14),
    color: '#333',
    marginBottom: vs(15),
    fontWeight: '500',
  },
  input: {
    height: vs(48),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: ms(8),
    marginBottom: vs(15),
    paddingHorizontal: hs(15),
    backgroundColor: '#FFFFFF',
    fontSize: ms(14),
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: ms(8),
    marginBottom: vs(15),
    backgroundColor: '#FFFFFF',
    height: vs(48),
  },
  innerInput: {
    flex: 1,
    paddingHorizontal: hs(15),
    fontSize: ms(14),
    color: '#333',
  },
  iconButton: {
    paddingHorizontal: hs(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: vs(48),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: ms(8),
    paddingHorizontal: hs(15),
    backgroundColor: '#FFFFFF',
    marginBottom: vs(15),
  },
  dropdownText: {
    fontSize: ms(14),
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  uploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vs(15),
  },
  uploadInput: {
    flex: 1,
    marginRight: hs(10),
    marginBottom: 0,
  },
  uploadButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: vs(12),
    paddingHorizontal: hs(15),
    borderRadius: ms(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: hs(80),
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: ms(12),
    fontWeight: '600',
    marginLeft: hs(5),
  },
  uploadIcon: {
    width: hs(20),
    height: vs(20),
    tintColor: '#FFFFFF', // Matches the upload button text color
  },
  loginTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: vs(25),
    marginTop: vs(10),
  },
  loginTextBlack: {
    fontSize: ms(14),
    color: '#666',
  },
  loginTextGreen: {
    fontSize: ms(14),
    color: '#4A90A4',
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: vs(15),
    borderRadius: ms(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: ms(16),
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: ms(20),
    borderTopRightRadius: ms(20),
    paddingBottom: vs(40),
    maxHeight: height * 0.6,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hs(20),
    paddingVertical: vs(15),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: ms(18),
    fontWeight: '600',
    color: '#333',
  },
  modalItem: {
    paddingVertical: vs(15),
    paddingHorizontal: hs(20),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalItemText: {
    fontSize: ms(16),
    color: '#333',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: ms(12),
    marginBottom: vs(10),
    marginTop: vs(-10),
  },
});
