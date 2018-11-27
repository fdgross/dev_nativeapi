import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
// ROUTERS
import callbacksRouter from './routes/callbacks';
import categoriesRouter from './routes/categories';
import contactsRouter from './routes/contacts';
import costCentersRouter from './routes/costCenters';
import eventsRouter from './routes/events';
import featuresRouter from './routes/features';
import groupsRouter from './routes/groups';
import inRoutesRouter from './routes/inRoutes';
import internalRoutesRouter from './routes/internalRoutes';
import ivrsRouter from './routes/ivrs';
import meetmesRouter from './routes/meetmes';
import mohsRouter from './routes/mohs';
import outRoutesRouter from './routes/outRoutes';
import peersRouter from './routes/peers';
import permissionsRouter from './routes/permissions';
import profilesRouter from './routes/profiles';
import queuesRouter from './routes/queues';
import serviceHoursRouter from './routes/serviceHours';
import trunksRouter from './routes/trunks';
import usersRouter from './routes/users';
// END ROUTERS
import authRouter from './routes/auth';
import authorization from './auth';

const app = express();
// ENABLE CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// END ENABLE CORS

app.config = config;
app.datasource = datasource(app);

app.set('port', 7000);
app.use(bodyParser.json());
const auth = authorization(app);

app.use(auth.initialize());
app.auth = auth;

authRouter(app);
callbacksRouter(app);
categoriesRouter(app);
contactsRouter(app);
costCentersRouter(app);
eventsRouter(app);
featuresRouter(app);
groupsRouter(app);
inRoutesRouter(app);
internalRoutesRouter(app);
ivrsRouter(app);
meetmesRouter(app);
mohsRouter(app);
outRoutesRouter(app);
peersRouter(app);
permissionsRouter(app);
profilesRouter(app);
queuesRouter(app);
serviceHoursRouter(app);
trunksRouter(app);
usersRouter(app);

export default app;
