export type HeroAmbientCardProps = {
  time: string;
  temperature: number;
  weatherCondition: string;
  emotionalHint: string;
};

export function HeroAmbientCard({
  time,
  temperature,
  weatherCondition,
  emotionalHint,
}: HeroAmbientCardProps) {
  return (
    <aside className="hero-ambient-card" aria-label="Kitchen ambience">
      <div className="ambient-glow" aria-hidden="true">
        {weatherCondition.toLowerCase().includes('rain') ? '🌧️' : '🌙'}
      </div>
      <time dateTime={time}>{time}</time>
      <p>
        {temperature}°C • {weatherCondition}
      </p>
      <span>{emotionalHint}</span>
    </aside>
  );
}
