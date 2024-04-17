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
  await node_fetch(url, options);
}

async function main() {
  for (let i = 0; i < 1000; i++) {
    await sleep(1000);
    getResult(i).then(() => {
      console.log(`[${new Date().toISOString()}] ${i} Done!!!`);
    }).catch((e)=>{
      console.error(`[${new Date().toISOString()}] ${i} Error!!!`);
    });
  }
}

main().then(() => {
  console.log("Done!");
})