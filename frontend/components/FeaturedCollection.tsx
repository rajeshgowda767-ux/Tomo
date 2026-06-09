export type CollectionDish = {
  id?: string;
  title: string;
  imageUrl?: string;
};

export type FeaturedCollectionProps = {
  eyebrow: string;
  title: string;
  copy: string;
  dishes: CollectionDish[];
};

export function FeaturedCollection({ eyebrow, title, copy, dishes }: FeaturedCollectionProps) {
  const [hero, ...supporting] = dishes;

  return (
    <article className="editorial-feature">
      <div className="editorial-copy">
        <p>{eyebrow}</p>
        <h3>{title}</h3>
        <span>{copy}</span>
      </div>
      <div className="editorial-feature-grid">
        {hero && (
          <button className="editorial-main-card" data-recipe-id={hero.id}>
            {hero.imageUrl && <img className="food-image" src={hero.imageUrl} alt="" />}
            <strong>{hero.title}</strong>
            <small>Perfect for slower evenings.</small>
          </button>
        )}
        {supporting.slice(0, 2).map((dish) => (
          <button className="editorial-support-card" data-recipe-id={dish.id} key={dish.id || dish.title}>
            {dish.imageUrl && <img className="food-image" src={dish.imageUrl} alt="" />}
            <strong>{dish.title}</strong>
          </button>
        ))}
      </div>
    </article>
  );
}
