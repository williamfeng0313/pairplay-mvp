"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  trackEvent,
} from "@/lib/analytics";

import {
  useSavedDateIdeas,
} from "@/lib/useSavedDateIdeas";

import SaveDateIdeaButton from "@/components/SaveDateIdeaButton";


type SavedIdea = {
  id: string;

  title: string;

  description:
    string;

  icon:
    string;

  mood:
    string;

  durationLabel:
    string;

  budget:
    string;
};


type Props = {
  ideas:
    SavedIdea[];
};


export default function SavedDateIdeasPanel({
  ideas,
}: Props) {
  const [
    open,
    setOpen,
  ] =
    useState(false);


  const {
    savedIds,

    savedCount,

    hydrated,
  } =
    useSavedDateIdeas();


  /* =======================================================
     Resolve Saved IDs Back to Idea Objects
  ======================================================= */

  const savedIdeas =
    useMemo(
      () => {
        const savedSet =
          new Set(
            savedIds
          );

        return ideas.filter(
          (idea) =>
            savedSet.has(
              idea.id
            )
        );
      },
      [
        ideas,
        savedIds,
      ]
    );


  /* =======================================================
     Open / Close
  ======================================================= */

  const togglePanel =
    () => {
      const nextOpen =
        !open;

      setOpen(
        nextOpen
      );

      if (
        nextOpen
      ) {
        trackEvent(
          "ld_saved_ideas_open",
          {
            saved_count:
              savedCount,
          }
        );
      }
    };


  /*
   * Avoid showing an incorrect count
   * before localStorage is loaded.
   */
  const count =
    hydrated
      ? savedCount
      : 0;


  return (
    <section
      className="lddi-saved-panel"
      aria-label="Saved date ideas"
    >

      {/* ===================================================
          Header
      =================================================== */}

      <div className="lddi-saved-panel-header">

        <div>

          <div className="game-kicker">
            YOUR PICKS
          </div>

          <strong className="lddi-saved-panel-title">
            ♡ Saved Ideas
            {" "}
            ({count})
          </strong>

          <p>
            Save date ideas you want
            to try later. No account
            needed.
          </p>

        </div>


        <button
          type="button"

          className="btn-secondary lddi-saved-toggle"

          onClick={
            togglePanel
          }

          aria-expanded={
            open
          }
        >
          {open
            ? "Hide Saved Ideas"
            : count > 0
            ? `View Saved Ideas (${count})`
            : "View Saved Ideas"}
        </button>

      </div>


      {/* ===================================================
          Expanded Panel
      =================================================== */}

      {open ? (
        <div className="lddi-saved-content">

          {savedIdeas.length ===
          0 ? (
            <div className="lddi-saved-empty">

              <span
                aria-hidden="true"
              >
                ♡
              </span>

              <strong>
                Nothing saved yet
              </strong>

              <p>
                Tap Save on any date
                idea below and it will
                appear here the next
                time you visit on this
                browser.
              </p>

            </div>
          ) : (
            <div className="lddi-saved-grid">

              {savedIdeas.map(
                (
                  idea
                ) => (
                  <article
                    key={
                      idea.id
                    }
                    className="lddi-saved-card"
                  >

                    <div className="lddi-saved-card-icon">
                      {
                        idea.icon
                      }
                    </div>

                    <div className="lddi-saved-card-copy">

                      <h3>
                        {
                          idea.title
                        }
                      </h3>

                      <p>
                        {
                          idea.description
                        }
                      </p>

                      <div className="lddi-saved-card-meta">

                        <span>
                          {
                            idea.mood
                          }
                        </span>

                        <span>
                          {
                            idea.durationLabel
                          }
                        </span>

                        <span>
                          {
                            idea.budget
                          }
                        </span>

                      </div>

                      <div className="lddi-saved-card-actions">

                        <a
                          href={`#${idea.id}`}
                          className="lddi-saved-view"
                          onClick={() =>
                            trackEvent(
                              "ld_saved_idea_view",
                              {
                                idea_id:
                                  idea.id,
                              }
                            )
                          }
                        >
                          View Idea
                        </a>

                        <SaveDateIdeaButton
                          ideaId={
                            idea.id
                          }
                          source="saved_panel"
                          variant="remove"
                        />

                      </div>

                    </div>

                  </article>
                )
              )}

            </div>
          )}

        </div>
      ) : null}

    </section>
  );
}