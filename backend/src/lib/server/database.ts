import mongoose from 'mongoose';

export class DatabaseConfigurationError extends Error {
	constructor() {
		super('Set MONGODB_URI in backend/.env to enable database operations.');
		this.name = 'DatabaseConfigurationError';
	}
}

type DatabaseSettings = { uri?: string; database?: string };
type ConnectionCache = { pending?: Promise<typeof mongoose> };
const globalDatabase = globalThis as typeof globalThis & { worldWarTimeDatabase?: ConnectionCache };
const cache = (globalDatabase.worldWarTimeDatabase ??= {});

// A single pool survives development hot reloads; failed connections can retry.
// Settings are provided by the server caller, never imported into client code.
export async function connectDatabase({ uri, database }: DatabaseSettings) {
	if (!uri?.trim()) throw new DatabaseConfigurationError();
	if (mongoose.connection.readyState === 1) return mongoose;
	if (!cache.pending) {
		cache.pending = mongoose.connect(uri, {
			dbName: database || 'world_war_time',
			maxPoolSize: 5,
			serverSelectionTimeoutMS: 5000,
			bufferCommands: false
		}).catch(() => {
			// Driver errors may contain credentials or hostnames. Do not forward them.
			throw new Error('Unable to connect to MongoDB Atlas. Check the URI and Atlas network access.');
		}).finally(() => {
			cache.pending = undefined;
		});
	}
	return cache.pending;
}
