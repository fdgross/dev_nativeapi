import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config/config";
import datasource from "./config/datasource";

// ROUTERS
import apisRouter from "./routes/apis";
import apisCallsRouter from "./routes/apisCalls";
import callbacksRouter from "./routes/callbacks";
import categoriesRouter from "./routes/categories";
import contactsRouter from "./routes/contacts";
import costCentersRouter from "./routes/costCenters";
import eventsRouter from "./routes/events";
import featuresRouter from "./routes/features";
import groupsRouter from "./routes/groups";
import inRoutesRouter from "./routes/inRoutes";
import internalRoutesRouter from "./routes/internalRoutes";
import ivrsRouter from "./routes/ivrs";
import meetmesRouter from "./routes/meetmes";
import mohsRouter from "./routes/mohs";
import outRoutesRouter from "./routes/outRoutes";
import peersRouter from "./routes/peers";
import permissionsRouter from "./routes/permissions";
import profilesRouter from "./routes/profiles";
import queuesRouter from "./routes/queues";
import serviceHoursRouter from "./routes/serviceHours";
import serverInfoRouter from "./routes/serverInfo";
import trunksRouter from "./routes/trunks";
import uploadsRouter from "./routes/uploads";
import usersRouter from "./routes/users";
import configurationsRouter from "./routes/configurations";
import breaksRouter from "./routes/breaks";
import breaksRequestsRouter from "./routes/breaksRequests";
import userBreaksRequestes from "./routes/usersBreaksRequests";
// END ROUTERS
import authRouter from "./routes/auth";
import authorization from "./auth";

const app = express();

// ENABLE CORS
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// END ENABLE CORS

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.config = config;
app.datasource = datasource(app);

app.set("port", 7000);
app.use(bodyParser.json());
const auth = authorization(app);

app.use(auth.initialize());
app.auth = auth;

apisRouter(app);
apisCallsRouter(app);
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
serverInfoRouter(app);
trunksRouter(app);
uploadsRouter(app);
usersRouter(app);
configurationsRouter(app);
breaksRouter(app);
breaksRequestsRouter(app);
userBreaksRequestes(app);

export default app;
