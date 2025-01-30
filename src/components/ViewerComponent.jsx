import { useEffect, useRef } from 'react';

export default function ViewerComponent(props) {
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
		let PSPDFKit;

		(async function () {
			PSPDFKit = await import('pspdfkit');
			PSPDFKit.unload(container);

			await PSPDFKit.load({
				// Container where PSPDFKit should be mounted.
				container,
				// Use dark theme.
				theme: PSPDFKit.Theme.DARK,
				// The document to open.
				document: props.document,
				// Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
				baseUrl: `${window.location.protocol}//${
					window.location.host
				}/${import.meta.env.BASE_URL}`,
			});
		})();

		return () => PSPDFKit && PSPDFKit.unload(container);
	}, [props.document]);

	return (
		<div
			ref={containerRef}
			style={{ width: '100%', height: '100vh' }}
		/>
	);
}