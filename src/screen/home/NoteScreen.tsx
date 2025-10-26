import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList, Keyboard } from 'react-native'
import { moderateScale, scale } from 'react-native-size-matters'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addNote, noteSelector, Note } from '../../redux/slices/NoteSlice'

const NoteScreen = () => {
    const [title, setTitle] = useState<string>('')
    const [decs, setDecs] = useState<string>('')
    const dispatch = useAppDispatch()
    const notes = useAppSelector(noteSelector)
    console.log('notsssssssssss', notes)

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
    
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity >
                <Text style={{ fontSize: 15, color: '#000', fontWeight: '600', borderWidth: 1, padding: scale(20), margin: moderateScale(5) }}>NoteScreen</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, color: '#000', fontWeight: '400' }}>{title}</Text>
            <TextInput placeholder='Enter title' value={title} onChangeText={(text) => setTitle(text)} style={{ borderWidth: 1, marginHorizontal: moderateScale(5), fontSize: 30 }} />
            <TextInput placeholder='Enter decs' value={decs} onChangeText={(text) => setDecs(text)} style={{ borderWidth: 1, marginHorizontal: moderateScale(5), fontSize: 30 }} />
            {/* <TouchableOpacity onPress={() => { dispatch(addNote({ title, decs })) }}> */}
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
        </View>
    )
}

export default NoteScreen