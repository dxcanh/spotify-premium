"use client";

import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";

interface HistoryContentProps {
    songs: Song[];
}

const HistoryContent: React.FC<HistoryContentProps> = ({
    songs
}) => {

    const onPlay = useOnPlay(songs);

    if (songs.length === 0) {
        return (
            <div
                className="
                    flex
                    flex-col
                    gap-y-2
                    w-full
                    px-6
                    text-neutral-400
                "    
            >
                No songs found.
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((song) => (
                <div
                    key={song.id}
                    className="flex items-center gap-x-4 w-full"
                >
                    <div className="flex-1">
                        <MediaItem 
                            onClick={(id:string) => onPlay(id)}
                            data={song} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HistoryContent;