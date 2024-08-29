import { STORAGE_KEYS } from "@/config/storages";
import { AuthProvider } from "@/contexts/auth";
import { QueryClientProvider } from "@/libs/query";
import * as Sentry from "@sentry/react";
import { ThemeProvider } from "@shared/ui";
import { Toaster } from "react-hot-toast";
import { RouterStack } from "./router/RouterStack";

const { VITE_SENTRY_URL } = import.meta.env;

const SENTRY_CONFIGURATION: Sentry.BrowserOptions = {
	dsn: VITE_SENTRY_URL,
	tracesSampleRate: 1,
	maxBreadcrumbs: 50,
	debug: true,
	integrations: [
		Sentry.browserTracingIntegration(),
		Sentry.replayIntegration(),
		Sentry.feedbackIntegration({
			colorScheme: "system",
		}),
	],
	replaysOnErrorSampleRate: 1.0,
	// Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
	tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
};

function App() {
	const { DEV: IS_DEVELOPMENT } = import.meta.env;

	Sentry.init({
		...SENTRY_CONFIGURATION,
		environment: IS_DEVELOPMENT ? "development" : "production",
		replaysSessionSampleRate: IS_DEVELOPMENT ? 1 : 0.1,
	});

	return (
		<Sentry.ErrorBoundary>
			<AppProviders>
				<RouterStack />

				<Toaster
					position="top-right"
					toastOptions={{
						duration: 3000,
					}}
				/>
			</AppProviders>
		</Sentry.ErrorBoundary>
	);
}

function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider defaultTheme="system" storageKey={STORAGE_KEYS.THEME}>
			<QueryClientProvider>
				<AuthProvider>{children}</AuthProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
