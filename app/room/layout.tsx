import type { ReactNode } from "react";
import RoomChatMount from "@/components/RoomChatMount";

export default function RoomLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <RoomChatMount />
    </>
  );
}
