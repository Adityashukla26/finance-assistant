/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localost:3000/:path*', // The :path parameter is used here so will not be automatically passed in the query
      },
    ]
  },

}
module.exports = nextConfig
