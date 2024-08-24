import { STORAGE_KEYS } from "@/config/storages";
import { AuthProvider } from "@/contexts/auth";
import { QueryClientProvider } from "@/libs/query";
import { ThemeProvider } from "@shared/ui";
import { Toaster } from "react-hot-toast";
import { RouterStack } from "./router/RouterStack";

function App() {
	return (
		<AppProviders>
			<RouterStack />

			<Toaster
				position="bottom-right"
				toastOptions={{
					duration: 3000,
				}}
			/>
		</AppProviders>
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
