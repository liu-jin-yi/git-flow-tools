import React, {FC} from 'react';
import {TextInput} from '@inkjs/ui';

export const ReleaseTag: FC = () => {
	return (
		<>
			<TextInput
				placeholder="请输入 tag 名称：例如： 2023-1-1 或 2023-1-1.1"
				onSubmit={name => {
					console.log('🚀 ~ file: ReleaseTag.tsx:10 ~ name:', name);
					// `name` contains user input
				}}
			/>
		</>
	);
};
