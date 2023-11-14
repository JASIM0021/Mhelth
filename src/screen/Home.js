import React, { useState, useEffect, useContext, useCallback } from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import GoogleForm from "./GooglrForm";
import GlobalContext from "../../context/GlobalContext";
import { useMyContext } from "../../context/GlobalContextProvider";
import axios from "axios";


import * as MediaLibrary from 'expo-media-library';
export default function Home() {
  const { isSubmited, record, setRecord,ans ,setIsSubmited} = useMyContext();
// const [record, setRecord] = useState(null);
const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
 
  const [type, setType] = useState(Camera.Constants.Type.back);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  useEffect(() => {
  
   
 
   
    (async () => {
      
     
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === "granted");
      requestPermission()
    
    })();


  setIsSubmited(false)
  }, [camera]);


  



 
 


  
console.log(isSubmited,'isSubmited');
  const takeVideo = async () => {
    if (camera) {
      const data = await camera.recordAsync({
        // maxDuration: 10,
      });
   
      const asset = await MediaLibrary.createAssetAsync(data?.uri);
      console.log('asset', asset)
      setRecord(data.uri);
      console.log(data.uri);
    }
  };

  const stopVideo = async () => {
   
   if(camera){
    try {
      camera.stopRecording()
    } catch (error) {
      console.log('error', error)
    }
   }
    
  };
  useEffect(()=>{if(isSubmited){
    stopVideo()
  }},[isSubmited])

  if (hasCameraPermission === null || hasAudioPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasAudioPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <View style={{ flex: 1 }}>
      {false  ? (
        <>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: record,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View style={{ rowGap: 10 }}>
            <Button
              title={status.isPlaying ? "Pause" : "Play"}
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
            />
            <Button title={"Delete"} onPress={() => setRecord(null)} />
          </View>
        </>
      ) : (
        <>
          <View style={styles.cameraContainer}>
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
              ratio={"16:9"}
              onCameraReady={ takeVideo}
            />
          </View>

          <View style={styles.buttons}>
            {false && (
              <>
                <Button
                  title="Flip Video"
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                ></Button>
                <Button title="Take video" onPress={() => takeVideo()} />
                <Button title="Stop Video" onPress={() => stopVideo()} />
              </>
            )}
          </View>
        </>
      )} 

      <View style={{ flex: 0.5 }}>
        {/* <WebView
      style={{
        flex: 1,
        marginTop: Constants.statusBarHeight,
      }}
      source={{ uri: 'https://github.com/jasim0021' }}
    /> */}
     {/* <Button title="Take video" onPress={() => takeVideo()} /> */}
        <GoogleForm/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 0.5,
    flexDirection: "row",
    marginBottom: 100,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  video: {
    flex: 0.5,
    margin: 30,
    marginTop: 100,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
