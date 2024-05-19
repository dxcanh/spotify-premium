"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSongById from "@/hooks/useGetSongById";
import UploadPlayerContent from "./UploadPlayerContent";
import PlayerContent from "./PlayerContent";
import useLoadUploadSongUrl from "@/hooks/useLoadUploadSongUrl";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadUploadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }
  if(song.type == 'host')  {
    const songUrl = useLoadSongUrl(song!);
    return (
      <div 
        className="
          fixed 
          bottom-0 
          bg-black 
          w-full 
          py-2 
          h-[80px] 
          px-4
        "
      >
        <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
      </div>
    );
  }
  return (
    <div 
      className="
        fixed 
        bottom-0 
        bg-black 
        w-full 
        py-2 
        h-[80px] 
        px-4
      "
    >
      <UploadPlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
}

export default Player;