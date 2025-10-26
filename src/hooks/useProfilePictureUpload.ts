import { useState } from 'react';
import { authApi, propertyApi } from '../lib/api';
import { useToast } from './use-toast';

interface ProfileUploadOptions {
  userId: string;
}

interface ProfileUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export function useProfilePictureUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const uploadProfilePicture = async (
    imageDataUrl: string,
    options: ProfileUploadOptions
  ): Promise<ProfileUploadResult> => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Convert data URL to blob
      const blob = await fetch(imageDataUrl).then(res => res.blob());
      const file = new File([blob], `profile-${options.userId}.jpg`, { type: 'image/jpeg' });

      // Generate presigned URL for upload using the new auth endpoint
      setUploadProgress(20);
      const presignedData = await authApi.generateProfilePictureUploadUrl(
        file.name,
        file.type
      );

      // Upload to S3
      setUploadProgress(40);
      await propertyApi.uploadToS3(presignedData.presignedUrl, file);

      setUploadProgress(100);
      
      toast({
        title: "Upload successful",
        description: "Profile picture uploaded successfully.",
      });

      return { success: true, url: presignedData.publicUrl };
    } catch (error: any) {
      console.error('Profile picture upload error:', error);
      
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload profile picture. Please try again.",
        variant: "destructive",
      });

      return { success: false, error: error.message };
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return {
    uploadProfilePicture,
    isUploading,
    uploadProgress,
  };
}
