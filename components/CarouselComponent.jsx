import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';

const CarouselComponent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { width: viewportWidth } = Dimensions.get('window');

    const data = [
        { id: 1, imageUrl: require('../assets/images/carousel/_S.jpg'), title: 'Easy' },
        { id: 2, imageUrl: require('../assets/images/carousel/_S-1.gif'), title: 'Affordable' },
        { id: 3, imageUrl: require('../assets/images/carousel/xiaomi-desktop.jpg'), title: 'Convinient' },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={item.imageUrl} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Carousel
                style={styles.carousel}
                width={viewportWidth}
                height={250}
                data={data}
                renderItem={renderItem}
                onSnapToItem={(index) => setActiveIndex(index)}
                loop                // Enable looping
                autoPlay            // Enable autoplay
                autoPlayInterval={3000} // Set autoplay interval in milliseconds
                pagingEnabled       // Snap effect
            />
            {/* Pagination Dots */}
            <View style={styles.pagination}>
                {data.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            activeIndex === index ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    carousel: {
        marginTop: 0,
        marginBottom:50,
    },
    slide: {
        backgroundColor: 'white',
        borderRadius: 8,
        height: 250,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    title: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'normal',
        textAlign: 'center',
        fontFamily:'PoppinsLight'
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: 'blue',
    },
    inactiveDot: {
        backgroundColor: 'gray',
    },
});

export default CarouselComponent;
