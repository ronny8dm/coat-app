import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Image, FlatList, StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import Svg, { Polygon } from 'react-native-svg';
import { useVisionObjects } from "./hooks/useVisionObjects";
import ColorPalette from "./ColorPalette";

const DISPLAY_ASPECT_RATIO = 9 / 16;

const SwipeColorPalette = ({ onSelectColor }) => {
  const colors = ["#FF5733", "#33FF57", "#5733FF", "#FFF533"];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.colorBox, { backgroundColor: item }]}
      onPress={() => onSelectColor(item)}
    />
  );

  return (
    <FlatList
      horizontal
      data={colors}
      renderItem={renderItem}
      keyExtractor={(color) => color}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  );
};

const ImagePreview = () => {
  const route = useRoute();
  const { width: screenWidth } = Dimensions.get('window');

  if (!route.params) {
    return null;
  }

  const { imageSource, vectorizedMasks, imgWidth, imgHeight } = useVisionObjects(route.params.Image);
console.log("Hook Result:", { imageSource, vectorizedMasks, imgWidth, imgHeight });

  const walls = vectorizedMasks?.detection?.walls || [];

  const displayedImageWidth = screenWidth; 
  const displayedImageHeight = screenWidth * DISPLAY_ASPECT_RATIO;

  const scaleX = displayedImageWidth / imgWidth;
  const scaleY = displayedImageHeight / imgHeight;

  const generatePolygonPoints = (wall) => {
    const points = wall.points.map(point => 
      `${point.x * imgWidth * scaleX},${point.y * imgHeight * scaleY}`
    ).join(' ');

    console.log(`Wall Points: ${points}`);
    return points;
  };

  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorSelection = (color) => {
    setSelectedColor(color);
    console.log("Selected Color:", color);
  };

  return (
    <View style={styles.container}>
        <Image style={styles.img} source={{ uri: imageSource }} />

        <Svg width={displayedImageWidth} 
    height={displayedImageHeight} 
    style={[StyleSheet.absoluteFill, styles.img]} 
    pointerEvents="none"
>
            {walls.map((wall, index) => (
                <Polygon
                    key={index}
                    points={generatePolygonPoints(wall)}
                    fill={selectedColor || '#00000050'}
                    stroke="blue" 
                    strokeWidth="2"
                />
            ))}
        </Svg>

        <ColorPalette onSelectColor={handleColorSelection} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "100%",
    height: "85%",
    aspectRatio: 9 / 16,
  },
});

export default ImagePreview;
