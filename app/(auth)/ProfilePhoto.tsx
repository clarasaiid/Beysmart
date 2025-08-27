import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from "react";
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import { BASE_URL } from '../../constants/api';
import { AppButton } from '../../design-system/Buttons/Buttons';
import { colors } from '../../design-system/colors/colors';
import { BackArrow, ImageIcon, LockIcon, UserIcon } from '../../design-system/icons';
import { Padding } from '../../design-system/Layout/padding';
import { Spacing } from '../../design-system/Layout/spacing';
import { Typography } from '../../design-system/typography/typography';

const ProfilePhoto = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { email, phone_number } = useLocalSearchParams();

  const pickImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera roll permissions to select a photo.');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets[0]) {
        const selectedAsset = result.assets[0];
        
        // Validate file size (max 5MB)
        if (selectedAsset.fileSize && selectedAsset.fileSize > 5 * 1024 * 1024) {
          Alert.alert('File Too Large', 'Please select an image smaller than 5MB.');
          return;
        }
        
        setSelectedImage(selectedAsset.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handleProfilePhoto = async () => {
    if (!selectedImage) {
      Alert.alert('No Photo Selected', 'Please select a photo first.');
      return;
    }

    setIsUploading(true);
    try {
      // Create FormData for the image upload
      const formData = new FormData();
      
      // Get the file extension and determine MIME type
      const uriParts = selectedImage.split('.');
      const fileExtension = uriParts[uriParts.length - 1].toLowerCase();
      
      // Map common extensions to MIME types
      const mimeTypeMap: { [key: string]: string } = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
      };
      
      const mimeType = mimeTypeMap[fileExtension] || 'image/jpeg';
      
      // Append the image file
      formData.append('profile_picture', {
        uri: selectedImage,
        type: mimeType,
        name: `profile_picture.${fileExtension}`,
      } as any);
      
      // Append other user data
      formData.append('email', email as string);
      formData.append('phoneNumber', phone_number as string);

      // Make the API call
      const response = await axios.patch(`${BASE_URL}auth/update-profile-picture/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params:{
            email: email,
            phoneNumber: phone_number,
        }
      });

      console.log('Profile photo uploaded successfully:', response.data);
      
      // Navigate to the next screen (you can adjust this based on your flow)
      Alert.alert('Success', 'Profile photo uploaded successfully!', [
        {
          text: 'Continue',
          onPress: () => {
            // Navigate to home or next screen
            router.push('/(app)/home' as never);
          }
        }
      ]);
      
    } catch (error: any) {
      console.error('Profile photo upload failed:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to upload profile photo. Please try again.';
      Alert.alert('Upload Failed', errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Profile Photo',
      'Are you sure you want to skip adding a profile photo? You can add one later.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Skip',
          onPress: () => {
            // Navigate to home or next screen
            router.push('/(app)/home' as never);
          },
        },
      ]
    );
  };

  const isDisabled = !selectedImage || isUploading;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header (fixed) */}
      <View style={{ paddingTop: Spacing.md, ...Padding.screenHorizontal }}>
        {/* Back Button */}
        <TouchableOpacity
          style={{
            width: 48,
            height: 48,
            backgroundColor: colors.surface,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Spacing.lg,
          }}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push('/(auth)/Complete-Registeration' as never);
            }
          }}
        >
          <BackArrow width={24} height={24} color={colors.text} />
        </TouchableOpacity>

        {/* User Icon */}
        <View style={{ alignItems: 'center', marginBottom: Spacing.lg }}>
          <View
            style={{
              width: 96,
              height: 96,
              backgroundColor: colors.primary.base,
              borderRadius: 48,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.md,
            }}
          >
            <UserIcon width={32} height={32} color={colors.text} />
          </View>
          
          <Typography variant="h1" style={{ marginBottom: Spacing.xs }}>
            Profile Photo
          </Typography>
          
          <Typography variant="body" color={colors.secondaryText} style={{ textAlign: 'center' }}>
            Your photo ensures a more secure and tailored experience for you and your household.
          </Typography>
        </View>
      </View>

      {/* Photo Upload Area */}
      <View style={{ ...Padding.screenHorizontal, marginBottom: Spacing.xl }}>
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderColor: colors.border,
            borderStyle: 'dashed',
            borderRadius: 12,
            padding: Spacing.xl,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            minHeight: 120,
          }}
          onPress={pickImage}
        >
          {selectedImage ? (
            <View style={{ alignItems: 'center' }}>
              <Image
                source={{ uri: selectedImage }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  marginBottom: Spacing.sm,
                }}
              />
              <Typography variant="body" color={colors.secondaryText}>
                Tap to change photo
              </Typography>
            </View>
          ) : (
            <View style={{ alignItems: 'center' }}>
              <ImageIcon width={48} height={48} color={colors.secondaryText} />
              <Typography variant="body" color={colors.secondaryText} style={{ marginTop: Spacing.sm }}>
                Add Photo
              </Typography>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={{ ...Padding.screenHorizontal, marginTop: 'auto', paddingBottom: Spacing.lg }}>
        <AppButton
          variant={isDisabled ? 'primaryDisabled' : 'primaryLarge'}
          title={isUploading ? 'Uploading...' : 'Next'}
          onPress={handleProfilePhoto}
          disabled={isDisabled}
        />

        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginTop: Spacing.lg,
            paddingVertical: Spacing.sm,
          }}
          onPress={() => router.push('/(app)/home' as never)}
        >
          <Typography variant="body" color={colors.secondary.base}>
            Skip This Step
          </Typography>
        </TouchableOpacity>

        {/* Security Indicator */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginTop: Spacing.xl 
        }}>
          <LockIcon width={16} height={16} color={colors.secondaryText} />
          <Typography 
            variant="caption" 
            color={colors.secondaryText}
            style={{ marginLeft: 4 }}
          >
            Your data is securely encrypted
          </Typography>
        </View>
      </View>
    </View>
  );
};

export default ProfilePhoto;
