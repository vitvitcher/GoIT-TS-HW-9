'use client'

import { getMe, updateMe } from "@/lib/api/clientApi"
import css from "./EditProfilePage.module.css"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/lib/store/authStore"

function EditProfilePage() {
    const router = useRouter()
    type FormProps = {
        username: string
    }
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const store = useAuthStore()



    useEffect(() => {
        const getUserInfo = async () => {
            const userInfo = await getMe()
            setUsername(userInfo.username)
            setEmail(userInfo.email)
            setAvatar(userInfo.avatar)
        }
        getUserInfo()
    }, [])
    const handleSubmit = async (FormData: FormData) => {
        try {
            const body = Object.fromEntries(FormData) as FormProps;
            const res = await updateMe(body.username)
            if (res) {
                setUsername(body.username)
                store.setUser(res)
                router.push('/profile')
            }

        } catch (error) {
            console.log(error)
        }


    }

    return (<div>
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image src={avatar}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form className={css.profileInfo}
                    action={handleSubmit}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input id="username"
                            type="text"
                            className={css.input}
                            value={username}
                        />
                    </div>

                    <p>Email: {email}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button type="button" className={css.cancelButton}
                            onClick={() => router.back()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>)
}

export default EditProfilePage