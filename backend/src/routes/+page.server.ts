import { MONGODB_URI, MONGODB_DB } from '$app/env/private';
import { fail } from '@sveltejs/kit';
import { connectDatabase, DatabaseConfigurationError } from '#lib/server/database.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = () => ({ databaseConfigured: Boolean(MONGODB_URI) });

export const actions: Actions = {
	testConnection: async () => {
		try {
			const mongoose = await connectDatabase({ uri: MONGODB_URI, database: MONGODB_DB });
			await mongoose.connection.db!.command({ ping: 1 });
			return { connected: true, message: 'Atlas connection verified. Database responded to ping.' };
		} catch (error) {
			return fail(503, {
				connected: false,
				message: error instanceof DatabaseConfigurationError
					? error.message
					: 'Atlas connection could not be verified. Check your URI, database user, and Atlas network access.'
			});
		}
	}
};
