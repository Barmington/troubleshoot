import { useState, useEffect } from 'react';
import UpgradeBtn from './UpgradeBtn.jsx';

export default function App() {
  const upgrades = [
    {
      id: 1,
      name: 'Auto-Clicker',
      cost: 100,
      increase: 1,
    },
    { id: 2, name: 'Enhanced Oven', cost: 500, increase: 5 },
    {
      id: 3,
      name: 'Cookie Farm',
      cost: 1000,
      increase: 10,
    },
    {
      id: 4,
      name: 'Robot Baker',
      cost: 2000,
      increase: 20,
    },
    {
      id: 5,
      name: 'Cookie Factory',
      cost: 5000,
      increase: 50,
    },
    {
      id: 6,
      name: 'Magic Flour',
      cost: 10000,
      increase: 100,
    },
    {
      id: 7,
      name: 'Time Machine',
      cost: 20000,
      increase: 200,
    },
    {
      id: 8,
      name: 'Quantum Oven',
      cost: 50000,
      increase: 500,
    },
    {
      id: 9,
      name: 'Alien Technology',
      cost: 100000,
      increase: 1000,
    },
    {
      id: 10,
      name: 'Interdimensional Baker',
      cost: 200000,
      increase: 2000,
    },
  ];

  const [cookies, setCookies] = useState(
    Number(localStorage.getItem('cookies')) || 0
  );
  const [cps, setCps] = useState(1);

  useEffect(() => {
    // async function getLevels() {
    //   const response = await fetch(
    //     'https://cookie-upgrade-api.vercel.app/api/upgrades'
    //   );
    //   const data = await response.json();
    //   setLevels(data);

    //   console.log(data);
    // }

    // getLevels();

    const interval = setInterval(() => {
      setCookies(current => current + cps);
    }, 1000);

    return () => clearInterval(interval);
  }, [cps]);

  useEffect(() => {
    localStorage.setItem('cookies', JSON.stringify(cookies));
  }, [cookies]);

  useEffect(() => {
    localStorage.setItem('cps', JSON.stringify(cps));
  }, [cps]);

  function cookieMultiplier() {
    setCookies(cookies + 1);
  }

  function handleUpgrade(upgrades) {
    console.log();
    if (cookies >= upgrades.cost) {
      setCps(cps + upgrades.increase);
      setCookies(cookies - upgrades.cost);
    }
  }

  return (
    <div>
      <h1>Upgrade Levels</h1>
      <p>{cookies}</p>
      <p>{cps}</p>
      <button onClick={cookieMultiplier}>Get Cookies</button>

      {upgrades.map(upgrade => {
        // console.log(upgrades);
        return (
          <div key={upgrade.id}>
            <h2>{upgrade.name}</h2>
            <p>{upgrade.cost}</p>
            <UpgradeBtn
              upgrades={upgrades}
              cookies={cookies}
              handleUpgrade={handleUpgrade}
            />
          </div>
        );
      })}
    </div>
  );
}
