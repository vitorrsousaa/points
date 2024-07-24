import { STORAGE_KEYS } from "@/config/storages";
import { QueryClientProvider } from "@/libs/query";
import { ThemeProvider } from "@shared/ui";
import { Toaster } from "react-hot-toast";
import { Router } from "./router/browser";

function App() {
	return (
		<ThemeProvider defaultTheme="system" storageKey={STORAGE_KEYS.THEME}>
			<QueryClientProvider>
				<Router />

				<Toaster />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
