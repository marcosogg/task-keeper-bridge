import { InsightItem } from "./InsightItem";

interface PriorityItem {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
  assignedTo: string;
}

interface InsightsListProps {
  items: PriorityItem[];
  onActionClick: (id: string) => void;
}

export const InsightsList = ({ items, onActionClick }: InsightsListProps) => {
  return (
    <div className="space-y-4" role="list" aria-labelledby="insights-heading">
      {items.map((item) => (
        <InsightItem
          key={item.id}
          {...item}
          onActionClick={onActionClick}
        />
      ))}
    </div>
  );
};