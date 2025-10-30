import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
type UserContextType = {
    selectedUser: any | null;
    setSelectedUser: React.Dispatch<React.SetStateAction<any[]> | null>
};

// 2️⃣ Default context value
export const UserContext = createContext<UserContextType>({
    selectedUser: null,
    setSelectedUser: () => { }
});

export const HomUserProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedUser, setSelectedUser] = useState<any | null>(null);

    return (
        <UserContext.Provider value={{ selectedUser, setSelectedUser}}>
            {children}
        </UserContext.Provider>
    )
}


// import React, { createContext, useEffect, useState } from 'react';
// import { Alert } from 'react-native';
// type UserContextType = {
//     userData: any[];
//     setUserData: React.Dispatch<React.SetStateAction<any[]>>;
//     selectedUser: any | null;
//     setSelectedUser: React.Dispatch<React.SetStateAction<any[]> | null>
// };

// // 2️⃣ Default context value
// export const UserContext = createContext<UserContextType>({
//     userData: [],
//     setUserData: () => { },
//     selectedUser: null,
//     setSelectedUser: () => { }
// });

// export const HomUserProvider = ({ children }: { children: React.ReactNode }) => {
//     const [userData, setUserData] = useState<any[]>([]);
//     const [selectedUser, setSelectedUser] = useState<any | null>(null);
//     useEffect(() => {
//         let userDetails = async () => {
//             try {
//                 let res = await fetch('https://dummyjson.com/users')
//                 let newRes = await res.json()
//                 if (newRes) {
//                     setUserData(newRes.users)
//                     console.log('ddddddddd', newRes);
//                 } else {
//                     Alert.alert('', 'Wrong data')
//                 }
//             }
//             catch (err) {
//                 console.log('err', err)
//             }
//         }
//         userDetails()
//     }, [])

//     return (
//         <UserContext.Provider value={{
//             userData, setUserData, selectedUser,
//             setSelectedUser,
//         }}>
//             {children}
//         </UserContext.Provider>
//     )
// }