import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';

const Banner = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { width: viewportWidth } = Dimensions.get('window');

    const data = [
        { id: 2, imageUrl: require('../assets/images/carousel/_S-5.gif'), title: 'LImited offer' },
        { id: 3, imageUrl: require('../assets/images/carousel/_S-2.gif'), title: 'Buy now' },
        { id: 3, imageUrl: require('../assets/images/carousel/xiaomi-desktop.jpg'), title: 'Black November' },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={item.imageUrl} resizeMode='contain' style={styles.image} />
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
        marginLeft:0,
        marginRight:0,
        marginBottom:20,

    },
    carousel: {
        marginTop: 0,
        marginBottom:20,
        alignItems:'center',
        justifyContent:'center',
    },
    slide: {
        backgroundColor: 'white',
        borderRadius: 8,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
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

export default Banner;
