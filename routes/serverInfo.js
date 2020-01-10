import si from "systeminformation";

async function sysinfo(res) {
  try {
    const currentloaddata = await si.currentLoad();
    const memdata = await si.mem();
    const fsdata = await si.fsSize();
    const networkifsdata = await si.networkInterfaces();
    const servicesdata = await si.services(
      "adobearmservice, cron, adobearmservice, docker",
    );
    const timedata = await si.time();
    const hardDiskData = await si.diskLayout();

    const data = {
      currentLoad: currentloaddata,
      mem: memdata,
      disk: fsdata,
      networkInterfaces: networkifsdata,
      services: servicesdata,
      time: timedata,
      hardDiskSerialNumber: hardDiskData[0].serialNum,
    };

    res.status(200);
    res.json(data);
  } catch (e) {
    console.log(e);
  }
}

export default app => {
  app.route("/serverInfo").get((req, res) => {
    sysinfo(res);
  });
};
