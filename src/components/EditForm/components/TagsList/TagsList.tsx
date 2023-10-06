import { Button } from 'antd';
import classes from '../../EditForm.module.scss';
import Input from '../../../../shared/Input/Input';

interface ITagsList {
	tags: string[];
	deleteHandler: (i: number) => void;
	changeHandler: (v: string, i: number) => void;
	addTag: () => void;
}

function TagsList({ tags, deleteHandler, changeHandler, addTag }: ITagsList) {
	return (
		<div>
			<div className={classes.text}>Tags</div>
			<div className={classes.items}>
				{tags.map((item, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<div className={classes.tag} key={index}>
						<Input
							value={item}
							placeholder="Tag"
							onChange={(e) => changeHandler(e.target.value, index)}
						/>
						<Button
							onClick={() => deleteHandler(index)}
							className={classes.btn}
							danger
						>
							Delete
						</Button>
						{tags.length - 1 === index && (
							<Button className={classes.btn} onClick={() => addTag()}>
								Add tag
							</Button>
						)}
					</div>
				))}
				{tags.length === 0 && (
					<Button className={classes.btn} onClick={() => addTag()}>
						Add tag
					</Button>
				)}
			</div>
		</div>
	);
}

export default TagsList;
