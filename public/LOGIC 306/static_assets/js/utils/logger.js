const isDev = true
export const logger = {
  log: (...args) => {
    if (isDev) {
      console.log(...args)
    }
  },
  warn: (...args) => {
    if (isDev) {
      console.warn(...args)
    }
  },
  info: (...args) => {
    if (isDev) {
      console.info(...args)
    }
  },
  error: (...args) => {
    try {
      firebaseLogEvent &&
        firebaseLogEvent('log', {
          level: 'error',
          message: args
            .map(arg => (typeof arg === 'string' ? arg : JSON.stringify(arg)))
            .join(' '),
          stack: new Error().stack || 'no stack trace',
        })
    } catch (e) {
      console.error('Failed to send log to firebase:', e)
    }
    console.error(...args)
  }, // luôn in ra
  sendLog(level, ...args) {
    try {
      firebaseLogEvent &&
        firebaseLogEvent('log', {
          level: level,
          message: args
            .map(arg => (typeof arg === 'string' ? arg : JSON.stringify(arg)))
            .join(' '),
          stack: new Error().stack || 'no stack trace',
        })
    } catch (e) {
      console.error('Failed to send log to firebase:', e)
    }
  },
}

window.ttbl_logger = logger
