import FeatureHintCard from './FeatureHintCard';

export default function EmptyStateFooter() {
  return (
    <div className="grid grid-cols-1 gap-[15px] md:grid-cols-3 md:gap-[24px]">
      <FeatureHintCard
        materialIcon="auto_awesome"
        title="High Level Goals"
        description="Define the broad objectives that span across multiple
                            cycles."
      />

      <FeatureHintCard
        materialIcon="schema"
        title="High Level Goals"
        description="Define the broad objectives that span across multiple cycles."
      />

      <FeatureHintCard
        materialIcon="timeline"
        title="High Level Goals"
        description="Define the broad objectives that span across multiple cycles."
      />
    </div>
  );
}
