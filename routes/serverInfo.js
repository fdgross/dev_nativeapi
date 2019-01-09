import si from 'systeminformation';

async function sysinfo(res) {
  try {
    const currentloaddata = await si.currentLoad();
    const memdata = await si.mem();
    const fsdata = await si.fsSize();
    const networkifsdata = await si.networkInterfaces();
    const servicesdata = await si.services('adobearmservice, adobearmservice, appinfo, appinfo');
    const timedata = await si.time();

    const data = {
      currentLoad: currentloaddata,
      mem: memdata,
      disk: fsdata,
      networkInterfaces: networkifsdata,
      services: servicesdata,
      time: timedata,
    };

    res.status(200);
    res.json(data);
  } catch (e) {
    console.log(e);
  }
}

export default(app) => {
  app.route('/serverInfo')
    .get((req, res) => {
      sysinfo(res);
    });
};
