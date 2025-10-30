// config.js

// This file contains shared configuration variables to be used across other scripts.
// By defining shared values here, we avoid redeclaring them across the frontend bundle.

const backendUrl = 'https://crochet-backend-ho1l.onrender.com';

// Configure your ImageKit account endpoint. Replace the placeholder with your account's URL endpoint.
// Optionally, expose window.IMAGEKIT_URL_ENDPOINT before this file loads to override the default.
const imageKitBaseUrl = (typeof window !== 'undefined' && window.IMAGEKIT_URL_ENDPOINT)
	? window.IMAGEKIT_URL_ENDPOINT
	: 'https://ik.imagekit.io/hscfnpdjm/nobilis-crochet';

(function configureImageKitCdn() {
	const ABSOLUTE_URL_REGEX = /^(?:[a-z]+:)?\/\//i;
	const DATA_URI_PREFIX = 'data:';
	const LOCAL_PREFIX = 'images/';

	const sanitizedBase = imageKitBaseUrl.replace(/\/+$/, '');
	const cdnEnabled = Boolean(sanitizedBase) && !sanitizedBase.includes('your_imagekit_id');

	const splitUrlAndSuffix = (value) => {
		if (!value) return { path: value, suffix: '' };
		const match = value.match(/^([^?#]+)([?#].*)?$/);
		return match ? { path: match[1], suffix: match[2] || '' } : { path: value, suffix: '' };
	};

	const normalizePath = (value) => {
		if (!value) return value;
		return value
			.replace(/^\.+\//, '')
			.replace(/^\/+/, '')
			.replace(/\\/g, '/');
	};

	function resolveImagePath(path) {
		if (!cdnEnabled || !path || ABSOLUTE_URL_REGEX.test(path) || path.startsWith(DATA_URI_PREFIX)) {
			return path;
		}

		const { path: cleanPath, suffix } = splitUrlAndSuffix(path);
		let normalized = normalizePath(cleanPath);

		if (normalized.startsWith(LOCAL_PREFIX)) {
			normalized = normalized.slice(LOCAL_PREFIX.length);
		}

		return `${sanitizedBase}/${normalized}` + suffix;
	}

	function resolveImagePaths(paths) {
		if (!Array.isArray(paths)) {
			return paths;
		}
		return paths.map(resolveImagePath);
	}

	function transformSrcSet(value) {
		if (!value) return value;
		return value
			.split(',')
			.map(entry => {
				const trimmed = entry.trim();
				if (!trimmed) return trimmed;
				const parts = trimmed.split(/\s+/, 2);
				const url = resolveImagePath(parts[0]);
				return parts.length === 2 ? `${url} ${parts[1]}` : url;
			})
			.join(', ');
	}

	function rewriteDocumentMedia() {
		if (!cdnEnabled || typeof document === 'undefined') return;

		const imageNodes = document.querySelectorAll('img[src], img[data-src], source[srcset], img[srcset]');
		imageNodes.forEach(node => {
			if (node.hasAttribute('src')) {
				const current = node.getAttribute('src');
				const updated = resolveImagePath(current);
				if (updated !== current) {
					if (!node.dataset.originalSrc) {
						node.dataset.originalSrc = current;
					}
					node.setAttribute('src', updated);
				}
			}

			if (node.hasAttribute('data-src')) {
				const current = node.getAttribute('data-src');
				const updated = resolveImagePath(current);
				if (updated !== current) {
					node.setAttribute('data-src', updated);
				}
			}

			if (node.hasAttribute('srcset')) {
				const current = node.getAttribute('srcset');
				const updated = transformSrcSet(current);
				if (updated !== current) {
					node.setAttribute('srcset', updated);
				}
			}
		});

		const iconLinks = document.querySelectorAll('link[rel*="icon"][href], link[rel="apple-touch-icon"][href]');
		iconLinks.forEach(link => {
			const current = link.getAttribute('href');
			const updated = resolveImagePath(current);
			if (updated !== current) {
				if (!link.dataset.originalHref) {
					link.dataset.originalHref = current;
				}
				link.setAttribute('href', updated);
			}
		});

	const socialMeta = document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]');
		socialMeta.forEach(meta => {
			const current = meta.getAttribute('content');
			const updated = resolveImagePath(current);
			if (updated && updated !== current) {
				if (!meta.dataset.originalContent) {
					meta.dataset.originalContent = current;
				}
				meta.setAttribute('content', updated);
			}
		});
	}

	if (typeof window !== 'undefined') {
		window.imageKitBaseUrl = sanitizedBase;
		window.imageKitCdnEnabled = cdnEnabled;
		window.resolveImagePath = resolveImagePath;
		window.resolveImagePaths = resolveImagePaths;
	}

	if (!cdnEnabled || typeof document === 'undefined') {
		return;
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', rewriteDocumentMedia);
	} else {
		rewriteDocumentMedia();
	}
})();
