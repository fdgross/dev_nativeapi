export default {
  database: "dev_native",
  username: "root",
  password: "1234",
  params: {
    dialect: "mysql",
    host: "172.17.0.2",
    port: "3306",
    define: {
      underscore: true,
      timestamps: true,
      // rejectOnEmpty: true,
    },
  },
  jwtSecret: "native",
  jwtSession: { session: false },

  // ----------------NATIVE CONFIGURATIONS----------------
  amiHost: "172.16.0.68",
  amiPort: "5038",
  amiUser: "admin",
  amiPassword: "admin",

  // ----------------NATIVE CONFIG FILES----------------
  sipPeers: "C:/Temp/sip_ramais.conf",
  iaxPeers: "C:/Temp/iax_ramais.conf",
  profiles: "C:/Temp/extensions_perfis.conf",
  outRoutes: "C:/Temp/extensions_out.conf",
  queues: "C:/Temp/queues_native.conf",
  dialQueues: "C:/Temp/extensions_filas.conf",

  // ----------------NATIVE UPLOAD DIR-----------------
  defaultBaseUploadDir: "C:/Temp",
  defaultUploadTempDir: "C:/Temp/uploads_tmp",
  defaultMohUploadDir: "C:/Temp/mohs",
  defaultIvrUploadDir: "C:/Temp/ivrs",
};
