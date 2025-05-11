export const objectToParams = (data: any) => {
  return Object.keys(data)
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)
    .join('&')
}
export const convertToMoneyFormat = (val: any) => {
  val = !parseFloat(val) ? 0 : parseFloat(val)
  return '$' + val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
export const convertMoneyToDouble = (val: any) => {
  return Number(val.replace(/[^0-9\.]+/g, ''))
}
export const stripTag = (str: any) => {
  return str.toString().replace(/(<([^>]+)>)/gi, '')
}
export const parseNumber = (num: any) => {
  return !parseInt(num) ? 0 : parseInt(num)
}
export const isNumber = (value: any) => {
  return !isNaN(value) && isFinite(value)
}
export const generateInvoiceNumber = (num: number | undefined) => {
  return num ? `00000000${num}`.substring(num.toString().length) : '00000000'
}
export const parseString = (value: any) => {
  return value ? value : '-'
}
export const validateEmail = (email: string) => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).trim().toLowerCase())
}
export const validateUrl = (url: string) =>
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(
    url
  )
export const objectEquals = (x: any, y: any) => {
  if (x === y) return true
  // if both x and y are null or undefined and exactly the same
  if (!(x instanceof Object) || !(y instanceof Object)) return false
  // if they are not strictly equal, they both need to be Objects
  if (x.constructor !== y.constructor) return false
  // they must have the exact same prototype chain, the closest we can do is test there constructor.
  for (var p in x) {
    if (!x.hasOwnProperty(p)) continue
    // other properties were tested using x.constructor === y.constructor
    if (!y.hasOwnProperty(p)) return false
    // allows to compare x[ p ] and y[ p ] when set to undefined
    if (x[p] === y[p]) continue
    // if they have the same strict value or identity then they are equal
    if (typeof x[p] !== 'object') return false
    // Numbers, Strings, Functions, Booleans must be strictly equal
    if (!objectEquals(x[p], y[p])) return false
    // Objects and Arrays must be tested recursively
  }
  for (p in y) if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false
  // allows x[ p ] to be set to undefined
  return true
}

export const splitCamelCaseWord = (word: string) => {
  return word.replace(/([a-z](?=[A-Z]))/g, '$1 ')
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts: string[] = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
}

export function setCookie(name: any, value: any, days: any) {
  var expires = ''
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

export function getAllCookies() {
  var pairs = document.cookie.split(';')
  var cookies: any = {}
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=')
    cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='))
  }
  return cookies
}

export const deleteCookie = (name: string, path: string, domain: string) => {
  if (getCookie(name)) {
    document.cookie =
      name +
      '=' +
      (path ? ';path=' + path : '') +
      (domain ? ';domain=' + domain : '') +
      ';expires=Thu, 01 Jan 1970 00:00:01 GMT'
  }
}

export const getCountOfDigits = (str: string) => {
  return str.match(/\d/g)?.length || 0
}

export const hasUpperAndLowerCaseLetter = (str: string) => {
  const upper = /[A-Z]/.test(str),
    lower = /[a-z]/.test(str)
  return upper && lower
}

export const hasSpecialCharacters = (str: string) => {
  return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str)
}

export const reactQueryBasicConfig = () => {
  return {
    retry: 1,
    staleTime: 1800000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  }
}

export const diff = (first_obj: any, second_obj: any) => {
  return Object.fromEntries(
    Object.entries(second_obj).filter(([key, val]) => key in first_obj && first_obj[key] !== val)
  )
}
export const downloadBlobFile = (res: any, fileName: string) => {
  const type = res.headers['content-type']
  const url = window.URL.createObjectURL(new Blob([res.data], {type}))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${fileName}`)
  document.body.appendChild(link)
  link.click()
  link.remove()
}
export const toSentenceCase = (str: string) => {
  return str
    .split('. ')
    .map((e) => e.charAt(0).toUpperCase() + e.substring(1).toLowerCase())
    .join('. ')
}

export const copyToClipboard = (text: string) => {
  // navigator.clipboard.writeText(text)
  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  try {
    document.execCommand('copy')
  } catch (err) {
    console.error('Unable to copy to clipboard', err)
  }
  document.body.removeChild(textArea)
}

export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key)
}

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}
export const removeAllLocalStorage = () => {
  localStorage.clear()
}

export const downloadFileFromLink = (link: string, fileName: string) => {
  var request = new XMLHttpRequest()
  request.open('GET', link, true)
  request.responseType = 'blob'
  request.onload = function () {
    var reader = new FileReader()
    reader.readAsDataURL(request.response)
    reader.onload = function (e: any) {
      var a = document.createElement('a')
      a.href = e.target.result
      a.download = fileName
      a.click()
    }
  }
  request.send()
}

export const replaceUnderlineWithSpace = (string: string) => {
  return string.replace(/_/g, ' ')
}
export const replaceVirtualSpaceWithSpace = (string: string) => {
  return string.replace(/&zwnj;/g, ' ')
}

export const encodeString = (text: string) => {
  return window.btoa(text)
}

export const decodeString = (text: string) => {
  return window.atob(text)
}

export const buildFormData = (formData: any, data: any, parentKey: any) => {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach((key) => {
      buildFormData(formData, data[key], key)
    })
  } else {
    const value = data === null ? '' : data
    formData.append(parentKey, value)
  }
}
export const convertToFormData = (data: any) => {
  const formData = new FormData()
  buildFormData(formData, data, false)
  return formData
}

export const getSignaturePath = (path: any) => {
  // const API_URL = process.env.REACT_APP_URL+path

  // "\\/nezarat/53deeaed423de57bd537/m.cruc@yahoo.com.JPG"

  return process.env.REACT_APP_URL + path
}

export const roundNumber = (num: number) => {
  return Math.round((Number(num) + Number.EPSILON) * 100) / 100
}

export const getTextFromHtml = (html: any) => {
  var divContainer = document.createElement('div')
  divContainer.innerHTML = html
  return divContainer.textContent || divContainer.innerText || ''
}
