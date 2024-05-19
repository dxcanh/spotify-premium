import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
const useLoadUploadSongUrl = (song: Song) => {
    const supabaseClient = useSupabaseClient()

    if (!song) {
      return ""
    }
  
    const { data: songData } = supabaseClient.storage.from("upload_songs").getPublicUrl(song.song_path)
  
    return songData.publicUrl
  }

export default useLoadUploadSongUrl;