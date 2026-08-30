"use client";

import { usePathname } from "next/navigation";
import RoomChat from "./RoomChat";

export default function RoomChatMount() {
  const pathname = usePathname();
  const match = pathname.match(/^\/room\/([A-Za-z0-9]{6})\/?$/);

  if (!match) return null;

  return <RoomChat code={match[1].toUpperCase()} />;
}
