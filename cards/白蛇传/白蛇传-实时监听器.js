// ============================================================
// 白蛇传 · 实时监听器
// ------------------------------------------------------------
// 作用: 让酒馆助手「开发 ‣ 实时监听」能连上, 实现手写 HTML 界面的实时刷新
//   - 静态服务器  : 5500  (serve 本目录, 供 $('body').load() 拉取界面)
//   - socket.io   : 6621  (酒馆助手扩展默认连接的端口)
//   - 文件监听    : 正则/ 目录变化 → 广播刷新事件 → 酒馆界面自动重载
//
// 原理: 与 tavern_helper_template 的 pnpm watch 相同(webpack.config.ts 内
//       置 socket.io 服务), 只是这里不打包, 直接监听手写 HTML 文件.
//
// 启动:  node "白蛇传-实时监听器.js"
// 停止:  Ctrl+C
//
// 依赖:  socket.io —— 从本机 tavern_helper_template 的 node_modules 加载,
//        若该路径不存在, 可用环境变量 SOCKET_IO_PATH 指定.
// ============================================================

const path = require('path');
const http = require('http');
const fs = require('fs');

const ROOT = __dirname;
const WATCH_DIR = path.join(ROOT, '正则');
const STATIC_PORT = 5500;
const SOCKET_PORT = 6621;
const DEBOUNCE_MS = 300;

// ---------- 依赖定位: 优先环境变量, 其次探测模板仓库 ----------
function resolveModule(name) {
  if (process.env.SOCKET_IO_PATH) {
    const p = path.join(process.env.SOCKET_IO_PATH, name);
    if (fs.existsSync(p)) return p;
  }
  const candidates = [
    path.join(__dirname, 'node_modules', name),
    path.join(__dirname, '..', '..', '..', '参考', 'tavern_helper_template', 'node_modules', name),
    path.join(__dirname, '..', '..', '..', '..', '参考', 'tavern_helper_template', 'node_modules', name),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

const socketIoPath = resolveModule('socket.io');
if (!socketIoPath) {
  console.error('[实时监听] 找不到 socket.io, 请确认已 clone tavern_helper_template 并 pnpm install');
  process.exit(1);
}
const { Server } = require(socketIoPath);

// ---------- 静态服务器 ----------
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  try {
    let pathname;
    try {
      pathname = decodeURIComponent(req.url.split('?')[0]);
    } catch {
      pathname = req.url.split('?')[0];
    }
    if (pathname === '/') pathname = '/index.html';
    const filePath = path.join(ROOT, pathname);
    // 防目录穿越
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }
    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        res.writeHead(404, { 'Access-Control-Allow-Origin': '*' });
        return res.end('Not Found');
      }
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream',
        'Access-Control-Allow-Origin': '*', // 允许酒馆(localhost:8080)跨端口加载界面
        'Cache-Control': 'no-cache, no-store', // 实时开发: 禁用缓存, 保证拿到最新文件
      });
      fs.createReadStream(filePath).pipe(res);
    });
  } catch (e) {
    res.writeHead(500);
    res.end(String(e));
  }
});
server.listen(STATIC_PORT, '127.0.0.1', () => {
  console.log(`[实时监听] 静态服务器:  http://127.0.0.1:${STATIC_PORT}/  (仅供本机访问)`);
});

// ---------- socket.io 服务(6621) ----------
const io = new Server(SOCKET_PORT, { cors: { origin: '*' } });
io.on('connect', (socket) => {
  console.info(`[实时监听] 酒馆网页已连接 (${socket.id}), 初始化推送...`);
  io.emit('iframe_updated'); // 刚连上先刷新一次, 与模板行为一致
  socket.on('disconnect', () => console.info(`[实时监听] 酒馆网页断开连接 (${socket.id})`));
});
console.log(`[实时监听] socket.io 服务:  ws://localhost:${SOCKET_PORT}  (酒馆助手实时监听连接点)`);

// ---------- 文件监听 ----------
let timer = null;
const broadcast = () => {
  io.emit('message_iframe_updated'); // 前端界面刷新
  io.emit('script_iframe_updated');  // 脚本刷新
  console.log('[实时监听] 检测到文件变化, 已推送刷新事件');
};
const onFileChange = (type, file) => {
  clearTimeout(timer);
  timer = setTimeout(broadcast, DEBOUNCE_MS);
};

try {
  fs.watch(WATCH_DIR, { recursive: true }, onFileChange);
  console.log(`[实时监听] 正在监听: ${WATCH_DIR}  (修改 html 保存后酒馆自动刷新)`);
} catch (e) {
  console.error(`[实时监听] 监听失败: ${e.message}`);
  process.exit(1);
}
