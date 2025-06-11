import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '1m', target: 0 }, 
    { duration: '1m', target: 10 },
    { duration: '2m', target: 100 },
    { duration: '3m', target: 500 },
    { duration: '4m', target: 1000 },
  ],
};

const sizes = ['10kb', '100kb', '1mb'];
const formats = ['html', 'txt'];

export default function () {
  const size = sizes[Math.floor(Math.random() * sizes.length)];
  const format = formats[Math.floor(Math.random() * formats.length)];
  const url = `http://localhost:3000/file/${size}?format=${format}`;

  let res = http.get(url);
  let success = check(res, {
    'status is 200': (r) => r.status === 200,
  });

  errorRate.add(!success);

  sleep(1);
}
