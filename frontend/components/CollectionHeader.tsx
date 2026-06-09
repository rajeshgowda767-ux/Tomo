export type CollectionHeaderProps = {
  eyebrow: string;
  title: string;
  icon?: string;
};

export function CollectionHeader({ eyebrow, title, icon = '🍲' }: CollectionHeaderProps) {
  return (
    <div className="special-heading">
      <div>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <span>{icon}</span>
    </div>
  );
}
