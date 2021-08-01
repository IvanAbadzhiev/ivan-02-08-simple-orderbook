import classes from "./Table.module.css";

interface Columns {
    total: { title: string }
}

interface Props {
	rows: any[];
	columns: Columns
}

const Table : React.FC<Props> = ({
	rows, columns
}) => {
	const columnKeys = Object.keys(columns);

	return (
		<div className={classes.tableContainer}>
			<div className={classes.tableHeader}>
				{columnKeys.map((title) => (
						<span
							key={title}
							className={classes.headerCell}
						>
							
							{title}
						</span>
					))}
			</div>

			{rows.map((entry: any) => (
				<div
					key={entry.id}
					className={classes.tableRow}
				>
					{columnKeys.map((column) => {
						return(
							<span
								key={column + entry.id}
								className={classes.rowCell}
							>
								{entry[column]}
							</span>
						);
					})}
				</div>
			))}
		</div>
	)
};

export default Table;
