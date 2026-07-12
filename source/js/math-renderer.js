(() => {
  const katexAssetBaseUrl = 'https://lib.baomitu.com/KaTeX/0.16.2';
  const katexScriptUrl = `${katexAssetBaseUrl}/katex.min.js`;
  const autoRenderScriptUrl = `${katexAssetBaseUrl}/contrib/auto-render.min.js`;
  const mathContainerSelector = '.markdown-body, .index-excerpt';
  const mathDelimiters = [
    { left: '$$', right: '$$', display: true },
    { left: '\\[', right: '\\]', display: true },
    { left: '$', right: '$', display: false },
    { left: '\\(', right: '\\)', display: false }
  ];

  const mathContainers = Array.from(document.querySelectorAll(mathContainerSelector));
  const hasMath = mathContainers.some(({ textContent }) => /\$|\\\\\(|\\\\\[/.test(textContent));

  if (!hasMath) return;

  // KaTeX is licensed under the MIT License.
  const loadScript = scriptUrl => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  loadScript(katexScriptUrl)
    .then(() => loadScript(autoRenderScriptUrl))
    .then(() => {
      mathContainers.forEach(container => {
        window.renderMathInElement(container, {
          delimiters: mathDelimiters,
          throwOnError: false
        });
      });
    })
    .catch(() => {
      // Leave the original LaTeX visible if the CDN is unavailable.
    });
})();
