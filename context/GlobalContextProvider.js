import React, { useContext, useState } from "react";
import GlobalContext from "./GlobalContext";

const MyProvider = ({ children }) => {
  const [isSubmited, setIsSubmited] = useState(false);
  const [image, setImage] = useState({});
  const [record, setRecord] = useState(null);
  const [ans, setAns] = useState([]);
  const [loader, setLoader] = useState(false);
  const [startRecord, setStartRecord] = useState(false);

  // //   const isSubmitedListener = async () => {

  // //     console.log("Api Calling ...")

  // //       const formData = new FormData();
  // //       formData.append("data", {data:ans});

  // //       if (record) {
  // //         const asset = await MediaLibrary.createAssetAsync(record);
  // //         formData.append('image', {
  // //           uri: asset.uri,
  // //           type: asset.type, // MIME type (e.g., 'image/jpeg', 'video/mp4')
  // //           name: asset.filename || 'file.jpg', // You can specify a different name if needed
  // //         });
  // //       }
  // // console.log('formData', formData)

  // //         try {
  // //           const response = await axios.post(
  // //             "http://15.206.166.191/upload", // Replace with your API endpoint
  // //             formData,
  // //             {
  // //               headers: {
  // //                 "Content-Type": "multipart/form-data",
  // //               },
  // //             }
  // //           );

  // //           console.log('response', response)
  // //           alert(response)
  // //         } catch (error) {
  // //           alert(error)
  // //           console.log('error', error)
  // //         }

  // //         // Handle the API response
  // //         // console.log("API Response:", response);

  // //     }
  // const isSubmitedListener = async () => {
  //   console.log("API Calling ...");

  //   const formData = new FormData();
  //   formData.append("data", {});

  //   // if (record) {

  //   //   formData.append('image', {
  //   //     uri: asset.uri,
  //   //     type: asset.type, // MIME type (e.g., 'image/jpeg', 'video/mp4')
  //   //     name: asset.filename || 'file.jpg', // You can specify a different name if needed
  //   //   });
  //   // }
  //   const asset = await MediaLibrary.createAssetAsync(record);
  //   let localUri = `${asset.uri}`;
  //   let filename = localUri.split("/").pop();
  //   let match = /\.(\w+)$/.exec(filename);
  //   let type = asset.type;
  //   setImage({ uri: localUri, name: filename, type });
  //   console.log("formData", formData);
  //   const photoUri = image;
  //   const config = {
  //     data: formData,
  //     method: `POST`,
  //     url: `http://15.206.166.191/upload`,
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };

  //   formData.append("image", photoUri);

  //   await axios(config)
  //     .then((response) => {
  //       console.log("response", response);
  //       responceData = response?.data;
  //       alert(responceData);
  //     })
  //     .catch((error) => {
  //       console.log("response", error);
  //       alert(error);
  //       responceData = error?.response?.data;
  //       alert(responceData);
  //     });
  // };
  return (
    <GlobalContext.Provider
      value={{
        isSubmited,
        setIsSubmited,
        record,
        setRecord,
        ans,
        setAns,
        loader,
        setLoader,
        startRecord,
        setStartRecord,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useMyContext = () => {
  return useContext(GlobalContext);
};
export { MyProvider, useMyContext };
