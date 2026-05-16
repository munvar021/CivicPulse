module.exports = {
  apps: [
    {
      name: "civicpulse-api",
      script: "server.js",

      // Fork mode is best for a single instance on Render free tier (512 MB RAM).
      // Switch to exec_mode: 'cluster' + instances: 'max' on a paid plan.
      instances: 1,
      exec_mode: "fork",

      // Restart the process automatically if it crashes
      autorestart: true,
      watch: false,

      // Kill and restart if RAM exceeds 450 MB (Render free tier cap is 512 MB)
      max_memory_restart: "450M",

      // Exponential back-off on repeated crashes (prevents restart loops)
      exp_backoff_restart_delay: 100,
      max_restarts: 10,

      // Route logs to container stdout/stderr so Render captures them
      error_file: "/dev/stderr",
      out_file: "/dev/stdout",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",

      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
