type AdSlotProps = {
  slot?: string;
  position: "calculator-bottom" | "content-middle" | "faq-bottom" | "desktop-side";
  responsive?: boolean;
};

export function AdSlot({ slot, position, responsive = true }: AdSlotProps) {
  return (
    <aside
      className="ad-slot"
      data-ad-slot={slot ?? "pending"}
      data-ad-position={position}
      data-ad-responsive={responsive}
      aria-label="광고 영역"
    >
      ADVERTISEMENT
    </aside>
  );
}
