import React, { useEffect, useState } from 'react';
import TextSection from 'components/TextSection';
import Layout from 'components/Layout';
import Page from 'components/Page';

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

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    (async function () {
      let data = await fetchPolicy(token);
      setPolicy(data);
    })();
  }, []);

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
    const { make, model, colour, reg } = data ?? '';
    let str = '';
    [make, model, colour, reg].forEach((property) => {
      str = str.concat(`${property} `);
    });
    return str;
  };

  return (
    <Layout>
      <Page title="Policy">
        <TextSection title="Policy reference" text={policy_ref} datatest="policy-ref" />
        <TextSection title="Cover type" text={cover} datatest="cover" />
        <TextSection title="Car" text={getCar(vehicle)} datatest="car" />
        <TextSection title="Address" text={getAddress(address)} datatest="address" />
      </Page>
    </Layout>
  );
};

export default Policy;
