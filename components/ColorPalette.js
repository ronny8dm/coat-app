import { Image, FlatList, StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";

const ColorPalette = ({ onSelectColor }) => {
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

  const styles = StyleSheet.create({
    list: {
      alignItems: "center",
      paddingHorizontal: 0,
    },
    colorBox: {
      width: 100,
      height: 50,
      marginHorizontal: 10,
      borderRadius: 25,
    },
  });
  
export default ColorPalette;