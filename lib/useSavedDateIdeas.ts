"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY =
  "twolumi_saved_date_ideas_v1";

const CHANGE_EVENT =
  "twolumi:saved-date-ideas-changed";


/* =========================================================
   Read
========================================================= */

function readSavedIds():
  string[] {
  if (
    typeof window ===
    "undefined"
  ) {
    return [];
  }

  try {
    const raw =
      window.localStorage.getItem(
        STORAGE_KEY
      );

    if (!raw) {
      return [];
    }

    const parsed =
      JSON.parse(raw);

    if (
      !Array.isArray(parsed)
    ) {
      return [];
    }

    return Array.from(
      new Set(
        parsed.filter(
          (
            item
          ): item is string =>
            typeof item ===
              "string" &&
            item.length > 0
        )
      )
    );
  } catch {
    return [];
  }
}


/* =========================================================
   Write
========================================================= */

function writeSavedIds(
  ids: string[]
) {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(ids)
    );

    /*
     * storage event only fires in
     * other tabs.
     *
     * This custom event keeps every
     * Save button on the current page
     * synchronized immediately.
     */
    window.dispatchEvent(
      new Event(
        CHANGE_EVENT
      )
    );
  } catch {
    /*
     * localStorage can fail when
     * storage is blocked/full.
     *
     * Saving is an enhancement,
     * so don't break the page.
     */
  }
}


/* =========================================================
   Hook
========================================================= */

export function useSavedDateIdeas() {
  const [
    savedIds,
    setSavedIds,
  ] =
    useState<string[]>(
      []
    );

  const [
    hydrated,
    setHydrated,
  ] =
    useState(false);


  /* =======================================================
     Initial Load + Synchronization
  ======================================================= */

  useEffect(() => {
    const sync =
      () => {
        setSavedIds(
          readSavedIds()
        );
      };

    sync();

    setHydrated(
      true
    );

    window.addEventListener(
      CHANGE_EVENT,
      sync
    );

    window.addEventListener(
      "storage",
      sync
    );

    return () => {
      window.removeEventListener(
        CHANGE_EVENT,
        sync
      );

      window.removeEventListener(
        "storage",
        sync
      );
    };
  }, []);


  /* =======================================================
     Saved Set
  ======================================================= */

  const savedSet =
    useMemo(
      () =>
        new Set(
          savedIds
        ),
      [
        savedIds,
      ]
    );


  /* =======================================================
     Is Saved
  ======================================================= */

  const isSaved =
    useCallback(
      (
        ideaId:
          string
      ) =>
        savedSet.has(
          ideaId
        ),
      [
        savedSet,
      ]
    );


  /* =======================================================
     Toggle
  ======================================================= */

  const toggleSaved =
    useCallback(
      (
        ideaId:
          string
      ) => {
        const current =
          readSavedIds();

        const exists =
          current.includes(
            ideaId
          );

        const next =
          exists
            ? current.filter(
                (id) =>
                  id !==
                  ideaId
              )
            : [
                ...current,
                ideaId,
              ];

        writeSavedIds(
          next
        );

        setSavedIds(
          next
        );

        /*
         * Return the NEW state:
         *
         * true  = saved
         * false = removed
         */
        return !exists;
      },
      []
    );


  return {
    savedIds,

    savedSet,

    savedCount:
      savedIds.length,

    hydrated,

    isSaved,

    toggleSaved,
  };
}