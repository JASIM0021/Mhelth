import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import GoogleForm from "./GooglrForm";
import GlobalContext from "../../context/GlobalContext";
import { useMyContext } from "../../context/GlobalContextProvider";
import axios from "axios";

import * as MediaLibrary from "expo-media-library";
export default function Home() {
  const {
    isSubmited,
    record,
    setRecord,
    ans,
    setIsSubmited,
    loader,
    setLoader,
    startRecord,
    setStartRecord,
  } = useMyContext();
  // const [record, setRecord] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === "granted");
      if (
        cameraStatus.status === "granted" &&
        audioStatus.status === "granted"
      ) {
        // Start recording when permissions are granted
      }
      requestPermission();
    })();

    setIsSubmited(false);
    setStartRecord(false);
    setLoader(false);
  }, []);

  console.log(isSubmited, "isSubmited");
  const takeVideo = async () => {
    setStartRecord(true);

    console.log("call take video");
    // setIsSubmited(false);

    if (camera) {
      const data = await camera.recordAsync({
        maxDuration: 10,
        
      });

      const asset = await MediaLibrary.createAssetAsync(data?.uri);
      console.log("asset", asset);
      setRecord(asset);
      console.log("data.uri", data.uri);
    }
  };
  // const takeVideo = useCallback(async () => {
  //   setStartRecord();
  //   if (camera) {
  //     const data = await camera.recordAsync({
  //       // maxDuration: 10,
  //     });
  //     setIsRecording(true);

  //     const asset = await MediaLibrary.createAssetAsync(data?.uri);
  //     console.log("asset", asset);
  //     console.log("data.uri", data.uri);

  //     setRecord(asset);
  //   }
  // }, [camera]); // Add dependencies that

  const stopVideo = async () => {
    if (camera) {
      try {
        camera.stopRecording();
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  // const stopVideo = async () => {
  //   if (camera) {
  //     try {
  //       const data = await camera.stopRecording();
  //       const asset = await MediaLibrary.createAssetAsync(data?.uri);
  //       console.log("stopasset", asset);
  //       console.log("asset", asset);
  //       console.log("data.uri", data.uri);
  //       setRecord(asset);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (isSubmited) {
  //     stopVideo();
  //   }
  // }, [isSubmited]);

  if (hasCameraPermission === null || hasAudioPermission === null) {
    return <Text>No access to camera</Text>;
  }
  if (hasCameraPermission === false || hasAudioPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {false ? (
        <>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: record,
            }}
            maxDuration={10}
            quality={0.5}
            useNativeControls
            resizeMode='contain'
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
              ratio={"4:3"}
              // onCameraReady={() => takeVideo()}
            />
          </View>

          <View style={styles.buttons}>
            {false && (
              <>
                <Button
                  title='Flip Video'
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                ></Button>
                <Button title='Take video' onPress={() => takeVideo()} />
                <Button title='Stop Video' onPress={() => stopVideo()} />
              </>
            )}
          </View>
        </>
      )}
      {!startRecord ? (
        <>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Button title='Start Survey' onPress={() => takeVideo()} />
          </View>
        </>
      ) : loader ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator color={"blue"} size={25} />
          <Text>Uploading.... {"\n"} please keep hold your phone</Text>
        </View>
      ) : (
        <View style={{ flex: 0.5 }}>
          {/* <Button title='Take video' onPress={() => takeVideo()} /> */}
          {/* <WebView
      style={{
        flex: 1,
        marginTop: Constants.statusBarHeight,
      }}
      source={{ uri: 'https://github.com/jasim0021' }}
    /> */}
          {/* <Button title="Take video" onPress={() => takeVideo()} /> */}
          <GoogleForm onSubmit={stopVideo} />
        </View>
      )}
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
