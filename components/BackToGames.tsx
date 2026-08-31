import Link from "next/link";


export default function BackToGames() {
  return (
    <div
      style={{
        maxWidth:
          "1120px",

        margin:
          "28px auto",

        padding:
          "0 20px",
      }}
    >

      <Link
        href="/games"

        style={{
          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "space-between",

          gap:
            "16px",

          padding:
            "18px 20px",

          border:
            "1px solid #eee3e7",

          borderRadius:
            "16px",

          background:
            "#fffafb",

          color:
            "#171a2d",

          textDecoration:
            "none",
        }}
      >

        <div>

          <div
            style={{
              marginBottom:
                "4px",

              color:
                "#f43f75",

              fontSize:
                "11px",

              fontWeight:
                800,

              letterSpacing:
                "0.08em",

              textTransform:
                "uppercase",
            }}
          >
            MORE TO PLAY
          </div>

          <strong>
            Browse All Online
            Games for Couples
          </strong>

        </div>


        <span
          style={{
            color:
              "#f43f75",

            fontSize:
              "20px",

            fontWeight:
              800,
          }}
        >
          →
        </span>

      </Link>

    </div>
  );
}