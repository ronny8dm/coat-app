import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { RootStackParamList } from "../Tabs";

export const useVisionObjects = (imageSource) => {
  const route = useRoute();
  const [vectorizedMasks, setVectorizedMasks] = useState(null);
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData();
      formData.append("vectorized", "true");
      formData.append("room_image", {
        uri: route.params.Image,
        name: "room_image.jpg",
        type: "image/jpeg",
      });

      const headers = new Headers();
      headers.append(
        "Authorization",
        "RFq13EwWO0Z9Oj96sOIU7XDrSF3uTQ14ZRDuuefMVulj6yE7XAEBMSZs3KmQ"
      );
      headers.append(
        "X-RapidAPI-Key",
        "b56a2f8652msh060ea2a1bb6dd8dp1ce8e1jsn40c0676faf52"
      );
      headers.append("X-RapidAPI-Host", "vision-api.p.rapidapi.com");

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: formData,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "https://vision-api.p.rapidapi.com/interior",
          requestOptions
        );
        const result = await response.json();
        console.log("API Response:", result);
        setVectorizedMasks(result);
      } catch (error) {
        console.error("API Request Error:", error);
      }

      Image.getSize(
        imageSource,
        (width, height) => {
          setImgHeight(height);
          setImgWidth(width);
        },
        (err) => {
          console.error("Image getSize Error:", err);
        }
      );
    };

    fetchData();
  }, [route.params.Image]);

  if (!route.params) {
    return null;
  }

  return {
    imageSource,
    vectorizedMasks,
    imgWidth,
    imgHeight,
  };
};
