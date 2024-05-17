import { Song } from "@/types";

import usePlayer from "./usePlayer";
import useSubscribeModal from "./useSubscribeModal";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import { SupabaseClient } from "@supabase/supabase-js";
import { useSessionContext } from "@supabase/auth-helpers-react";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const subscribeModal = useSubscribeModal();
    const authModal = useAuthModal();
    const { subscription, user } = useUser();
    const { supabaseClient } = useSessionContext();
    
    const onPlay = async (id: string) => {
    	if (!user) {
    		return authModal.onOpen();
    	}
  
      	if (supabaseClient) {
        	const timestamp = new Date().toISOString();
        
        	try {
				const { data: userHistory, error } = await supabaseClient
					.from("history")
					.select("id")
					.eq("user_id", user.id)
					.order("created_at", { ascending: false })
					.range(0, 9); // Limit to 10 most recent entries
					
				if (error) {
					console.error("Error fetching user history:", error.message);
				} else {
					const idsToDelete = userHistory.slice(9).map(entry => entry.id);
					if (idsToDelete.length > 0) {
						await supabaseClient
							.from("history")
							.delete()
							.in("id", idsToDelete);
					}
				}

            await supabaseClient
                .from("history")
                .insert([{ 
                    user_id: user.id, // Assuming user has an id property
                    song_id: id,
                    created_at: timestamp 
                }]);
            
			} catch (error) {
				console.error("Error inserting into history table:", (error as Error).message);
				// Handle error if needed
        	}
		} else {
			console.error("Supabase client is not initialized.");
			// Handle error if Supabase client is not available
		}
  
		player.setId(id);
		player.setIds(songs.map((song) => song.id));
  	};
    return onPlay;
};

export default useOnPlay;