import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteClient from "./Notes.client";

type Props = {
    params: Promise<{
        query: string,
        currentPage: number
    }>;
};

const NoteDetails = async ({ params }: Props) => {
    const { query, currentPage } = await params;
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

export default NoteDetails;
