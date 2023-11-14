import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { CheckBox } from "react-native-elements";
import NavigationString from "../constant/NavigationString";
import { useMyContext } from "../../context/GlobalContextProvider";
import * as MediaLibrary from "expo-media-library";
import RNFetchBlob from "rn-fetch-blob";

const GoogleForm = () => {
  const [formResponses, setFormResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { ans, setAns, setIsSubmited, record } = useMyContext();
  const [image, setImage] = useState({});
  const getQuestion = async () => {
    await axios.get("http://15.206.166.191/question").then((response) => {
      setQuestions(response?.data?.data);
      // console.log("response?.data", response?.data?.data);
    });
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
    const asset = await MediaLibrary.createAssetAsync(`${record}`)

      .then((asset) => {
        RNFetchBlob.fetch(
          "POST",
          "http://15.206.166.191/upload",
          {
            otherHeader: "foo",
            "Content-Type": "multipart/form-data",
          },
          [
            // // element with property `filename` will be transformed into `file` in form data
            // { name: "image", filename: asset.filename, data: asset.uri },
            // // custom content type
            // {
            //   name: "avatar-png",
            //   filename: "avatar-png.png",
            //   type: "image/png",
            //   data: binaryDataInBase64,
            // },
            // part file from storage
            {
              name: "image",
              filename: asset?.filename || "myfile",
              type: asset.mediaType,
              data: RNFetchBlob.wrap(asset.uri),
            },
            // elements without property `filename` will be sent as plain text
            { name: "data", data: "user" },
            // {
            //   name: "info",
            //   data: JSON.stringify({
            //     mail: "example@example.com",
            //     tel: "12345678",
            //   }),
            // },
          ]
        )
          .then((resp) => {
            console.log("resp", resp);
          })
          .catch((err) => {
            console.log("err", err);
          });
      })
      .catch((err) => {
        console.log("error creating asset", err);
      });
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
    isSubmitedListener();
  };

  useEffect(() => {
    getQuestion();
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 40, paddingHorizontal: 10 }}
    >
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
      <Button title='Submit' onPress={handleSubmit} />
    </ScrollView>
  );
};

export default GoogleForm;
