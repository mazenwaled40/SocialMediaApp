import chalk from "chalk"; 

import redis from "redis"


export const redisclient = redis.createClient({
    url:redis://localhost:6379
})


redisclient.on("error", (err) => {
    console.log(chalk.yellow("redis connection failed:"), err);
});

redisclient.on("connect", () => {
    console.log(chalk.green("Redis connected successfully"));
});