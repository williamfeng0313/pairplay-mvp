"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  RealtimeChannel,
} from "@supabase/supabase-js";

import {
  getSupabaseBrowserClient,
} from "@/lib/supabaseBrowser";

import {
  trackEvent,
} from "@/lib/analytics";

import styles from "./RoomChat.module.css";

type Role = "host" | "guest";

type RealtimeSession = {
  ok: true;
  topic: string;
  role: Role;
  expiresAt: string;
};

type ChatMessage = {
  id: string;
  sender: "me" | "partner";
  text: string;
  createdAt: number;
};

type BroadcastPayload = {
  id?: unknown;
  text?: unknown;
  role?: unknown;
  clientId?: unknown;
  sentAt?: unknown;
};

type PresenceItem = {
  role?: string;
  clientId?: string;
};

const MAX_MESSAGE_LENGTH = 300;

const MIN_SEND_INTERVAL_MS = 800;

const MAX_MESSAGES_PER_MINUTE = 30;

const MAX_LOCAL_MESSAGES = 80;

const SESSION_POLL_MS = 2000;


/* =========================================================
   Client ID
========================================================= */

function createClientId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}


/* =========================================================
   Normalize Incoming Realtime Message
========================================================= */

function normalizeIncomingMessage(
  payload: BroadcastPayload,
  ownClientId: string
): ChatMessage | null {
  if (
    typeof payload.text !== "string" ||
    typeof payload.id !== "string" ||
    typeof payload.clientId !== "string"
  ) {
    return null;
  }

  /*
   * Ignore messages sent by this same browser.
   */
  if (
    payload.clientId === ownClientId
  ) {
    return null;
  }

  const text =
    payload.text
      .trim()
      .slice(
        0,
        MAX_MESSAGE_LENGTH
      );

  if (!text) {
    return null;
  }

  return {
    id: payload.id,

    sender:
      "partner",

    text,

    createdAt:
      typeof payload.sentAt ===
      "number"
        ? payload.sentAt
        : Date.now(),
  };
}


/* =========================================================
   Room Chat
========================================================= */

