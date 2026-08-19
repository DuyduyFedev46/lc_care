const fs = require('fs');
const file = './src/context/AppContext.jsx';
let content = fs.readFileSync(file, 'utf8');

// replace update function
content = content.replace(
  /const update = useCallback\(\(patch\) => setState\(\(prev\) => \(\{ \.\.\.prev, \.\.\.patch \}\)\), \[\]\);/,
  `const update = useCallback((patch) => {
    setState((prev) => {
      if (typeof patch === 'function') {
        return { ...prev, ...patch(prev) };
      }
      return { ...prev, ...patch };
    });
  }, []);`
);

fs.writeFileSync(file, content);
