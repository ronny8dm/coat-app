import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { RootStackParamList } from "../Tabs";

export const useVisionObjects = (imageSource) => {
    const route = useRoute();
    const [imgWidth, setImgWidth] = useState(null);
    const [imgHeight, setImgHeight] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            // First, fetch the image data from the source URI.
            try {
                const imageResponse = await fetch(route.params.Image);
                const imageBlob = await imageResponse.blob();

                const formData = new FormData();
                formData.append('vectorized', 'true');
                formData.append('room_image', 'room_image.jpg');

                const headers = new Headers();
                headers.append("Authorization", 'RFq13EwWO0Z9Oj96sOIU7XDrSF3uTQ14ZRDuuefMVulj6yE7XAEBMSZs3KmQ');
                headers.append("X-RapidAPI-Key", 'b56a2f8652msh060ea2a1bb6dd8dp1ce8e1jsn40c0676faf52');
                headers.append("X-RapidAPI-Host", 'https://vision-api.p.rapidapi.com/interior');

                const requestOptions = {
                    method: 'POST',
                    headers: headers,
                    body: formData,
                    redirect: 'follow'
                };

                const response = await fetch('https://vision-api.p.rapidapi.com/interior', requestOptions);
                
                if (!response.ok) {
                    const text = await response.text();
                    console.error("Error response from server:", text);
                    return;
                }
                
                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error(error);
            }

            Image.getSize(imageSource, (imgWidth, imgHeight) => {
                setImgHeight(imgHeight);
                setImgWidth(imgWidth);
            }, (err) => {
                console.error(err);
            });
        };

        fetchData();
    }, [route.params.Image]);

    if (!route.params) {
        return null;
    }

    return {
        imageSource,
        imgWidth,
        imgHeight
    }
}
