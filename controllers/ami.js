import AsteriskManager from 'asterisk-manager';
import app from '../app';

exports.sendAmiCommand = function sendAmiCommand(command) {
  const ami = new AsteriskManager(
    app.config.amiPort,
    app.config.amiHost,
    app.config.amiUser,
    app.config.amiPassword,
    true,
  );
  ami.action({
    Action: 'Command',
    Command: command,
  });
  ami.action({
    Action: 'Logoff',
  });
};
