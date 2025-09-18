import { Loader2, Music } from "lucide-react";
import { headers } from "next/headers";
import { Suspense } from "react";
import { getPresignedUrl } from "~/actions/generation";
import { SongPanel2 } from "~/components/create/song-panel2";
import TrackListFetcher from "~/components/create/track-list-fetcher";
import { SongCard } from "~/components/home/song-card";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";

export default async function MainPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  }).catch(() => null);

  const songs = await db.song.findMany({
    where: { published: true }, // guests always see published
    include: {
      user: { select: { name: true } },
      _count: { select: { likes: true } },
      categories: true,
      likes: session?.user ? true : false, // only fetch likes if logged in
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const songsWithUrls = await Promise.all(
    songs.map(async (song) => {
      const thumbnailUrl = song.thumbnailS3Key
        ? await getPresignedUrl(song.thumbnailS3Key)
        : null;
      return { ...song, thumbnailUrl };
    }),
  );

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const trendingSongs = songsWithUrls
    .filter((song) => song.createdAt >= twoDaysAgo)
    .slice(0, 10);

  const trendingSongIds = new Set(trendingSongs.map((song) => song.id));

  const categorizedSongs = songsWithUrls
    .filter(
      (song) => !trendingSongIds.has(song.id) && song.categories.length > 0,
    )
    .reduce(
      (acc, song) => {
        const primaryCategory = song.categories[0];
        if (primaryCategory) {
          acc[primaryCategory.name] ??= [];
          if (acc[primaryCategory.name]!.length < 10) {
            acc[primaryCategory.name]!.push(song);
          }
        }
        return acc;
      },
      {} as Record<string, Array<(typeof songsWithUrls)[number]>>,
    );

  if (trendingSongs.length === 0 && Object.keys(categorizedSongs).length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4 text-center">
        <Music className="text-muted-foreground h-20 w-20" />
        <h1 className="mt-4 text-2xl font-bold tracking-tight">No Music Here</h1>
        <p className="text-muted-foreground mt-2">
          There are no published songs available right now. Check back later!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-full flex-col lg:flex-row">
        <SongPanel2 />
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          }
        >
          <TrackListFetcher />
        </Suspense>
      </div>
      <div className="p-4">
        <h1 className="text-3xl font-bold tracking-tight">Discover Music</h1>

        {trendingSongs.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Trending</h2>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {trendingSongs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        )}

        {Object.entries(categorizedSongs)
          .slice(0, 5)
          .map(([category, songs]) => (
            <div key={category} className="mt-6">
              <h2 className="text-xl font-semibold">{category}</h2>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {songs.map((song) => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
