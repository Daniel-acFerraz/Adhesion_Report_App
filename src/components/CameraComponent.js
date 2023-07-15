import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

const CameraComponent = ({ onPhotoCapture, onClose }) => {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true, exif: false };
      const photoData = await cameraRef.current.takePictureAsync(options);
      setPhoto(photoData);
    }
  };

  const sharePhoto = async () => {
    if (photo) {
      try {
        await shareAsync(photo.uri);
        setPhoto(null);
      } catch (error) {
        console.error('Error sharing photo:', error);
      }
    }
  };

  const savePhoto = async () => {
    if (photo) {
      try {
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        onPhotoCapture(photo);
        setPhoto(null);
      } catch (error) {
        console.error('Error saving photo:', error);
      }
    }
  };

  const discardPhoto = () => {
    setPhoto(null);
    onClose();
  };

  if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
    return <Text>Requesting permissions...</Text>;
  }

  if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>;
  }

  if (photo) {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: photo.uri }} />
        <Button title="Share" onPress={sharePhoto} />
        {hasMediaLibraryPermission && <Button title="Save" onPress={savePhoto} />}
        <Button title="Discard" onPress={discardPhoto} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Text style={styles.captureButtonText}>Capture</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 20,
    marginHorizontal: 10,
  },
  captureButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  preview: {
    flex: 1,
    width: '100%',
  },
});

export default CameraComponent;