import { selector } from 'recoil'
import { RPCClient } from '../lib/rpcClient'
import { rpcHTTPEndpoint, rpcWebSocketEndpoint } from './settings'

export const rpcClientState = selector({
  key: 'rpcClientState',
  get: ({ get }) =>
    new RPCClient(
      get(rpcHTTPEndpoint),
      get(rpcWebSocketEndpoint),
      localStorage.getItem('token') ?? ''
    ),
  dangerouslyAllowMutability: true,
})
