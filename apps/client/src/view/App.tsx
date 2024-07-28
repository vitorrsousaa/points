import { STORAGE_KEYS } from "@/config/storages";
import { AuthProvider } from "@/contexts/auth";
import { QueryClientProvider } from "@/libs/query";
import { ThemeProvider } from "@shared/ui";
import { Toaster } from "react-hot-toast";
import { Router } from "./router/browser";

function App() {
	return (
		<ThemeProvider defaultTheme="system" storageKey={STORAGE_KEYS.THEME}>
			<QueryClientProvider>
				<AuthProvider>
					<Router />

					<Toaster
						position="bottom-right"
						toastOptions={{
							duration: 3000,
						}}
					/>
				</AuthProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
