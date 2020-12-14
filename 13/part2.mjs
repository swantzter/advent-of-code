import { readFileSync } from 'fs'

let [_, busses] = readFileSync('./input.txt', { encoding: 'utf-8' })
  .split('\n')

busses = busses.split(',')

const modInverse = (a,m) => {
    let g = gcd(a, m);

    if(g != 1n){
        console.log("No Inverse");
    } else {
        return power(a,m-2n,m)
    }
}

const power = (x, y, m) => {
    if(y===0n) return 1n;

    let p = power(x, y/2n, m) % m;
    p = (p*p) % m;

    if(y%2n === 0n) return p;
    else return ((x*p) % m);
}

const gcd = (a,b) => {
    if(a===0n) return b;
    return gcd(b%a, a)
}

// I had to take a hint here for the chinese remainder theorem
let N = 1n
let sum = 0n

for (let idx = 0; idx < busses.length; idx++) {
  if (busses[idx] === 'x') continue
  N *= BigInt(busses[idx])
}

for (let idx = 0; idx < busses.length; idx++) {
  if (busses[idx] === 'x') continue
  let bus = BigInt(busses[idx])

  let Ni = N / bus

  let b = 0n
  if (idx !== 0) b = bus - BigInt(idx)

  let x = modInverse(Ni, bus)

  sum += Ni * b * x
}

console.log(sum - (sum / N) * N)
