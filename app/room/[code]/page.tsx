import type { Metadata } from "next";
import RoomWaitingClient from "@/components/RoomWaitingClient";
import { normalizeRoomCode } from "@/lib/roomSession";

export const metadata: Metadata = {
  title: "Private Couple Room",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code: rawCode } = await params;
  const code = normalizeRoomCode(rawCode);

  return (
    <main className="game-page">
      <div className="container room-page-wrap">
        <RoomWaitingClient code={code} />
      </div>
    </main>
  );
}
