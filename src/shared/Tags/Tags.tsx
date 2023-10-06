import classes from './Tags.module.scss';

function Tags({ tagList }: { tagList: string[] }) {
	return (
		<div className={classes.tags}>
			{tagList &&
				tagList.map(
					(item, index) =>
						index < 5 && (
							<div key={Math.random()} className={classes.tag}>
								{item}
							</div>
						)
				)}
		</div>
	);
}

export default Tags;
