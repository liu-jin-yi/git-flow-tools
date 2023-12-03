import React, {useState} from 'react';
import {Text} from 'ink';
import {Select} from '@inkjs/ui';
import {ReleaseTag} from './releaseTag.js';

type Props = {
	name: string | undefined;
};

type actionType =
	| 'createReleaseBranch'
	| 'createBUGFixBranch'
	| 'tag'
	| 'hotFix'
	| 'select';

export default function App({name = 'Stranger'}: Props) {
	console.log('🚀 ~ file: app.tsx:16 ~ App ~ name:', name);
	const actionOpt = [
		{value: 'createReleaseBranch', label: 'create-release-branch'},
		{value: 'createBUGFixBranch', label: 'create-hot-fix-branch'},
		{value: 'tag', label: 'release-tag'},
		{value: 'hotFix', label: 'hot-fix-tag'},
	];

	const [action, setAction] = useState<actionType>('select');

	switch (action) {
		case 'select': {
			return (
				<>
					<Text color="green">请选择要执行的操作:</Text>
					<Select
						options={actionOpt}
						onChange={(value: string) => {
							setAction(value as actionType);
						}}
					></Select>
				</>
			);
		}
		case 'tag': {
			return <ReleaseTag />;
		}
		default:
			return <Text>无选项</Text>;
	}
}
