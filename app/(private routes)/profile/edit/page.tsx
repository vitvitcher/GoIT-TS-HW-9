'use client'

import { getMe, updateMe } from "@/lib/api/clientApi"
import css from "./EditProfilePage.module.css"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function EditProfilePage() {
    const router = useRouter()
    type FormProps = {
        username: string
    }
    const [username, setUername] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')



    useEffect(() => {
        const getUserInfo = async () => {
            const userInfo = await getMe()
            setUername(userInfo.username)
            setEmail(userInfo.email)
            setAvatar(userInfo.avatar)
        }
        getUserInfo()
    }, [username, email, avatar])
    const handleSubmit = async (FormData: FormData) => {
        try {
            const body = Object.fromEntries(FormData) as FormProps;
            await updateMe(body.username)
            router.push('/profile')
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
                            defaultValue={username}
                        />
                    </div>

                    <p>Email: {email}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button type="button" className={css.cancelButton}
                            onClick={() => router.push('/profile')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>)
}

export default EditProfilePage