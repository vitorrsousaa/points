import * as Sentry from "@sentry/react";

export function SentryHandler() {
	function startSession(email: string) {
		Sentry.startSession({
			user: {
				email,
			},
		});
	}

	function endSession() {
		Sentry.endSession();
	}

	function viewPage(
		name: string,
		value: string | number,
		data?: any | undefined,
	) {
		Sentry.metrics.set(name, value, data);
	}

	function sendEvent(event: Sentry.Event, hint?: Sentry.EventHint | undefined) {
		Sentry.captureEvent(event, hint);
	}

	function sendException(exception: any, hint?: Sentry.EventHint | undefined) {
		Sentry.captureException(exception, hint);
	}

	return {
		startSession,
		endSession,
		viewPage,
		sendEvent,
		sendException,
	};
}
