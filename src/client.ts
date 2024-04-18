const node_fetch = require('node-fetch');

function sleep(milliSec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, milliSec);
  });
}

async function getResult(i) {
  const url = `http://localhost:3000/test`;
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({i: i}),
  };
  return await node_fetch(url, options);
}

async function main() {
  for (let i = 0; i < 1000; i++) {
    await sleep(1000);
    console.log(`[${new Date().toISOString()}][INFO] ${i} ...`);
    getResult(i).then((res) => {
      if (res.status !== 200) {
        console.error(`[${new Date().toISOString()}][ERROR] ${i} Error!!!`);
      } else {
        console.log(`[${new Date().toISOString()}][INFO] ${i} Done!!!`);
      }
    }).catch((e) => {
      console.error(`[${new Date().toISOString()}][ERROR] ${i} Error!!!`);
    });
  }
}

main().then(() => {
  console.log("Done!");
})