import os from 'os';
import { stdout } from 'process';
const systemInfo = async arg => {
  const args = ['EOL', 'cpus', 'homedir', 'username', 'architecture'];
  if (args.includes(arg)) {
    if (arg === 'EOL') {
      stdout.write(os.EOL);
    }
    if (arg === 'cpus') {
      let info = os.cpus().map(cpu => cpu.model.trim() + ' ' + parseInt(cpu.speed) / 1000 + ' GHz');
      console.log([`Amount: ${os.cpus().length}`, ...info].join('\n'));
    }
    if (arg === 'homedir') {
      stdout.write(os.homedir().toString());
    }
    if (arg === 'username') {
      stdout.write(os.userInfo().username.toString());
    }
    if (arg === 'architecture') {
      stdout.write(os.arch().toString());
    }
  } else {
    stdout.write('Invalid input');
  }
  stdout.write('\n');
};

export default systemInfo;
