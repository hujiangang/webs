import http.server
import socketserver
import os

# 设置端口号
# 如果设置为 80，访问时不需要加端口号（如 http://127.0.0.1/a.json）
# 如果 80 端口被占用或没权限，请改用 8000
PORT = 8000

# 确保脚本在 a.json 所在的目录下运行
# Handler 会自动处理当前目录下的文件请求
Handler = http.server.SimpleHTTPRequestHandler

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"服务器已启动：http://127.0.0.1:{PORT}")
        print("按下 Ctrl+C 停止服务器")
        httpd.serve_forever()
except PermissionError:
    print(f"错误：端口 {PORT} 需要管理员权限（sudo）。请尝试修改 PORT = 8000")
except OSError:
    print(f"错误：端口 {PORT} 可能已被占用。")