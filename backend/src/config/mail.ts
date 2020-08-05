interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'contact@ferreiracode.com',
      name: 'Ferreira Code Team',
    },
  },
} as IMailConfig;
