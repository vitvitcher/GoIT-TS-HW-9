"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import css from './NotePreview.module.css'
import Modal from "@/components/Modal/Modal";

const NotePreviewClient = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const handleGoBack = () => router.back();

    const { data: note, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>;

    if (error || !note) return <p>Something went wrong.</p>;

    const formattedDate = note.updatedAt
        ? `Updated at: ${note.updatedAt}`
        : `Created at: ${note.createdAt}`;

    return (
        <Modal onClose={handleGoBack}>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{note.title}</h2>
                    </div>
                    <p className={css.tag}>{note.tag}</p>
                    <p className={css.content}>{note.content}</p>
                    <p className={css.date}>{formattedDate}</p>
                    <button onClick={handleGoBack}>Back</button>
                </div>
            </div>
        </Modal>
    );
}

export default NotePreviewClient