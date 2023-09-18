import React, {  useState, useEffect, useRef } from 'react';
import { Camera, CameraRuntimeError } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';

const CameraComponent = () => {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [permission, setPermission] = useState(null);
    const [showCamera, setShowCamera] = useState(true);
    const [imageSource, setImageSource] = useState('');
    const [cameraRatios, setCameraRatios] = useState([]);
    const [selectedRatio, setSelectedRatio] = useState('');
    const navigation = useNavigation();
    const cameraRef = useRef(null);

    useEffect(() => {
      const requestCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setPermission(status === 'granted');
        if (status !== 'granted') {
          Alert.alert('Camera permission required');
        }
      };
      
      requestCameraPermission();
    
      const focusListener = navigation.addListener('focus', () => {
        setShowCamera(true);
      });

      const getSupportedRatios = async () => {
        if (cameraRef.current) {
          const ratios = await cameraRef.current.getSupportedRatiosAsync();
          setCameraRatios(ratios);
          
          if (ratios.includes('16:9')) {
            setSelectedRatio('16:9');
          } else if (ratios.length > 0) {
            setSelectedRatio(ratios[0]);  
          }
        }
      };

      getSupportedRatios();
    
      return focusListener;
    }, []);


  const handleCameraError = ( error) => {
    console.log('Camera Error:', error);
  };


  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          qualityPrioritization: 'speed',
          flash: 'off',
        });
    
        setImageSource(photo.uri);
        setShowCamera(false)
        console.log('Photo:', photo.uri);

        navigation.navigate('ImagePreview', {
          Image: photo.uri
        })
      } catch (error) {
        console.log('Error taking photo:', error);
      }
    }
  };

  if (permission === null) {
    return <View />;
  }
  if (permission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
    {showCamera && (
      <>
        <Camera
          key={showCamera ? "camera-on" : "camera-off"}
          ref={cameraRef}
          style={styles.camera}
          isActive={showCamera}
          photo={true}
          ratio={selectedRatio}
          onError={handleCameraError}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto} />
        </View>
      </>
    )}

    {!showCamera && imageSource !== '' && (
      <Image style={styles.image} source={{ uri: `file://${imageSource}` }} />
    )}

  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#B2BEB5',
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});

export default CameraComponent;