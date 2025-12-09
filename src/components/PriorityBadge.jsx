import { PRIORITIES } from "../utils/constants";

export const PriorityBadge = ({ priority }) => {
  const priorityObj =
    PRIORITIES.find((p) => p.id === priority) || PRIORITIES[1];

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{
        backgroundColor: `${priorityObj.color}20`, // 20 - это прозрачность
        color: priorityObj.color,
        border: `1px solid ${priorityObj.color}40`,
      }}>
      {priorityObj.name.split(" ")[1]} {/* Берем только текст после эмодзи */}
    </span>
  );
};
