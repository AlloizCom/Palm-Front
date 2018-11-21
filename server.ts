import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
import {ngExpressEngine} from '@nguniversal/express-engine';
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import {join} from 'path';

enableProdMode();

const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./palm-front-server/main');
const app = express();
const PORT = 80;
const DIST_FOLDER = join(process.cwd(), 'dist');


app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'palm-front'));

app.get('*.*', express.static(join(DIST_FOLDER, 'palm-front'), {
  maxAge: '1w'
}));

app.get('*', (req, res) => {
  res.render('index', {req});
});

app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
