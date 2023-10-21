const { createContext, useState, useEffect } = require("react");

export const UserContext=createContext({});

export function UserContextProvider({children}){
    const[user,setUser]=useState(null);
    //     useEffect(()=>{
    //     if(!user){
    //         axios.get('/profile');
    //     }
    // },[]);
    return(
        <UserContext.Provider value={{user,setUser}} >
            {children}
        </UserContext.Provider>
    );
}

//      const[user,setUser]=useState(null);

//     useEffect(()=>{
//         if(!user){
//             axios.get('/profile');
//         }
//     },[]);
//     return(
//         <UserContext.Provider value={{user,setUser}}>
//             {children}
//         </UserContext.Provider>
//     )
// }