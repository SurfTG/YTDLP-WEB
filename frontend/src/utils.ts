import type { RPCResponse } from "./types"

/**
 * Validate an ip v4 via regex
 * @param {string} ipAddr 
 * @returns ip validity test
 */
export function validateIP(ipAddr: string): boolean {
  let ipRegex = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm
  return ipRegex.test(ipAddr)
}

/**
 * Validate a domain via regex.  
 * The validation pass if the domain respects the following formats:  
 * - localhost
 * - domain.tld
 * - dir.domain.tld
 * @param domainName 
 * @returns domain validity test
 */
export function validateDomain(domainName: string): boolean {
  let domainRegex = /[^@ \t\r\n]+.[^@ \t\r\n]+\.[^@ \t\r\n]+/
  return domainRegex.test(domainName) || domainName === 'localhost'
}

/**
 * Validate a domain via regex.  
 * Exapmples
 * - http://example.com
 * - https://example.com
 * - http://www.example.com
 * - https://www.example.com
 * - http://10.0.0.1/[something]/[something-else]
 * @param url 
 * @returns url validity test
 */
export function isValidURL(url: string): boolean {
  let urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
  return urlRegex.test(url)
}

export function ellipsis(str: string, lim: number): string {
  if (str) {
    return str.length > lim ? `${str.substring(0, lim)}...` : str
  }
  return ''
}

/**
 * Parse the downlaod speed sent by server and converts it to KiB/s
 * @param str the downlaod speed, ex. format: 5 MiB/s => 5000 | 50 KiB/s => 50
 * @returns download speed in KiB/s
 */
export function detectSpeed(str: string): number {
  let effective = str.match(/[\d,]+(\.\d+)?/)![0]
  const unit = str.replace(effective, '')
  switch (unit) {
    case 'MiB/s':
      return Number(effective) * 1000
    case 'KiB/s':
      return Number(effective)
    default:
      return 0
  }
}

export function toFormatArgs(codes: string[]): string {
  if (codes.length > 1) {
    return codes.reduce((v, a) => ` -f ${v}+${a}`)
  }
  if (codes.length === 1) {
    return ` -f ${codes[0]}`
  }
  return ''
}

export function getWebSocketEndpoint() {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
  return `${protocol}://${localStorage.getItem('server-addr') || window.location.hostname}:${localStorage.getItem('server-port') || window.location.port}/rpc/ws`
}

export function getHttpRPCEndpoint() {
  return `${window.location.protocol}//${localStorage.getItem('server-addr') || window.location.hostname}:${localStorage.getItem('server-port') || window.location.port}/rpc/http`
}

export function getHttpEndpoint() {
  return `${window.location.protocol}//${localStorage.getItem('server-addr') || window.location.hostname}:${localStorage.getItem('server-port') || window.location.port}`
}

export function formatGiB(bytes: number) {
  return `${(bytes / 1_000_000_000).toFixed(0)}GiB`
}

export const roundMiB = (bytes: number) => `${(bytes / 1_000_000).toFixed(2)} MiB`
export const formatSpeedMiB = (val: number) => `${roundMiB(val)}/s`

export const datetimeCompareFunc = (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()

export function isRPCResponse(object: any): object is RPCResponse<any> {
  return 'result' in object && 'id' in object
}

export function mapProcessStatus(status: number) {
  switch (status) {
    case 0:
      return 'Pending'
    case 1:
      return 'Downloading'
    case 2:
      return 'Completed'
    case 3:
      return 'Error'
    default:
      return 'Pending'
  }
}