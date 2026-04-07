import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
    searchParams: { query: string; currentPage: number }
};

const NotesPage = async ({ searchParams }: Props) => {
    const { query, currentPage } = searchParams;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['notes', query, currentPage],
        queryFn: () => fetchNotes(query ? query : "", currentPage ? currentPage : 1)
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
    );
};

export default NotesPage;
