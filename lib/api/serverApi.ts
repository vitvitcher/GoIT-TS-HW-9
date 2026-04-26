import { cookies } from 'next/headers';
import { nextServer } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';

export const fetchNotes = async (search: string, page: number, tag?: string) => {
    const cookieStore = await cookies();
    const res = await nextServer.get('/notes', {
        headers: {
            Cookie: cookieStore.toString(),
        },
        params: {
            search,
            page,
            tag
        }
    });
    return res.data
}

export const fetchNoteById = async (id: string) => {
    const cookieStore = await cookies();
    const res = await nextServer.get<Note>(`/notes/${id}`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
        params: {
            id
        }
    });
    return res.data
}

export const getMe = async (): Promise<User> => {
    const cookieStore = await cookies();
    const res = await nextServer.get('/users/me', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return res.data
}

export const checkSession = async () => {
    const cookieStore = await cookies();
    const res = await nextServer.get('/auth/session', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return res;
};
