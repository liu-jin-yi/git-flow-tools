import {ConfirmInput, Spinner, StatusMessage} from '@inkjs/ui';
import {$} from 'execa';
import React, {FC, useState} from 'react';
import {Text} from 'ink';

type actionType = 'start' | 'end' | 'error' | 'create';
export const CreateReleaseBranch: FC = () => {
	const [action, setAction] = useState<actionType>('create');
	const [braName, setBraName] = useState('');
	const [error, setError] = useState<Error | null>(null);

	switch (action) {
		case 'create': {
			return (
				<Text>
					确认创建 {`release/${$.sync`date +%Y-%m-%d`.stdout} 吗？`}
					<ConfirmInput
						onCancel={() => {
							process.exit();
						}}
						onConfirm={async () => {
							try {
								const branchName = await createBranch();
								setBraName(branchName);
							} catch (error) {
								setError(error as Error);
								setAction('error');
								return;
							}
							setAction('end');
						}}
					/>
				</Text>
			);
		}

		case 'start': {
			return <Spinner label="正在创建中..." />;
		}
		case 'end': {
			return (
				<StatusMessage variant="success">
					🎉 分支 {braName} 创建完毕！
				</StatusMessage>
			);
		}
		case 'error': {
			return <StatusMessage variant="error">{error?.message}</StatusMessage>;
		}
		default:
			return null;
	}
};

async function createBranch(branchName?: string) {
	if (branchName) {
		await $`git checkout -b ${branchName}`;
		return branchName;
	}
	const {stdout} = await $`date +%Y-%m-%d`;
	const branchName_ = `release/${stdout}`;
	await $`git checkout -b ${branchName_}`;
	return branchName_;
}
