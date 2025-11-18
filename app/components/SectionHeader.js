export default function SectionHeader({ title }) {
  return (
    <div className="mb-6">
      <h2 className="section-title">{title}</h2>
      <div className="h-0.5 w-20 rounded bg-gradient-to-r from-neon-500 to-neon-300/70"></div>
    </div>
  );
}
