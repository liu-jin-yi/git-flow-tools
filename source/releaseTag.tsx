import React, {FC, useState} from 'react';
import {Spinner, StatusMessage, TextInput} from '@inkjs/ui';
import {$} from 'execa';
import {Text} from 'ink';

type actionType = 'input' | 'startTag' | 'endTag' | 'error';

export const ReleaseTag: FC = () => {
	const [action, setAction] = useState<actionType>('input');
	const [error, setError] = useState<Error | null>(null);
	const [tagName, setTagName] = useState<string | undefined>(undefined);

	switch (action) {
		case 'input': {
			return (
				<>
					<TextInput
						placeholder="请输入 tag 名称：例如： 2023-1-1 或 2023-1-1.1"
						onSubmit={async name => {
							setAction('startTag');
							try {
								const tagName = await releaseTag(name);
								setTagName(tagName);
							} catch (error) {
								setError(error as Error);
								setAction('error');
								return;
							}
							setAction('endTag');
						}}
					/>
				</>
			);
		}
		case 'startTag': {
			return <Spinner label="正在处理中..." />;
		}

		case 'endTag': {
			return (
				<StatusMessage variant="success">
					🎉 tag {tagName} 处理完毕，已经推至远程！
				</StatusMessage>
			);
		}

		case 'error': {
			return <StatusMessage variant="error">{error?.message}</StatusMessage>;
		}

		default:
			return <Text>无</Text>;
	}
};

async function releaseTag(tagName: string) {
	const checkTagName = /^\d{4}-\d{1,2}-\d{1,2}(\.\d+)?$/;
	if (!checkTagName.test(tagName)) {
		throw Error('tag name 不符合规范！');
	}
	const tagName_ = `release/${tagName}`;
	await $`git tag ${tagName_}`;
	return tagName_;
}
