'use client'

//import { Metadata } from "next";
import css from "./ProfilePage.module.css"
import Image from 'next/image';
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";

// export const metadata: Metadata = {
//     title: "NoteHub profile",
//     description: "NoteHub Profile page.",
//     openGraph: {
//         title: `NoteHub profile`,
//         description: "NoteHub Profile page.",
//         url: `https://notehub.com/profile`,
//         images: [
//             {
//                 url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
//                 width: 1200,
//                 height: 630,
//                 alt: 'NoteHub Logo',
//             },
//         ],
//     },
// };

function Profile() {

    const { isAuthenticated, user } = useAuthStore();

    return (isAuthenticated &&
        <div>
            <main className={css.mainContent}>
                <div className={css.profileCard}>
                    <div className={css.header}>
                        <h1 className={css.formTitle}>Profile Page</h1>
                        <Link href="/profile/edit" className={css.editProfileButton}>
                            Edit Profile
                        </Link>
                    </div>
                    {user?.avatar && <div className={css.avatarWrapper}>
                        <Image src={user.avatar}
                            alt="User Avatar"
                            width={120}
                            height={120}
                            className={css.avatar} />
                    </div>}
                    <div className={css.profileInfo}>
                        <p>
                            Username:{user?.username}
                        </p>
                        <p>
                            Email: {user?.email}
                        </p>
                    </div>
                </div>
            </main>
        </div>)
}

export default Profile