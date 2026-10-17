import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        // trang viewer luôn được kiểm tra lại để người dùng nhận bản mới ngay sau khi triển khai
        source: '/apartment-floorplan/index.html',
        headers: [{ key: 'Cache-Control', value: 'no-cache, must-revalidate' }],
      },
      {
        // tệp trong assets/ có băm nội dung trong tên nên cache vô thời hạn là an toàn
        source: '/apartment-floorplan/assets/:file*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
