import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, Button, Alert } from "react-native";
import { CheckBox } from "react-native-elements";
import NavigationString from "../constant/NavigationString";
import { useMyContext } from "../../context/GlobalContextProvider";
import * as MediaLibrary from "expo-media-library";
// import RNFetchBlob from "rn-fetch-blob";

const GoogleForm = ({ onSubmit }) => {
  const [formResponses, setFormResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { ans, setAns, setIsSubmited, record, loader, setLoader, setRecord } =
    useMyContext();
  const [image, setImage] = useState({});
  const formData = new FormData();
  const getQuestion = async () => {
    // setLoader(true);
    await axios.get("http://15.206.166.191/question").then((response) => {
      setQuestions(response?.data?.data);
      console.log("response?.data", response?.data?.data);
      setLoader(false);
    });
    // setLoader(false);
  };
  // console.log("questions", questions);

  // const isSubmitedListener = async () => {
  //   console.log("API Calling ...", "response");

  //   // let formData = new FormData();
  //   // console.log("response", formData);
  //   // formData.append("data", { data: "jasim" });
  //   // console.log("form data added  ...", formdata, "response");
  //   // if (record) {

  //   //   formData.append('image', {
  //   //     uri: asset.uri,
  //   //     type: asset.type, // MIME type (e.g., 'image/jpeg', 'video/mp4')
  //   //     name: asset.filename || 'file.jpg', // You can specify a different name if needed
  //   //   });
  //   // }
  //   // try {
  //   //   const asset = await MediaLibrary.createAssetAsync(record);
  //   //   let localUri = `${asset.uri}`;
  //   //   let filename = localUri.split("/").pop();
  //   //   let match = /\.(\w+)$/.exec(filename);
  //   //   let type = asset.type;
  //   //   setImage({ uri: localUri, name: filename, type });
  //   //   console.log("response", "image setted");
  //   // } catch (error) {
  //   //   console.log("response", error);
  //   // }
  //   try {
  //     // Here, you should initialize 'image' state properly before using it.
  //     // ...
  //     console.log("asset binding", "response");
  //     const asset = await MediaLibrary.createAssetAsync(record);
  //     let localUri = `${asset.uri}`;
  //     let filename = localUri.split("/").pop();
  //     let match = /\.(\w+)$/.exec(filename);
  //     let type = asset.type;
  //     setImage({ uri: asset.uri, name: asset.filename, type: asset.mediaType });

  //     // ... (rest of the code)
  //   } catch (error) {
  //     console.log("Error occurred while setting image:", error);
  //   }
  //   const photoUri = image;
  //   let formData = new FormData();
  //   formData.append("data", { data: "jasim" });
  //   formData.append("image", photoUri);
  //   console.log("formData", formData);

  //   // const config = {
  //   //   data: formData,
  //   //   method: `POST`,
  //   //   url: `http://15.206.166.191/upload`,
  //   //   headers: {
  //   //     Accept: "application/json",
  //   //     "Content-Type": "multipart/form-data",
  //   //   },
  //   // };
  //   //     const config = {
  //   //       headers: {
  //   //               'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary";'
  //   //       }
  //   // };

  //   // axios.post("http://15.206.166.191/upload", formData, config).then((resp) => {
  //   //         console.log(resp);
  //   // }).catch(err => {
  //   //         console.log(err);
  //   // });

  //   try {
  //     // const asset = await MediaLibrary.createAssetAsync(record);
  //     // const formData = new FormData();
  //     // formData.append("image", {
  //     //   uri: `${asset.uri}`,
  //     //   name: asset.filename, // Set the desired file name here
  //     //   type: asset.mediaType, // Adjust the MIME type according to your file type
  //     // });

  //     const config = {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };

  //     const response = await axios.post(
  //       "http://15.206.166.191/upload",
  //       formData,
  //       config
  //     );
  //     console.log("File uploaded successfully:", response.data);
  //     // Handle the response as needed
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     // Handle errors
  //   }
  //   // await axios(config)
  //   //   .then((response) => {
  //   //     console.log("response", response);
  //   //     responceData = response?.data;
  //   //     alert(responceData);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log("response", error);
  //   //     alert(error);
  //   //     responceData = error?.response?.data;
  //   //     alert(responceData);
  //   //   });
  // };

  const isSubmitedListener = async () => {
    console.log("record", record);
    // const asset = await MediaLibrary.createAssetAsync(record)
    console.log("Uploading....");

    console.log("record", record);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    let filename = record?.filename?.split("/").pop();
    console.log("filename", filename, record?.uri);
    const foormImage = {
      uri: record?.uri,
      type: "image/video", // Adjust the MIME type according to your file type
      name: filename, // Set the desired file name here
    };
    formData.append("image", foormImage);

    formData.append(
      "data",
      JSON.stringify({
        data: ans,
      })
    );
    setLoader(true);
    const response = await axios
      .post("http://15.206.166.191/upload", formData, config)
      .then((resp) => {
        console.warn("resp", resp?.data);
        navigation.navigate(NavigationString.Thankyou);
      })
      .catch((err) => {
        console.warn("err", err);
        setLoader(false);

        Alert.alert(
          "Something went wrong",
          "Please try again",
          [
            {
              text: "Retry",
              onPress: () => {
                // Call your function here when "Retry" is pressed
                handleSubmit();
              },
            },
          ],
          { cancelable: false }
        );
      });

    // console.log("Uploaded...", response);
    setLoader(false);
  };
  const handleCheckBoxChange = (titleId, questionId, optionIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.map((questionGroup) => {
        if (questionGroup.id === titleId) {
          const updatedData = questionGroup.data.map((question) => {
            if (question.id === questionId) {
              const updatedSelectedOptions = question.options.map(
                (option, index) => {
                  return index === optionIndex;
                }
              );
              return { ...question, selectedOptions: updatedSelectedOptions };
            }
            return question;
          });
          return { ...questionGroup, data: updatedData };
        }
        return questionGroup;
      });
      return updatedQuestions;
    });
  };

  // const handleCheckBoxChange = (titleId, questionId, optionIndex) => {
  //   setQuestions((prevQuestions) => {
  //     const updatedQuestions = prevQuestions.map((questionGroup) => {
  //       if (questionGroup.id === titleId) {
  //         const updatedData = questionGroup.data.map((question) => {
  //           if (question.id === questionId) {
  //             const updatedSelectedOptions = [...question.selectedOptions];
  //             updatedSelectedOptions[optionIndex] =
  //               !updatedSelectedOptions[optionIndex];
  //             return { ...question, selectedOptions: updatedSelectedOptions };
  //           }
  //           return question;
  //         });
  //         return { ...questionGroup, data: updatedData };
  //       }
  //       return questionGroup;
  //     });
  //     return updatedQuestions;
  //   });
  // };
  const navigation = useNavigation();
  const handleSubmit = async () => {
    onSubmit();
    setLoader(true);
    // if (!record) {
    //   return;
    // }
    // Create an array of objects to store user responses in the desired format
    const formattedResponses = questions.map((questionGroup) => {
      return {
        [questionGroup.title]: questionGroup.data.map((question) => ({
          question: question.question,
          answer:
            question.options[
              question.selectedOptions.findIndex((option) => option === true)
            ] || "Not answered",
        })),
      };
    });

    // Now you have user responses in the desired format
    // console.log("Formatted Responses:", formattedResponses);
    setAns(questions);
    setIsSubmited(true);
    // Send 'formattedResponses' to your server or perform any other necessary actions

    // Navigate to the 'Thankyou' screen
    // navigation.navigate(NavigationString.Thankyou);
    setTimeout(() => {
      isSubmitedListener();
    }, 10000);
  };

  useMemo(() => {
    getQuestion();
  }, []);

  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState(true);

  // Function to format seconds into minutes:seconds
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Countdown timer logic
  useEffect(() => {
    if (timerActive && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (timer === 0 && timerActive) {
      // Automatically hit the submit button after 5 minutes
      handleCheckBoxChange();
      setTimerActive(false);
    }
  }, [timer, timerActive, onSubmit]);
  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 40, paddingHorizontal: 10 }}
    >
      <View style={{ position: "absolute", top: 20, right: 20 }}>
        <Text>{formatTime(timer)}</Text>
      </View>
      {questions.map((questionGroup) => (
        <View key={questionGroup.id}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            {questionGroup.title}
          </Text>
          {questionGroup.data.map((question, index) => (
            <View key={question.id}>
              <Text>
                {++index}. {question.question}
              </Text>
              <ScrollView
                horizontal
                style={{ flexDirection: "row" }}
                showsHorizontalScrollIndicator={false}
              >
                {question.options.map((option, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <CheckBox
                      checked={question.selectedOptions[index]}
                      onPress={() =>
                        handleCheckBoxChange(
                          questionGroup.id,
                          question.id,
                          index
                        )
                      }
                    />
                    <Text>{option}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          ))}
        </View>
      ))}
      <Button
        title={`Submit ${formatTime(timer)}`}
        onPress={() => handleSubmit()}
      />
    </ScrollView>
  );
};

export default memo(GoogleForm);
