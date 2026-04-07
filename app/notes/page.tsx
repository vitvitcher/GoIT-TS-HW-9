import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteClient from "./Notes.client";

type Props = {
    params: { query: string; currentPage: number }
};

const NotesPage = async ({ params }: Props) => {
    const { query, currentPage } = params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['notes', query, currentPage],
        queryFn: () => fetchNotes(query ? query : "", currentPage ? currentPage : 1)
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteClient />
        </HydrationBoundary>
    );
};

export default NotesPage;
