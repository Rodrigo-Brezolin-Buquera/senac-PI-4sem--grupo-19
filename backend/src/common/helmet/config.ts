import helmet from 'helmet';

export const helmetConfig = helmet({
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  });
