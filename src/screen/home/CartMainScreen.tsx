import React, { lazy, useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useAddCartMutation, useGetCartsQuery } from '../../api/cartApi'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Cart } from '../../api/cartApi'
import { moderateScale } from 'react-native-size-matters'
import { getData, keys } from '../../utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@reduxjs/toolkit/query'
import { AppDispatch } from '../../redux/store'
import { addItemToCart } from '../../redux/slices/MainCartSlice'
const CartMainScreen = ({ navigation }) => {
    const { data, error, isLoading } = useGetCartsQuery()
    console.log('ddddggcart', data?.carts);

    let LocalData = 
    [
        {
        "id": 1,
        "userId": 33,
        "discountedTotal": 89686.65,
        "total": 103774.85,
        "totalProducts": 4,
        "totalQuantity": 15,
        "products": [
            {
                "id": 168,
                "title": "Charger SXT RWD",
                "price": 32999.99,
                "quantity": 3,
                "discountPercentage": 13.39,
                "discountedTotal": 85743.87,
                "total": 98999.97,
                "thumbnail": "https://cdn.dummyjson.com/products/images/vehicle/Charger%20SXT%20RWD/thumbnail.png"
            },
            {
                "id": 78,
                "title": "Apple MacBook Pro 14 Inch Space Grey",
                "price": 1999.99,
                "quantity": 2,
                "discountPercentage": 18.52,
                "discountedTotal": 3259.18,
                "total": 3999.98,
                "thumbnail": "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png"
            },
            {
                "id": 183,
                "title": "Green Oval Earring",
                "price": 24.99,
                "quantity": 5,
                "discountPercentage": 6.28,
                "discountedTotal": 117.1,
                "total": 124.95,
                "thumbnail": "https://cdn.dummyjson.com/products/images/womens-jewellery/Green%20Oval%20Earring/thumbnail.png"
            },
            {
                "id": 100,
                "title": "Apple Airpods",
                "price": 129.99,
                "quantity": 5,
                "discountPercentage": 12.84,
                "discountedTotal": 566.5,
                "total": 649.95,
                "thumbnail": "https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/thumbnail.png"
            }
        ]
    },
    {
        "id": 2,
        "userId": 33,
        "discountedTotal": 89686.65,
        "total": 103774.85,
        "totalProducts": 4,
        "totalQuantity": 15,
        "products": [
            {
                "id": 168,
                "title": "Charger SXT RWD",
                "price": 32999.99,
                "quantity": 1,
                "discountPercentage": 13.39,
                "discountedTotal": 85743.87,
                "total": 98999.97,
                "thumbnail": "https://cdn.dummyjson.com/products/images/vehicle/Charger%20SXT%20RWD/thumbnail.png"
            },
            {
                "id": 78,
                "title": "Apple MacBook Pro 14 Inch Space Grey",
                "price": 1999.99,
                "quantity": 2,
                "discountPercentage": 18.52,
                "discountedTotal": 3259.18,
                "total": 3999.98,
                "thumbnail": "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png"
            },
            {
                "id": 183,
                "title": "Green Oval Earring",
                "price": 24.99,
                "quantity": 5,
                "discountPercentage": 6.28,
                "discountedTotal": 117.1,
                "total": 124.95,
                "thumbnail": "https://cdn.dummyjson.com/products/images/womens-jewellery/Green%20Oval%20Earring/thumbnail.png"
            },
            {
                "id": 100,
                "title": "Apple Airpods",
                "price": 129.99,
                "quantity": 5,
                "discountPercentage": 12.84,
                "discountedTotal": 566.5,
                "total": 649.95,
                "thumbnail": "https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/thumbnail.png"
            }
        ]
    },
    {
        "id": 3,
        "userId": 35,
        "discountedTotal": 89686.65,
        "total": 103774.85,
        "totalProducts": 4,
        "totalQuantity": 15,
        "products": [
            {
                "id": 168,
                "title": "Charger SXT RWD",
                "price": 32999.99,
                "quantity": 1,
                "discountPercentage": 13.39,
                "discountedTotal": 85743.87,
                "total": 98999.97,
                "thumbnail": "https://cdn.dummyjson.com/products/images/vehicle/Charger%20SXT%20RWD/thumbnail.png"
            },
            {
                "id": 78,
                "title": "Apple MacBook Pro 14 Inch Space Grey",
                "price": 1999.99,
                "quantity": 2,
                "discountPercentage": 18.52,
                "discountedTotal": 3259.18,
                "total": 3999.98,
                "thumbnail": "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png"
            },
            {
                "id": 183,
                "title": "Green Oval Earring",
                "price": 24.99,
                "quantity": 5,
                "discountPercentage": 6.28,
                "discountedTotal": 117.1,
                "total": 124.95,
                "thumbnail": "https://cdn.dummyjson.com/products/images/womens-jewellery/Green%20Oval%20Earring/thumbnail.png"
            },
            {
                "id": 100,
                "title": "Apple Airpods",
                "price": 129.99,
                "quantity": 5,
                "discountPercentage": 12.84,
                "discountedTotal": 566.5,
                "total": 649.95,
                "thumbnail": "https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/thumbnail.png"
            }
        ]
    }
]
    // const [cartData, setCartData] = useState([])

    // useEffect(() => {
    //     const data = getData(keys.Cart_Data);
    //     setCartData(data || []);
    // }, []);
    const dispatch = useDispatch<AppDispatch>()
    // const carts = useSelector((state: RootState) => state?.cart?.cartItems);
    // console.log('cartsddddddd', carts);
    const [addToCart, { isLoading: addToCartLoading, error: addToCartError }] = useAddCartMutation()

    const handleAddToCart = async (item) => {
        console.log('itemmmmmm', item);

        dispatch(addItemToCart(item))
        navigation.navigate('AddTocartScreen')
        // try {
        //     await addToCart({
        //         userId: item.userId,
        //         products: [{
        //             id: 144,
        //             quantity: 4,
        //         },
        //         {
        //             id: 98,
        //             quantity: 1,
        //         }]
        //     }).unwrap()
        // } catch (error) {
        //     console.log('❌ API failed:', error);

        // }

    }

    return (
        <View style={styles.container}>
            {
                (isLoading || addToCartLoading) ? (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'} color={'green'} />
                </View>
                ) : (
                    <>
                        <Text>CartMainScreen sdfas</Text>
                        <FlatList<Cart>
                            // data={data?.carts}
                            data={LocalData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                // console.log('itemsssssss', item);
                                return (
                                    <View style={{ height: hp('20%'), width: wp('90%'), borderWidth: 1, borderColor: '#000', alignSelf: 'center', marginVertical: moderateScale(4) }}>

                                        <Text >userId : {item?.userId}</Text>
                                        <TouchableOpacity onPress={() => handleAddToCart(item)} style={{ borderWidth: 1, borderColor: '#000', padding: moderateScale(10) }}>
                                            <Text> totalQuantity : {item?.totalQuantity}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                        />
                    </>)
            }
        </View>
    )
}

export default CartMainScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})