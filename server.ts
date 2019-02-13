import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import app from './server-src/app';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `Node server listening on http://localhost:${PORT}`,
    process.env.SPADE_ENV || 'production'
  );
});
