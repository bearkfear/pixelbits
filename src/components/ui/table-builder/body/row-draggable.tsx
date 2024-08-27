import { useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS, type Transform } from "@dnd-kit/utilities";
import { useMemo } from "react";
import type { BodyProps } from ".";
import { Table } from "../../table";
import type { Columns, Row } from "../types";
import { DragItem, SortableItemContext } from "./drag-item";
import { RowCellActions } from "./row-cell-actions";
import { RowCellSelectable } from "./row-cell-selectable";
import { RowCells } from "./row-cells";
import { cn } from "../../../../lib/utils";

export function RowDraggable<C extends Columns>({
	columns,
	actions,
	row,
	selectable,
	rowIsChecked,
	checkRow,
	draggable,
}: { row: Row<C>; rowIsChecked: boolean } & BodyProps<C>) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		setActivatorNodeRef,
		isSorting,
		isDragging,
		isOver,
	} = useSortable({
		id: row.key,
		strategy: verticalListSortingStrategy,
		transition: {
			duration: 500,
			easing: "cubic-bezier(0.25, 1, 0.5, 1)",
		},
	});

	const context = useMemo(
		() => ({
			attributes,
			listeners,
			ref: setActivatorNodeRef,
		}),
		[attributes, listeners, setActivatorNodeRef],
	);

	return (
		<SortableItemContext.Provider value={context}>
			<Table.Row
				ref={setNodeRef}
				style={{
					transform: CSS.Translate.toString({
						...transform,
						x: 0,
					} as Transform),
				}}
				className={cn(
					rowIsChecked && "bg-blue-2 hover:bg-blue-3",
					isSorting && "!z-5 bg-green-4/20",
					isDragging && "!z-50 !bg-green-6",
					isOver && "bg-green-4 border-green-6",
				)}
			>
				{draggable && <DragItem />}

				{selectable && (
					<RowCellSelectable
						checkRow={checkRow}
						row={row}
						rowIsChecked={rowIsChecked}
					/>
				)}

				{columns.map((col) => {
					const rowColData = row[col.id as keyof typeof row];
					return <RowCells key={`row-${col.id}`} rowColData={rowColData} />;
				})}

				{actions && actions.length > 0 && (
					<RowCellActions actions={actions} row={row} />
				)}
			</Table.Row>
		</SortableItemContext.Provider>
	);
}
