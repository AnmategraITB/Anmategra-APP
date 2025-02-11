import { type KanbanBoardProps } from "../board/kanban-board";
import { getTypeImage } from "../board/report-column";
import { AccordionDisplay } from "./accordion-display";

export const ListDisplay = ({
  kanbanData,
  displayedColumn,
}: KanbanBoardProps) => {
  return (
    <div className="flex flex-col gap-2">
      {kanbanData.map((data, index) => (
        <AccordionDisplay
          key={index}
          logo={getTypeImage(data.title)}
          title={data.title}
          reports={data.reports}
          selectedStatus={displayedColumn}
        />
      ))}
    </div>
  );
};
