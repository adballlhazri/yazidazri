import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const log = (msg: string) => {
                const logMsg = `[${new Date().toISOString()}] ${msg}\n`;
                fs.appendFileSync(path.resolve(__dirname, 'server.log'), logMsg);
                console.log(msg);
            };

            log(`[REQ] ${req.method} ${req.url}`);
            
            if (req.url === '/api/save-projects' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', () => {
                try {
                  log('[API] Received save-projects request');
                  const { projects, userProfile } = JSON.parse(body);
                  
                  const fileContent = `import { Project, UserProfile } from './types';

export const USER_PROFILE: UserProfile = ${JSON.stringify(userProfile, null, 2)};

export const INITIAL_PROJECTS: Project[] = ${JSON.stringify(projects, null, 2)};
`;
                  const filePath = path.resolve(__dirname, 'constants.ts');
                  log(`[API] Writing to: ${filePath}`);
                  fs.writeFileSync(filePath, fileContent);
                  
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 200;
                  res.end(JSON.stringify({ success: true }));
                  log('[API] Save successful');
                } catch (error: any) {
                  log(`[API] Save Error: ${error.message}`);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: error.message }));
                }
              });
              return;
            }

            if (req.url === '/api/upload-image' && req.method === 'POST') {
                let body = '';
                req.on('data', chunk => { body += chunk; });
                req.on('end', () => {
                  try {
                    log('[API] Received upload-image request');
                    const { fileName, base64Data } = JSON.parse(body);
                    const buffer = Buffer.from(base64Data.split(',')[1], 'base64');
                    const dirPath = path.resolve(__dirname, 'public/images');
                    
                    if (!fs.existsSync(dirPath)) {
                        fs.mkdirSync(dirPath, { recursive: true });
                    }

                    const filePath = path.resolve(dirPath, fileName);
                    log(`[API] Writing image to: ${filePath}`);
                    fs.writeFileSync(filePath, buffer);
                    
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 200;
                    res.end(JSON.stringify({ success: true, path: `/images/${fileName}` }));
                    log('[API] Upload successful');
                  } catch (error: any) {
                    log(`[API] Upload Error: ${error.message}`);
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: error.message }));
                  }
                });
                return;
            }

            next();
          });
        }
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
