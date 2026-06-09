export type MiniCollection = {
  title: string;
  copy: string;
  icon: string;
  recipeId?: string;
};

export type MiniCollectionStripProps = {
  collections: MiniCollection[];
};

export function MiniCollectionStrip({ collections }: MiniCollectionStripProps) {
  return (
    <div className="mini-collection-strip" aria-label="More curated collections">
      {collections.map((collection) => (
        <button className="mini-collection-pill" data-recipe-id={collection.recipeId} key={collection.title}>
          <span>{collection.icon}</span>
          <strong>{collection.title}</strong>
          <small>{collection.copy}</small>
        </button>
      ))}
    </div>
  );
}
