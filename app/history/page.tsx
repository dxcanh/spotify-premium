import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import HistoryContent from "./components/HistoryContent";
import getHistorySongsByUserId from "@/actions/getHistorySongsByUserId";

const History = async () => {
    const songs = await getHistorySongsByUserId();

    return (
        <div
            className="
                bg-neutral-900
                rounded-lg
                h-full
                w-full
                overflow-hidden
                overflow-y-auto
            "
        >
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        History
                    </h1>
                    {/* <HistoryInput /> */}
                </div>
            </Header>
            <HistoryContent songs={songs} />
        </div>
    )
};

export default History;