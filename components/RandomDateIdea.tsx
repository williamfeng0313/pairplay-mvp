"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { trackEvent } from "@/lib/analytics";

import {
  longDistanceDateCategories,
  longDistanceDateIdeas,
  type LongDistanceDateBudget,
  type LongDistanceDateCategoryKey,
  type LongDistanceDateDuration,
  type LongDistanceDateMood,
} from "@/data/longDistanceDateIdeas";

const ALL = "all";

export default function RandomDateIdea() {
  const [category, setCategory] =
    useState<string>(ALL);

  const [mood, setMood] =
    useState<string>(ALL);

  const [duration, setDuration] =
    useState<string>(ALL);

  const [budget, setBudget] =
    useState<string>(ALL);

  const [ideaId, setIdeaId] =
    useState(
      longDistanceDateIdeas[0]?.id ?? ""
    );

  const matchingIdeas = useMemo(
    () =>
      longDistanceDateIdeas.filter(
        (idea) =>
          (category === ALL ||
            idea.category ===
              (category as LongDistanceDateCategoryKey)) &&
          (mood === ALL ||
            idea.mood ===
              (mood as LongDistanceDateMood)) &&
          (duration === ALL ||
            idea.duration ===
              (duration as LongDistanceDateDuration)) &&
          (budget === ALL ||
            idea.budget ===
              (budget as LongDistanceDateBudget))
      ),
    [
      category,
      mood,
      duration,
      budget,
    ]
  );

  const currentIdea =
    longDistanceDateIdeas.find(
      (idea) =>
        idea.id === ideaId
    ) ??
    matchingIdeas[0] ??
    longDistanceDateIdeas[0];

  const currentCategory =
    longDistanceDateCategories.find(
      (item) =>
        item.key ===
        currentIdea?.category
    );

  function trackFilter(
    filterType: string,
    filterValue: string
  ) {
    trackEvent(
      "ld_date_filter_change",
      {
        filter_type: filterType,
        filter_value: filterValue,
      }
    );
  }

  function pickIdea() {
    const pool =
      matchingIdeas.length > 0
        ? matchingIdeas
        : longDistanceDateIdeas;

    const alternatives =
      pool.length > 1
        ? pool.filter(
            (idea) =>
              idea.id !== ideaId
          )
        : pool;

    const nextIdea =
      alternatives[
        Math.floor(
          Math.random() *
            alternatives.length
        )
      ];

    if (!nextIdea) {
      return;
    }

    setIdeaId(nextIdea.id);

    trackEvent(
      "ld_date_randomize",
      {
        idea_category:
          nextIdea.category,
        idea_mood:
          nextIdea.mood,
        idea_duration:
          nextIdea.duration,
        idea_budget:
          nextIdea.budget,
      }
    );
  }

  function resetFilters() {
    setCategory(ALL);
    setMood(ALL);
    setDuration(ALL);
    setBudget(ALL);

    trackEvent(
      "ld_date_filter_change",
      {
        filter_type: "reset",
        filter_value: "all",
      }
    );
  }

  if (!currentIdea) {
    return null;
  }

  return (
    <section
      id="date-idea-generator"
      className="lddi-generator"
      aria-labelledby="lddi-generator-title"
    >
      <div className="lddi-generator-heading">
        <div>
          <div className="game-kicker">
            RANDOM DATE IDEA GENERATOR
          </div>

          <h2 id="lddi-generator-title">
            What Should We Do Tonight?
          </h2>

          <p>
            Pick a vibe or leave
            everything open, then let
            TwoLumi choose a long
            distance date idea for you.
          </p>
        </div>

        <span className="lddi-generator-count">
          {
            matchingIdeas.length
          }{" "}
          ideas match
        </span>
      </div>

      <div className="lddi-filter-grid">
        <label>
          <span>
            Category
          </span>

          <select
            value={category}
            onChange={(event) => {
              const value =
                event.target.value;

              setCategory(value);

              trackFilter(
                "category",
                value
              );
            }}
          >
            <option value={ALL}>
              Any category
            </option>

            {longDistanceDateCategories.map(
              (item) => (
                <option
                  key={item.key}
                  value={item.key}
                >
                  {item.shortTitle}
                </option>
              )
            )}
          </select>
        </label>

        <label>
          <span>
            Mood
          </span>

          <select
            value={mood}
            onChange={(event) => {
              const value =
                event.target.value;

              setMood(value);

              trackFilter(
                "mood",
                value
              );
            }}
          >
            <option value={ALL}>
              Any mood
            </option>
            <option value="Playful">
              Playful
            </option>
            <option value="Cozy">
              Cozy
            </option>
            <option value="Curious">
              Curious
            </option>
            <option value="Active">
              Active
            </option>
            <option value="Meaningful">
              Meaningful
            </option>
          </select>
        </label>

        <label>
          <span>
            Time
          </span>

          <select
            value={duration}
            onChange={(event) => {
              const value =
                event.target.value;

              setDuration(value);

              trackFilter(
                "duration",
                value
              );
            }}
          >
            <option value={ALL}>
              Any length
            </option>
            <option value="Quick">
              Quick
            </option>
            <option value="Medium">
              Medium
            </option>
            <option value="Long">
              Longer date
            </option>
          </select>
        </label>

        <label>
          <span>
            Budget
          </span>

          <select
            value={budget}
            onChange={(event) => {
              const value =
                event.target.value;

              setBudget(value);

              trackFilter(
                "budget",
                value
              );
            }}
          >
            <option value={ALL}>
              Any budget
            </option>
            <option value="Free">
              Free
            </option>
            <option value="Low-cost">
              Low-cost
            </option>
          </select>
        </label>
      </div>

      <div className="lddi-generator-card">
        <div className="lddi-generator-meta">
          <span>
            {
              currentCategory?.icon
            }{" "}
            {
              currentCategory?.shortTitle
            }
          </span>

          <span>
            {
              currentIdea.durationLabel
            }{" "}
            ·{" "}
            {
              currentIdea.budget
            }
          </span>
        </div>

        <div
          className="lddi-generator-icon"
          aria-hidden="true"
        >
          {
            currentIdea.icon
          }
        </div>

        <h3>
          {
            currentIdea.title
          }
        </h3>

        <p>
          {
            currentIdea.description
          }
        </p>

        <div className="lddi-generator-tags">
          <span>
            {
              currentIdea.mood
            }
          </span>

          <span>
            {
              currentIdea.duration
            }
          </span>

          <span>
            {
              currentIdea.budget
            }
          </span>
        </div>

        <div className="lddi-generator-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={pickIdea}
          >
            Surprise Us
          </button>

          {currentIdea.href ? (
            <Link
              href={currentIdea.href}
              className="btn-secondary"
              onClick={() =>
                trackEvent(
                  "ld_date_idea_cta_click",
                  {
                    idea_category:
                      currentIdea.category,
                    destination:
                      currentIdea.href ??
                      "",
                  }
                )
              }
            >
              {
                currentIdea.cta ??
                "Try This Idea"
              }
            </Link>
          ) : (
            <a
              href={`#${currentIdea.category}`}
              className="btn-secondary"
              onClick={() =>
                trackEvent(
                  "ld_date_idea_cta_click",
                  {
                    idea_category:
                      currentIdea.category,
                    destination:
                      `#${currentIdea.category}`,
                  }
                )
              }
            >
              Browse Similar Ideas
            </a>
          )}

          <button
            type="button"
            className="lddi-reset-button"
            onClick={resetFilters}
          >
            Reset filters
          </button>
        </div>
      </div>

      <p className="lddi-generator-note">
        No account needed. Your
        selections stay in this page
        session and are not used as
        personal profile data.
      </p>
    </section>
  );
}
