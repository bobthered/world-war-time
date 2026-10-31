import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	MONGODB_URI: { schema: (value) => value?.trim() || '', public: false },
	MONGODB_DB: { schema: (value) => value?.trim() || 'world_war_time', public: false }
});
