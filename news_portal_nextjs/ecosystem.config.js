module.exports = {
  apps: [
    {
      name: "frontend-ui",
      cwd: "/root/news/news_portal_nextjs",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3001
      }
    }
  ]
};

