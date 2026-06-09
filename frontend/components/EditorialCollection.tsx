export type EditorialItem = {
  title: string;
  imageUrl?: string;
  meta?: string;
};

export type EditorialCollectionProps = {
  title: string;
  copy: string;
  tone?: 'sip' | 'fresh';
  items: EditorialItem[];
};

export function EditorialCollection({ title, copy, tone = 'sip', items }: EditorialCollectionProps) {
  return (
    <article className={`editorial-block ${tone === 'fresh' ? 'fresh-block' : 'sip-block'}`}>
      <div>
        <p>{title}</p>
        <h3>{copy}</h3>
      </div>
      <div className={`editorial-mini-stack ${tone === 'fresh' ? 'fresh' : ''}`}>
        {items.slice(0, 2).map((item) => (
          <article className="editorial-static-card" key={item.title}>
            {item.imageUrl && <img className="food-image" src={item.imageUrl} alt="" />}
            <div>
              <strong>{item.title}</strong>
              {item.meta && <small>{item.meta}</small>}
            </div>
          </article>
        ))}
      </div>
    </article>
  );
}
