import React, {useContext, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList, Keyboard, ActivityIndicator, ScrollView} from 'react-native'
import { moderateScale, scale } from 'react-native-size-matters'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addNote, noteSelector, Note } from '../../redux/slices/NoteSlice'
import { UserContext } from '../../context/UserContext'
import { useLazyGetCartByIdQuery, useGetCartsQuery, useLazyGetCartByUserQuery, useAddCartMutation } from '../../api/cartApi'

const NoteScreen = () => {
    const [title, setTitle] = useState<string>('')
    const [decs, setDecs] = useState<string>('')
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const dispatch = useAppDispatch()
    const notes = useAppSelector(noteSelector)
    const { selectedUser } = useContext(UserContext)
    const handleAddNote = () => {
        if (!title.trim() || !decs.trim()) {
            return
        }
        dispatch(addNote({ title, decs }))
        setTitle(''),
            setDecs('')
        // disable textInput 
        Keyboard.dismiss()
    }

    const { data, isLoading, error } = useGetCartsQuery();
    const [getCartById, { data: singleCartData, isFetching, error: singleCartError }] = useLazyGetCartByIdQuery()
    const [getCartByUser, { data: userSingleData, isFetching: userFatchnig, error: userError }] = useLazyGetCartByUserQuery()
    const [addCart, { data: AddCartData, isLoading: AddCartLoading, error: AddCartError, isSuccess }] = useAddCartMutation();
    if (isLoading || isFetching || AddCartLoading)
        return <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
            <ActivityIndicator size='large' color={'green'} />
        </View>
    console.log('singleCartssssssss', singleCartData, 'errr', singleCartError);
    console.log('AddCartData', AddCartData, isSuccess, AddCartError);

    if (error || singleCartError || AddCartError) return <Text>Error loading carts</Text>

    const handleCartById = (id: number) => {
        console.log('didddddddd', id);
        getCartById(id)
        getCartByUser(id)
    }

    const handleAddCart = async () => {
        // Alert.alert('aaaaaaaaaaaaaaaaaa')
        await addCart({
            userId: 1,
            products: [
                { id: 144, quantity: 4 },
                { id: 98, quantity: 1 },
            ],
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <TouchableOpacity >
                    <Text style={{ fontSize: 15, color: '#000', fontWeight: '600', borderWidth: 1, padding: scale(20), margin: moderateScale(5) }}>NoteScreen</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, color: '#000', fontWeight: '400' }}>{title}</Text>
                <TextInput placeholder='Enter title' value={title} onChangeText={(text) => setTitle(text)} style={{ borderWidth: 1, marginHorizontal: moderateScale(5), fontSize: 30 }} />
                <TextInput placeholder='Enter decs' value={decs} onChangeText={(text) => setDecs(text)} style={{ borderWidth: 1, marginHorizontal: moderateScale(5), fontSize: 30 }} />
                <TouchableOpacity onPress={handleAddNote}>
                    <Text style={{ fontSize: 15, color: '#000', fontWeight: '600', borderWidth: 1, padding: scale(20), margin: moderateScale(5) }}
                    >Add to Cart</Text>
                </TouchableOpacity>

                <FlatList data={notes} renderItem={({ item }: { item: Note }) => {
                    return (
                        <View>
                            <Text style={{ fontSize: 15, color: '#000', fontWeight: '600', borderWidth: 1, padding: scale(20), margin: moderateScale(5) }}>{item.title}</Text>
                            <Text style={{ fontSize: 15, color: '#000', fontWeight: '600', borderWidth: 1, padding: scale(20), margin: moderateScale(5) }}>{item.decs}</Text>
                        </View>
                    )
                }} />

                <Text style={{ fontSize: 15, color: '#000', fontWeight: '600', borderWidth: 1, padding: scale(20), margin: moderateScale(5) }}
                >{selectedUser?.firstName}</Text>

                <View >
                    {data?.carts?.map((cart: any) => {
                        return (
                            <Text key={cart.id} onPress={() => handleCartById(cart?.id)} style={{ paddingVertical: 5, borderWidth: 1, borderColor: '#000' }}>Cart ID: {cart.id}</Text>
                        )
                    })}
                </View>
                <TouchableOpacity onPress={handleAddCart} style={{ padding: 10, borderWidth: 1 }}>
                    <Text>Add Cart</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default NoteScreen