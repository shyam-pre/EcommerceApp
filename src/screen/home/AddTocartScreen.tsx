import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useGetCartsQuery } from '../../api/cartApi'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Cart } from '../../api/cartApi'
import { moderateScale } from 'react-native-size-matters'
import { getData, keys } from '../../utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
const AddTocartScreen = () => {
    const { data, error, isLoading } = useGetCartsQuery()
    // console.log('ddddgg', );
    // const [cartData, setCartData] = useState([])

    // useEffect(() => {
    //     const data = getData(keys.Cart_Data);
    //     setCartData(data || []);
    // }, []);
    const dispatch = useDispatch<AppDispatch>()
    const carts = useSelector((state: RootState) => state?.mainCart?.carts ?? [])?.flatMap(cart => cart?.products.map(p => ({ ...p, userId: cart.userId })));// attach user info if needed
    console.log('✅ carts from Redux:dddddddd', carts);
    const handleQulity = (item) => {
        
    }
    return (
        <View style={styles.container}>
            <Text>AddTocartScreen </Text>
            <View style={styles.homeContainer}>
                <FlatList<Cart>
                    data={carts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        console.log('itemsssssssddrrrtttt', item);
                        return (
                            <View style={{ height: hp('20%'), width: wp('90%'), borderWidth: 1, borderColor: '#000', alignSelf: 'center', marginVertical: moderateScale(4) }}>
                                <Text >userId : {item?.userId}</Text>
                                <TouchableOpacity onPress={() => handleQulity(item)} style={{ borderWidth: 1, borderColor: '#000', padding: moderateScale(10) }}>
                                    <Text> totalQuantity : {item?.quantity}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>
            <View style={{ height: hp(10), borderWidth: 1, borderColor: '#000' }}>
                <Text>dsfsd</Text>
            </View>
        </View>
    )
}

export default AddTocartScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    homeContainer: { 
        flex: 1,
        backgroundColor: '#fff'
    }
})