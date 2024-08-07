import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {},
	client: {
		NEXT_PUBLIC_MAPLIBRE_ACCESS_TOKEN: z.string().min(1),
	},
	// If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
	runtimeEnv: {
		NEXT_PUBLIC_MAPLIBRE_ACCESS_TOKEN:
			process.env.NEXT_PUBLIC_MAPLIBRE_ACCESS_TOKEN,
	},
	// For Next.js >= 13.4.4, you only need to destructure client variables:
	// experimental__runtimeEnv: {
	//   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
	// }
});
