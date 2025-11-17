import { useState } from 'react';
import { propertyApi } from '../lib/api';
import { useToast } from './use-toast';

interface S3UploadOptions {
  propertyId: string;
  caption?: string;
  orderIndex?: number;
}

interface S3UploadResult<TPhoto = unknown> {
  success: boolean;
  photo?: TPhoto;
  error?: string;
}

export function useS3Upload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const uploadPhoto = async <TPhoto = unknown>(
    file: File, 
    options: S3UploadOptions
  ): Promise<S3UploadResult<TPhoto>> => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Step 1: Generate presigned URL
      setUploadProgress(10);
      const presignedData = await propertyApi.generatePresignedUploadUrl(
        options.propertyId,
        file.name,
        file.type
      );

      // Step 2: Upload file to S3
      setUploadProgress(30);
      await propertyApi.uploadToS3(presignedData.presignedUrl, file);

      // Step 3: Confirm upload and save to database
      setUploadProgress(70);
      const photo = await propertyApi.confirmPhotoUpload(
        options.propertyId,
        presignedData.publicUrl,
        presignedData.key,
        options.caption,
        options.orderIndex || 0
      ) as TPhoto;

      setUploadProgress(100);
      
      toast({
        title: "Upload successful",
        description: "Photo uploaded successfully.",
      });

      return { success: true, photo };
    } catch (error: unknown) {
      console.error('S3 upload error:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to upload photo. Please try again."
      
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      });

      return { success: false, error: errorMessage };
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const uploadMultiplePhotos = async <TPhoto = unknown>(
    files: File[],
    options: S3UploadOptions
  ): Promise<S3UploadResult<TPhoto>[]> => {
    const results: S3UploadResult<TPhoto>[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const result = await uploadPhoto<TPhoto>(file, {
        ...options,
        orderIndex: (options.orderIndex || 0) + i,
      });
      results.push(result);
    }

    return results;
  };

  const deletePhoto = async (photoId: string): Promise<boolean> => {
    try {
      await propertyApi.deletePhoto(photoId);
      toast({
        title: "Photo deleted",
        description: "Photo has been deleted successfully.",
      });
      return true;
    } catch (error: unknown) {
      console.error('Delete photo error:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to delete photo. Please try again."
      toast({
        title: "Delete failed",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    uploadPhoto,
    uploadMultiplePhotos,
    deletePhoto,
    isUploading,
    uploadProgress,
  };
}
