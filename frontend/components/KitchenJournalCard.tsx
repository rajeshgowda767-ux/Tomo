export type KitchenJournalEntry = {
  id: string;
  recipeName: string;
  imageUrl?: string;
  cookedAt: string;
};

export type KitchenJournalCardProps = {
  entries: KitchenJournalEntry[];
  onExplore?: () => void;
  onOpenJournal?: () => void;
};

function relativeDate(value: string) {
  const diffDays = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 86400000));
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  return `${diffDays} days ago`;
}

export function KitchenJournalCard({ entries, onExplore, onOpenJournal }: KitchenJournalCardProps) {
  const weekEntries = entries.slice(0, 3);
  return (
    <section className="kitchen-journal-card" aria-label="Your Kitchen Journal">
      <div className="journal-card-head">
        <span>📖</span>
        <div><h2>Your Kitchen Journal</h2><p>{entries.length ? 'This Week' : 'Your recent cooking journey.'}</p></div>
      </div>
      {entries.length ? (
        <>
          <div className="journal-mini-list">
            {weekEntries.map((entry) => (
              <article key={entry.id}><span>🍲</span><strong>{entry.recipeName}</strong><small>{relativeDate(entry.cookedAt)}</small></article>
            ))}
          </div>
          <div className="journal-footer"><span>{entries.length} dishes cooked this week</span><button className="journal-link" type="button" onClick={onOpenJournal}>View Full Journal</button></div>
        </>
      ) : (
        <>
          <div className="journal-empty-copy"><strong>You haven't cooked anything yet.</strong><span>Start with a Tomo recommendation today.</span></div>
          <button className="journal-primary" type="button" onClick={onExplore}>Explore Dishes</button>
        </>
      )}
    </section>
  );
}
