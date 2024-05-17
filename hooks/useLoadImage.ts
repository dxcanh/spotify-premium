import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react"

const useLoadImage = (song: Song) => {
    const supabaseClient = useSupabaseClient();

    if (!song) {
        return null;
    }

    return song.image_path;
};

export default useLoadImage;