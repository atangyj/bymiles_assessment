import React, { useEffect, useState } from 'react';
import withAuth from 'hoc/withAuth';
import TextSection from 'components/TextSection';

const Policy = () => {
  const [policy, setPolicy] = useState(null);

  const fetchPolicy = async (token) => {
    return fetch('https://api.bybits.co.uk/policys/details', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
        environment: 'mock',
      },
    })
      .then((ressponse) => ressponse.json())
      .then((data) => data);
  };

  useEffect(async () => {
    const token = sessionStorage.getItem('token');
    let data = await fetchPolicy(token);
    setPolicy(data);
  }, {});

  const { policy_ref, cover, address } = policy?.policy ?? '';
  const { vehicle } = policy ?? '';

  const getAddress = (data) => {
    let str = '';
    for (const key in data) {
      str = str.concat(`${data[key]}, `);
    }
    return str.slice(0, -2);
  };

  const getCar = (data) => {
    console.log(data);
    const { make, model, colour, reg } = data ?? '';
    let str = '';
    [make, model, colour, reg].forEach((property) => {
      str = str.concat(`${property} `);
    });
    return str;
  };

  return (
    <div>
      <TextSection title="Policy reference" text={policy_ref} />
      <TextSection title="Cover type" text={cover} />
      <TextSection title="Address" text={getAddress(address)} />
      <TextSection title="Car" text={getCar(vehicle)} />
    </div>
  );
};

export default withAuth(Policy);
