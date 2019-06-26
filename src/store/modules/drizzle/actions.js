// Bootstrap Action to inject Drizzle instance into state
export const STARTUP = ({ commit }, payload) => commit('STARTUP', payload)

// Drizzle has been initialized
export const INITIALIZE = ({ commit }) => commit('INITIALIZE')

// A component is registering it's contract and method
export const REGISTER_CONTRACT = ({ commit, dispatch, rootState }, payload) => {
  commit('REGISTER_CONTRACT', payload)

  if (rootState.drizzle.initialized) {
    dispatch('PROCESS_REGISTRATION_Q')
  }
}

const getCacheKey = (drizzleInstance, contractName, method, methodArgs) => {
  methodArgs = [...methodArgs]
  method = methodArgs.length ? `${method}(uint256)` : method
  console.group('getCacheKey')
  console.log('di', drizzleInstance)
  console.log('contractName', contractName)
  console.log('method', method)
  console.log('methodArgs', methodArgs)
  const displayArgs = [...methodArgs].join(',')
  console.log(
    `drizzleInstance.contracts[${contractName}].methods[${method}].cacheCall(${displayArgs})`
  )
  const { methods } = drizzleInstance.contracts[contractName]
  console.log('methods...', Object.keys(methods))

  console.groupEnd()
  let cacheKey = '0x0'

  try {
    cacheKey = drizzleInstance.contracts[contractName].methods[
      method
    ].cacheCall(...methodArgs)
  } catch (e) {
    console.log('OOPS', e)
    console.log('di', drizzleInstance)
  }

  return cacheKey
}

// get cacheKey for all contracts/methods
export const PROCESS_REGISTRATION_Q = ({
  commit,
  dispatch,
  state,
  rootState
}) => {
  const registrationQ = state.registrationQ
  const { drizzleInstance } = rootState.drizzle

  for (let { contractName, method, methodArgs } of registrationQ) {
    dispatch(
      'contracts/SET_CACHEKEY',
      {
        contractName,
        method,
        cacheKey: getCacheKey(drizzleInstance, contractName, method, methodArgs)
      },
      { root: true }
    )
  }
  commit('EMPTY_REGISTRATION_Q')
}
