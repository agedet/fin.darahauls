// 'use client';

// import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';

// interface AuthContextType {
//     user: {
//         email: string;
//         firstName: string;
//         lastName: string;
//         phoneNumber: string;
//         dob: string;
//         country: string;
//         emailVerified: boolean;
//         userRole: 'user' | 'rider' | 'manager' | 'admin';
//     } | null;
//     loading: boolean;
//     error: string | null;
// }

// const AuthContext = createContext<AuthContextType>({
//     user: null,
//     loading: true,
//     error: null,
// });

// export const Authprovider = ({ children }: { children: ReactNode }) => {
//     // const { data: session, status} = useSession();
//     // const [user, setUser] = useState<AuthContextType["user"]>(null);
//     // const [loading, setLoading] = useState(true);
//     // const [error, setError] = useState<string | null>(null);


//     // useEffect(() => {
//     //     setUser();

//     // }, [session, status]);

//     return (
//         <AuthContext.Provider value={{ user, loading, error }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

