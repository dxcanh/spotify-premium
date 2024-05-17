import { Song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"

const getHistorySongsByUserId = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { 
        data: sessionData, 
        error: sessionError 
    } = await supabase.auth.getSession();

    if (sessionError) {
        console.log(sessionError.message);
        return [];
    }

    try {
        // Query songs for which there exists a record in history table with user_id of current user
        const { data: historyData, error: historyError } = await supabase
            .from('history')
            .select('song_id')
            .eq('user_id', sessionData.session?.user.id)
            .order('created_at', { ascending: true });

        if (historyError) {
            console.error("Error fetching history data:", historyError.message);
            return [];
        }

        // Extract song_ids from the history data
        const songIds = historyData?.map(item => item.song_id) || [];

        // Query songs using the extracted song_ids
        const { data, error } = await supabase
            .from('songs')
            .select('*')
            .in('id', songIds)
            .order('created_at', { ascending: true });

        if (error) {
            console.error("Error fetching history songs:", error.message);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Error fetching history songs:", (error as Error).message);
        return [];
    }
}

export default getHistorySongsByUserId;