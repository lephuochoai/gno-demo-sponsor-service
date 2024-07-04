import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

type Props = {};
export const useMintBySponsor = (props?: UseMutationOptions<Props>) => {
  return useMutation<any, Error, any>({
    mutationFn: async ({ transaction, endPointUrl }) => {
      const response = await fetch(`${endPointUrl}v1/sponsor/transfer`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body: transaction,
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      return json;
    },
    ...props,
  });
};

export const mockTransaction = {
  msg: [
    {
      '@type': '/vm.m_noop',
      caller: 'g1sdrs4fppd0409pxnud98vdqyse7qyfsqjyacy4',
    },
    {
      '@type': '/vm.m_call',
      caller: 'g19xxuv9mn20kzj3r2q4srwu2wl3sut96xnxudqu',
      send: '',
      pkg_path: 'gno.land/r/demo/deep/very/deep',
      func: 'Render',
      args: [''],
    },
  ],
  fee: {
    gas_wanted: '1000000',
    gas_fee: '1000000ugnot',
  },
  signatures: [
    {
      pub_key: null,
      signature: null,
    },
    {
      pub_key: {
        '@type': '/tm.PubKeySecp256k1',
        value: 'AgxqMeZJALKIQkk3xaacy9jEteeSnZDM+i4hcT1PC1uY',
      },
      signature: '4kUN321uPkF7l4PY0myz02ZiWxA30phdEc+mODchVT83ahHCWkGuHdw1oODVDQKh6HwvbTWTL9VXnt2UwmnjSg==',
    },
  ],
  memo: '',
};
