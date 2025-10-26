import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'

export interface Note {
    title :string,
    decs :string
}

const initialState : Array<Note> = []

export const noteSlice = createSlice({
    name:'notes',
    initialState,
    reducers:{
        addNote(state, actions:PayloadAction<Note>){
            state.push(actions.payload)
        }
    }
})

export const {addNote} = noteSlice.actions
export const noteSelector = (state:RootState) => state.notes
export default noteSlice.reducer