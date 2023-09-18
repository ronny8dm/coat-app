import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { RootStackParamList } from './Tabs';
import { useVisionObjects } from './hooks/useVisionObjects';



const SwipeColorPalette = ({ onSelectColor }) => {
    const colors = ['#FF5733', '#33FF57', '#5733FF', '#FFF533'];

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
    

    if (!route.params) {
        return null;
    }

    const { imageSource, vectorizedMasks, imgWidth, imgHeight } = useVisionObjects(route.params.Image);

    const handleColorSelection = (color) => {
        console.log("Selected Color:", color);
        // You can implement any functionality here when a color is selected
    };

    return (
        <View style={styles.container}>
            <Image style={styles.img} source={{ uri: imageSource }} />
            <SwipeColorPalette onSelectColor={handleColorSelection} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: '100%',
        height: '85%',  
        aspectRatio: 9 / 16,
    },
    list: {
        alignItems: 'center',
        paddingHorizontal: 0,
    },
    colorBox: {
        width: 100,
        height: 50,
        marginHorizontal: 10,
        borderRadius: 25,
    },
});

export default ImagePreview;
