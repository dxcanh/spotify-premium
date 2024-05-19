"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadUploadSongUrl from "@/hooks/useLoadUploadSongUrl";
import useUploadSongById from "@/hooks/useGetUploadSongById";

import PlayerContent from "./PlayerContent";

const UploadPlayer = () => {
  const player = usePlayer();
  const { song } = useUploadSongById(player.activeId);

  const songUrl = useLoadUploadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
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
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
}

export default UploadPlayer;