import type { Metadata } from "next";
import RoomWaitingClient from "@/components/RoomWaitingClient";

export const metadata: Metadata = {
  title: "Private Couple Room",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RoomPage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { code } = await params;
  const { token = "" } = await searchParams;

  return (
    <main className="game-page">
      <div className="container room-page-wrap">
        <RoomWaitingClient code={code.toUpperCase()} token={token} />
      </div>
    </main>
  );
}
