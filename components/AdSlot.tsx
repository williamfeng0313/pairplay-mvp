export default function AdSlot({ label = "AdSense slot reserved" }: { label?: string }) {
  return (
    <div className="ad-slot" role="complementary" aria-label="Advertisement placeholder">
      Sponsored · {label}
    </div>
  );
}
