import { Button } from 'antd';
import { ChangeEvent } from 'react';
import classes from './List.module.scss';
import Input from '../../../../shared/Input/Input';

interface ITagsList {
	tags: { tag: string; id: number }[];
	deleteHandler: (i: number) => void;
	changeHandler: (e: ChangeEvent<HTMLInputElement>, i: number) => void;
	addTag: () => void;
}

function List({ tags, deleteHandler, changeHandler, addTag }: ITagsList) {
	return (
		<div>
			<div className={classes.text}>Tags</div>
			<div className={classes.items}>
				{tags.map((item, index) => (
					<div className={classes.tag} key={item.id}>
						<Input
							value={item.tag}
							placeholder="Tag"
							onChange={(e) => changeHandler(e, index)}
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

export default List;
