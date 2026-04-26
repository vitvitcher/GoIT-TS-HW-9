import { nextServer } from "./api"
import type { Note, NoteBody } from "../../types/note"
import { User, UserCredentials } from "@/types/user"


interface FetchedData {
    notes: Note[],
    totalPages: number,
}

export const fetchNotes = async (search: string, page: number, tag?: string) => {
    const results: FetchedData = (await nextServer.get<FetchedData>('/notes', {
        params: {
            search,
            page,
            tag
        }
    })).data
    return results
}

export const createNote = async (body: NoteBody) => {
    return (await nextServer.post<Note>('/notes', body)).data
}

export const deleteNote = async (id: string) => {
    return (await nextServer.delete<Note>(`/notes/${id}`,)).data
}

export const fetchNoteById = async (id: string) => {
    return (await nextServer.get<Note>(`/notes/${id}`)).data
}

export const register = async (registrationData: UserCredentials) => {
    return (await nextServer.post<User>('/auth/register', registrationData)).data
}
export const login = async (loginData: UserCredentials) => {
    return (await nextServer.post<User>('/auth/login', loginData)).data
}
export const logout = async () => {
    return (await nextServer.post('/auth/logout')).data
}
export const checkSession = async () => {
    return (await nextServer.get('/auth/session')).data
}
export const getMe = async () => {
    return (await nextServer.get<User>('/users/me'))?.data
}
export const updateMe = async (username: string) => {
    return (await nextServer.patch('/users/me', { username })).data
}