import fs from 'fs';
import app from '../app';
import PeersController from './peers';
import ProfilesController from './profiles';
import OutRoutesController from './outRoutes';
import TrunksController from './trunks';
import Ami from './ami';


function writeToFile(str, file, reload, mode) {
  fs.open(file, mode, (err, fd) => {
    if (err) throw err;
    fs.appendFile(file, str, (err1) => {
      if (err1) throw err1;
    });
    fs.close(fd, (err2) => {
      if (err2) throw err2;
      if (reload !== '') {
        Ami.sendAmiCommand(reload);
      }
    });
  });
}

// WRITE PEERS TO FILE AND RELOAD ASTERISK SIP/IAX
exports.writePeersToFile = function writePeersToFile() {
  const peersController = new PeersController(
    app.datasource.models.Peers,
    app.datasource.models.Profiles,
    app.datasource.models.Categories,
    app.datasource.models.Groups,
  );

  let strPeer = '';
  peersController.getAll().then((allPeers) => {
    allPeers.data.forEach((peer) => {
      let strGroups = '';
      peer.Groups.forEach((group) => {
        strGroups += `${group.id},`;
      });
      let lock = 'setVar=CADEADO=\n';
      if (peer.Category.lock) {
        lock = 'setVar=CADEADO=sim\n';
      }
      let followme = 'setVar=SIGAME=\n';
      if (peer.Category.followme) {
        followme = 'setVar=SIGAME=sim\n';
      }
      const strPeerTmp = `[${peer.username}]\nusername=${peer.username}\nsecret=${peer.secret}\ncallerid=${peer.name} <${peer.username}>\nhost=dynamic\ntype=friend\nqualify=yes\ncontext=${peer.profileId}\ncallgroup=${strGroups}\npickupgroup=${strGroups}\ncallcounter=yes\ncall-limit=${peer.Category.callLimit}\n${lock}${followme}setVar=GRAVA=${peer.Category.monitor}\nsession-timers=originate\nsession-time=1800\nsession-minse=90\nsession-refresher=uac\n\n`;
      strPeer += strPeerTmp;
    });

    writeToFile(strPeer, app.config.iaxPeers, 'iax2 reload', 'w');
    writeToFile(strPeer, app.config.sipPeers, 'sip reload', 'w');
  });
};

// WRITE PROFILES TO FILE AND RELOAD ASTERISK DIALPLAN
exports.writeProfilesToFile = function writeProfilesToFile() {
  const profilesController = new ProfilesController(
    app.datasource.models.Profiles,
    app.datasource.models.OutRoutes,
  );

  let strProfile = '';
  profilesController.getAll().then((allProfiles) => {
    allProfiles.data.forEach((profile) => {
      let strOutRoutes = '';
      profile.OutRoutes.forEach((outRoute) => {
        strOutRoutes += `include => out-${outRoute.id}\n`;
      });

      const strProfileTmp = `[${profile.id}]\ninclude=>interno\n${strOutRoutes}\n`;
      strProfile += strProfileTmp;
    });

    writeToFile(strProfile, app.config.profiles, 'dialplan reload', 'w');
  });
};

// WRITE OUT ROUTES TO FILE AND RELOAD ASTERISK DIALPLAN
exports.writeOutRoutesToFile = function writeOutRoutesToFile() {
  const outRoutesController = new OutRoutesController(
    app.datasource.models.OutRoutes,
    app.datasource.models.OutRoutesDetails,
  );

  const trunksController = new TrunksController(app.datasource.models.Trunks);

  outRoutesController.getAll().then((allOutRoutes) => {
    writeToFile('', app.config.outRoutes, '', 'w');
    allOutRoutes.data.forEach((outRoute) => {
      const strOutRouteContext = `[out-${outRoute.id}]\n`;
      let strOutRoutesDetails = '';
      let strOutRoutes = '';
      strOutRoutes += strOutRouteContext;
      outRoute.OutRouteDetails.forEach((outRouteDetails) => {
        let externalCode = '';
        if (outRouteDetails.externalCode) {
          externalCode = '${LIGEXTERNAS}';
        }

        let callType = '';
        switch (outRouteDetails.callType) {
          case 'local_fixo':
            callType = 'Local Fixo';
            break;
          case 'ddd_fixo':
            callType = 'DDD Fixo';
            break;
          case 'local_cel':
          case 'local_cel9':
            callType = 'Local Celular';
            break;
          case 'ddd_cel':
          case 'ddd_cel9':
            callType = 'DDD Celular';
            break;
          case 'ddi':
            callType = 'DDI';
            break;
          case 'servicos':
            callType = 'Serviços / Emergências';
            break;
          case 'outros':
          default:
            callType = 'Outros';
            break;
        }

        let remove = externalCode.length;
        if (outRouteDetails.remove) {
          remove += outRouteDetails.remove;
        }

        let strTrunk = '';
        trunksController.getById(outRouteDetails.trunkId).then((trunk) => {
          if (trunk.data.type === 'KHOMP') {
            strTrunk = `KHOMP/${trunk.data.name}`;
          } else {
            strTrunk = `SIP/${trunk.data.user}`;
          }
          strOutRoutesDetails = `exten => _${externalCode}${outRouteDetails.mask},1,Macro(ligacao-externa,\${CALLERID(num)}),${outRouteDetails.add}${outRouteDetails.csp}\${EXTEN:${remove}},\${EXTEN},${callType},${strTrunk})\n`;
          strOutRoutes += strOutRoutesDetails;
          writeToFile(strOutRoutes, app.config.outRoutes, 'dialplan reload', 'a');
          strOutRoutes = '';
        });
      });
    });
  });
};
