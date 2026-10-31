import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocked = vi.hoisted(() => ({ connect: vi.fn(), connection: { readyState: 0 } }));
vi.mock('mongoose', () => ({ default: mocked }));
import { connectDatabase, DatabaseConfigurationError } from './database';

describe('database connection lifecycle', () => {
	beforeEach(() => {
		mocked.connection.readyState = 0;
		mocked.connect.mockReset();
	});
	it('rejects missing configuration without opening a connection', async () => {
		await expect(connectDatabase({})).rejects.toBeInstanceOf(DatabaseConfigurationError);
		expect(mocked.connect).not.toHaveBeenCalled();
	});
	it('shares concurrent connection attempts', async () => {
		let finish!: (value: typeof mocked) => void;
		mocked.connect.mockReturnValue(new Promise((resolve) => { finish = resolve; }));
		const first = connectDatabase({ uri: 'mongodb://fixture' });
		const second = connectDatabase({ uri: 'mongodb://fixture' });
		expect(mocked.connect).toHaveBeenCalledTimes(1);
		finish(mocked);
		await Promise.all([first, second]);
	});
	it('redacts connection failures and permits retry', async () => {
		mocked.connect.mockRejectedValueOnce(new Error('secret-password'));
		await expect(connectDatabase({ uri: 'mongodb://fixture' })).rejects.toThrow('Unable to connect');
		mocked.connect.mockResolvedValueOnce(mocked);
		await connectDatabase({ uri: 'mongodb://fixture' });
		expect(mocked.connect).toHaveBeenCalledTimes(2);
	});
	it('reuses a connected pool', async () => {
		mocked.connection.readyState = 1;
		await connectDatabase({ uri: 'mongodb://fixture' });
		expect(mocked.connect).not.toHaveBeenCalled();
	});
});