export default function RoomChat({
  code,
}: {
  code: string;
}) {
  const normalizedCode =
    code
      .trim()
      .toUpperCase();


  /* =======================================================
     State
  ======================================================= */

  const [
    session,
    setSession,
  ] =
    useState<RealtimeSession | null>(
      null
    );

  const [
    connected,
    setConnected,
  ] =
    useState(false);

  const [
    partnerOnline,
    setPartnerOnline,
  ] =
    useState(false);

  const [
    isOpen,
    setIsOpen,
  ] =
    useState(false);

  const [
    unread,
    setUnread,
  ] =
    useState(0);

  const [
    messages,
    setMessages,
  ] =
    useState<ChatMessage[]>([]);

  const [
    input,
    setInput,
  ] =
    useState("");

  const [
    sendError,
    setSendError,
  ] =
    useState("");


  /* =======================================================
     Refs
  ======================================================= */

  const channelRef =
    useRef<RealtimeChannel | null>(
      null
    );

  const clientIdRef =
    useRef(
      createClientId()
    );

  const lastSentAtRef =
    useRef(0);

  const sendTimesRef =
    useRef<number[]>([]);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const isOpenRef =
    useRef(false);

  const trackedOpenRef =
    useRef(false);


  /* =======================================================
     Keep isOpen ref synchronized
  ======================================================= */

  useEffect(() => {
    isOpenRef.current =
      isOpen;

    if (isOpen) {
      setUnread(0);

      window.setTimeout(
        () => {
          messagesEndRef.current?.scrollIntoView(
            {
              behavior:
                "smooth",
            }
          );
        },
        50
      );
    }
  }, [isOpen]);


  /* =======================================================
     Load Realtime Session

     Server validates the existing HttpOnly room cookie.

     Host may receive 409 while waiting for Guest.
     In that case we keep retrying every 2 seconds.
  ======================================================= */

  useEffect(() => {
    let cancelled =
      false;

    let timer:
      | ReturnType<
          typeof setTimeout
        >
      | null =
      null;


    async function loadSession() {
      if (cancelled) {
        return;
      }

      try {
        const response =
          await fetch(
            `/api/rooms/realtime-session?code=${encodeURIComponent(
              normalizedCode
            )}`,
            {
              method:
                "GET",

              cache:
                "no-store",

              credentials:
                "same-origin",
            }
          );


        /*
         * Host is still waiting for partner.
         */
        if (
          response.status ===
          409
        ) {
          timer =
            setTimeout(
              loadSession,
              SESSION_POLL_MS
            );

          return;
        }


        /*
         * Invalid / expired room etc.
         */
        if (
          !response.ok
        ) {
          return;
        }


        const data =
          (await response.json()) as
            RealtimeSession;


        if (
          !cancelled &&
          data.ok &&
          data.topic &&
          data.role
        ) {
          setSession(
            data
          );
        }

      } catch (error) {
        console.error(
          "room chat session error",
          error
        );

        timer =
          setTimeout(
            loadSession,
            SESSION_POLL_MS
          );
      }
    }


    loadSession();


    return () => {
      cancelled =
        true;

      if (timer) {
        clearTimeout(
          timer
        );
      }
    };
  }, [normalizedCode]);


  /* =======================================================
     Supabase Realtime

     Broadcast:
     Chat messages

     Presence:
     Partner online status

     Messages only live in React state.
     Nothing is written to chat_messages / Postgres.
  ======================================================= */

  useEffect(() => {
    if (!session) {
      return;
    }


    /*
     * IMPORTANT:
     *
     * Capture values AFTER confirming session exists.
     *
     * Realtime callbacks execute asynchronously later.
     * Using these local constants prevents TypeScript from
     * treating session as possibly null inside callbacks.
     */
    const sessionRole =
      session.role;

    const sessionTopic =
      session.topic;


    let disposed =
      false;


    try {
      const supabase =
        getSupabaseBrowserClient();


      const clientId =
        clientIdRef.current;


      const channel =
        supabase.channel(
          sessionTopic,
          {
            config: {
              broadcast: {
                self:
                  false,

                ack:
                  true,
              },

              presence: {
                key:
                  `${sessionRole}-${clientId}`,
              },
            },
          }
        );


      channelRef.current =
        channel;


      /* ===================================================
         Presence Helper
      =================================================== */

      function updatePresence() {
        const state =
          channel.presenceState() as Record<
            string,
            PresenceItem[]
          >;


        const presences =
          Object.values(
            state
          ).flat();


        const partnerIsOnline =
          presences.some(
            (presence) =>
              Boolean(
                presence.role
              ) &&
              presence.role !==
                sessionRole
          );


        setPartnerOnline(
          partnerIsOnline
        );
      }


      /* ===================================================
         Subscribe
      =================================================== */

      channel
        .on(
          "broadcast",
          {
            event:
              "chat-message",
          },
          (event) => {
            const payload =
              event.payload as
                BroadcastPayload;


            const message =
              normalizeIncomingMessage(
                payload,
                clientId
              );


            if (
              !message
            ) {
              return;
            }


            setMessages(
              (current) => [
                ...current.slice(
                  -(
                    MAX_LOCAL_MESSAGES -
                    1
                  )
                ),

                message,
              ]
            );


            if (
              !isOpenRef.current
            ) {
              setUnread(
                (current) =>
                  current + 1
              );
            }
          }
        )

        .on(
          "presence",
          {
            event:
              "sync",
          },
          updatePresence
        )

        .on(
          "presence",
          {
            event:
              "join",
          },
          updatePresence
        )

        .on(
          "presence",
          {
            event:
              "leave",
          },
          updatePresence
        )

        .subscribe(
          async (
            status
          ) => {
            if (
              disposed
            ) {
              return;
            }


            if (
              status ===
              "SUBSCRIBED"
            ) {
              setConnected(
                true
              );


              await channel.track(
                {
                  role:
                    sessionRole,

                  clientId,

                  onlineAt:
                    new Date()
                      .toISOString(),
                }
              );


              updatePresence();

              return;
            }


            if (
              status ===
                "CHANNEL_ERROR" ||
              status ===
                "TIMED_OUT" ||
              status ===
                "CLOSED"
            ) {
              setConnected(
                false
              );

              setPartnerOnline(
                false
              );
            }
          }
        );


      /* ===================================================
         Cleanup
      =================================================== */

      return () => {
        disposed =
          true;


        setConnected(
          false
        );

        setPartnerOnline(
          false
        );


        channel
          .untrack()
          .catch(
            () => null
          );


        supabase
          .removeChannel(
            channel
          )
          .catch(
            () => null
          );


        channelRef.current =
          null;
      };

    } catch (error) {
      console.error(
        "room chat realtime error",
        error
      );


      setConnected(
        false
      );

      setPartnerOnline(
        false
      );
    }

  }, [session]);


  /* =======================================================
     Room Expiration

     Clear current chat when the Room expires.
  ======================================================= */

  useEffect(() => {
    if (!session) {
      return;
    }


    const expiresAt =
      new Date(
        session.expiresAt
      ).getTime();


    const remaining =
      expiresAt -
      Date.now();


    if (
      remaining <= 0
    ) {
      setSession(
        null
      );

      setMessages(
        []
      );

      setIsOpen(
        false
      );

      return;
    }


    const timer =
      window.setTimeout(
        () => {
          setSession(
            null
          );

          setMessages(
            []
          );

          setIsOpen(
            false
          );
        },
        remaining
      );


    return () => {
      window.clearTimeout(
        timer
      );
    };

  }, [session]);


  /* =======================================================
     Scroll to newest message
  ======================================================= */

  useEffect(() => {
    if (!isOpen) {
      return;
    }


    messagesEndRef.current?.scrollIntoView(
      {
        behavior:
          "smooth",
      }
    );

  }, [
    messages,
    isOpen,
  ]);


  /* =======================================================
     Open / Close Chat
  ======================================================= */

  function toggleChat() {
    setIsOpen(
      (current) =>
        !current
    );


    /*
     * Track first Chat open only once per page lifecycle.
     *
     * No Room Code / Topic / Message content is sent.
     */
    if (
      !trackedOpenRef.current
    ) {
      trackedOpenRef.current =
        true;


      trackEvent(
        "room_chat_open",
        {}
      );
    }
  }


  /* =======================================================
     Send Message
  ======================================================= */

  async function sendMessage(
    event?: FormEvent
  ) {
    event?.preventDefault();


    setSendError(
      ""
    );


    const channel =
      channelRef.current;


    if (
      !session ||
      !channel ||
      !connected
    ) {
      setSendError(
        "Chat is reconnecting. Try again in a moment."
      );

      return;
    }


    const text =
      input
        .trim()
        .slice(
          0,
          MAX_MESSAGE_LENGTH
        );


    if (!text) {
      return;
    }


    const now =
      Date.now();


    /* =====================================================
       Minimum delay between messages
    ===================================================== */

    if (
      now -
        lastSentAtRef.current <
      MIN_SEND_INTERVAL_MS
    ) {
      setSendError(
        "You're sending messages too quickly."
      );

      return;
    }


    /* =====================================================
       Client-side messages/minute protection
    ===================================================== */

    sendTimesRef.current =
      sendTimesRef.current.filter(
        (
          timestamp
        ) =>
          now -
            timestamp <
          60_000
      );


    if (
      sendTimesRef.current
        .length >=
      MAX_MESSAGES_PER_MINUTE
    ) {
      setSendError(
        "You've sent a lot of messages. Please wait a moment."
      );

      return;
    }


    const id =
      createClientId();


    const outgoing = {
      id,

      text,

      role:
        session.role,

      clientId:
        clientIdRef.current,

      sentAt:
        now,
    };


    lastSentAtRef.current =
      now;


    sendTimesRef.current.push(
      now
    );


    /* =====================================================
       Show own message immediately
    ===================================================== */

    setMessages(
      (current) => [
        ...current.slice(
          -(
            MAX_LOCAL_MESSAGES -
            1
          )
        ),

        {
          id,

          sender:
            "me",

          text,

          createdAt:
            now,
        },
      ]
    );


    setInput(
      ""
    );


    /* =====================================================
       Realtime Broadcast
    ===================================================== */

    try {
      const result =
        await channel.send(
          {
            type:
              "broadcast",

            event:
              "chat-message",

            payload:
              outgoing,
          }
        );


      if (
        result !==
        "ok"
      ) {
        throw new Error(
          `Realtime send result: ${result}`
        );
      }


      /*
       * Analytics records only that a message was sent.
       * Never send message text to GA4.
       */
      trackEvent(
        "room_chat_send",
        {}
      );

    } catch (error) {
      console.error(
        "room chat send error",
        error
      );


      setSendError(
        "Message may not have been delivered. Please try again."
      );
    }
  }


  /* =======================================================
     Chat is hidden until both participants have joined
  ======================================================= */

  if (!session) {
    return null;
  }


  /* =======================================================
     Render
  ======================================================= */

  return (
    <>
      {isOpen && (
        <section
          className={
            styles.panel
          }
          aria-label="Room chat"
        >
          {/* ===============================================
              Header
          =============================================== */}

          <header
            className={
              styles.header
            }
          >
            <div>
              <div
                className={
                  styles.titleRow
                }
              >
                <strong>
                  💬 Chat
                </strong>


                <span
                  className={
                    partnerOnline
                      ? styles.online
                      : styles.offline
                  }
                >
                  <span
                    className={
                      styles.statusDot
                    }
                  />


                  {partnerOnline
                    ? "Partner online"
                    : connected
                    ? "Waiting for partner"
                    : "Reconnecting"}
                </span>
              </div>


              <p
                className={
                  styles.privacyNote
                }
              >
                Live only · chat
                history is not
                saved.
              </p>
            </div>


            <button
              type="button"
              className={
                styles.closeButton
              }
              onClick={() =>
                setIsOpen(
                  false
                )
              }
              aria-label="Close chat"
            >
              ×
            </button>
          </header>


          {/* ===============================================
              Messages
          =============================================== */}

          <div
            className={
              styles.messages
            }
            aria-live="polite"
          >
            {messages.length ===
            0 ? (
              <div
                className={
                  styles.emptyState
                }
              >
                <div
                  className={
                    styles.emptyIcon
                  }
                >
                  💛
                </div>


                <strong>
                  Talk while you
                  play
                </strong>


                <p>
                  Messages only
                  live in this
                  session and
                  disappear when
                  you refresh or
                  leave the room.
                </p>
              </div>
            ) : (
              messages.map(
                (
                  message
                ) => (
                  <div
                    key={
                      message.id
                    }
                    className={
                      message.sender ===
                      "me"
                        ? styles.myMessageRow
                        : styles.partnerMessageRow
                    }
                  >
                    <div
                      className={
                        message.sender ===
                        "me"
                          ? styles.myMessage
                          : styles.partnerMessage
                      }
                    >
                      {
                        message.text
                      }
                    </div>
                  </div>
                )
              )
            )}


            <div
              ref={
                messagesEndRef
              }
            />
          </div>


          {/* ===============================================
              Input
          =============================================== */}

          <form
            className={
              styles.form
            }
            onSubmit={
              sendMessage
            }
          >
            {sendError && (
              <p
                className={
                  styles.error
                }
              >
                {sendError}
              </p>
            )}


            <div
              className={
                styles.inputRow
              }
            >
              <input
                type="text"

                value={
                  input
                }

                onChange={(
                  event
                ) => {
                  setInput(
                    event.target
                      .value
                  );


                  if (
                    sendError
                  ) {
                    setSendError(
                      ""
                    );
                  }
                }}

                maxLength={
                  MAX_MESSAGE_LENGTH
                }

                placeholder={
                  connected
                    ? "Message your partner..."
                    : "Reconnecting..."
                }

                disabled={
                  !connected
                }

                className={
                  styles.input
                }

                aria-label="Chat message"

                autoComplete="off"
              />


              <button
                type="submit"

                className={
                  styles.sendButton
                }

                disabled={
                  !connected ||
                  !input.trim()
                }
              >
                Send
              </button>
            </div>


            <div
              className={
                styles.counter
              }
            >
              {input.length}/
              {
                MAX_MESSAGE_LENGTH
              }
            </div>
          </form>
        </section>
      )}


      {/* ===================================================
          Floating Chat Button
      =================================================== */}

      <button
        type="button"

        className={
          styles.floatingButton
        }

        onClick={
          toggleChat
        }

        aria-expanded={
          isOpen
        }

        aria-label={
          isOpen
            ? "Close room chat"
            : "Open room chat"
        }
      >
        <span>
          💬{" "}
          {isOpen
            ? "Close"
            : "Chat"}
        </span>


        {!isOpen &&
          unread > 0 && (
            <span
              className={
                styles.unreadBadge
              }
            >
              {unread > 9
                ? "9+"
                : unread}
            </span>
          )}


        {!isOpen &&
          unread === 0 && (
            <span
              className={
                partnerOnline
                  ? styles.buttonOnlineDot
                  : styles.buttonOfflineDot
              }
              aria-hidden="true"
            />
          )}
      </button>
    </>
  );
}