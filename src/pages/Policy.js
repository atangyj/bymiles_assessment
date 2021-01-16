import React, { useEffect, useState } from 'react';
import TextSection from 'components/TextSection';
import Layout from 'components/Layout';
import Page from 'components/Page';
import ErrorMessage from 'components/ErrorMessage';

const Policy = () => {
  const [policy, setPolicy] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchPolicy = async (token) => {
    return fetch('https://api.bybits.co.uk/policys/details', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
        environment: 'mock',
      },
    }).then((response) => {
      if (!response.ok) {
        throw 'Network response was not ok';
      }
      return response.json();
    });
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    (async function () {
      try {
        let policy = await fetchPolicy(token);
        setPolicy(policy);
      } catch (e) {
        console.log(e);
        setErrorMessage(e);
      }
    })();
  }, []);

  const { policy_ref = '', cover = '', address = '' } = policy?.policy ?? '';
  const { vehicle = '' } = policy ?? '';

  const getAddress = (data) => {
    const { line_1 = '', line_2 = '', line_3 = '', postcode = '' } = data ?? '';
    return [line_1, line_2, line_3, postcode].join(', ');
  };

  const getCar = (data) => {
    const { make = '', model = '', colour = '', reg = '' } = data ?? '';
    return [make, model, colour, reg].join(' ');
  };

  return (
    <Layout>
      <Page title="Policy">
        {policy ? (
          <>
            <TextSection
              title="Policy reference"
              text={policy_ref}
              datatest="policy-ref"
            />
            <TextSection title="Cover type" text={cover} datatest="cover" />
            <TextSection title="Car" text={getCar(vehicle)} datatest="car" />
            <TextSection
              title="Address"
              text={getAddress(address)}
              datatest="address"
            />
          </>
        ) : (
          <ErrorMessage error={errorMessage} />
        )}
      </Page>
    </Layout>
  );
};

export default Policy;
