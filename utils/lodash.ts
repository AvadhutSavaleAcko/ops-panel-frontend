export function isEmpty(value: any): boolean {
  if (!value) {
    return true;
  }
  const valType = typeof value;

  if (valType === "string") {
    return !value.length;
  }

  if (valType === "object") {
    return !Object.keys(value).length;
  }

  return true;
}

// Checks if all values in an object are empty (null, undefined, or empty string).
export function isObjectEmpty(obj: Record<string, any>): boolean {
  if (!obj || Object.keys(obj).length === 0) {
    return true;
  }

  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      return false;
    }
  }
  return true;
}

export function isArray(value: any): boolean {
  return Array.isArray(value);
}

export function isEqual(obj1: any, obj2: any): boolean {
  let equal = true;

  const firstEntries = Object.entries(obj1);
  const secondEntries = Object.entries(obj2);

  if (firstEntries.length !== secondEntries.length) {
    return false;
  }

  /* eslint-disable */
  for (const [key, value] of firstEntries) {
    if (obj2[key] === undefined) {
      equal = false;
      break;
    }

    if (obj2[key] !== value) {
      equal = false;
      break;
    }
  }

  return equal;
  /* eslint-enable */
}

export function invert(value: any) {
  if (typeof value !== "object") {
    return value;
  }

  const returnVal = {};

  Object.entries(value).forEach(([key, val]) => {
    //@ts-ignore
    returnVal[(val as any)?.toString()] = key;
  });

  return returnVal;
}

export function pickBy(obj: any, predicate: Function) {
  const returnObj: any = {};

  Object.entries(obj).forEach(([key, value]: any) => {
    if (predicate(value, key)) {
      returnObj[key] = value;
    }
  });

  return returnObj;
}

export function remove(arr: any, predicate: Function) {
  let idx = arr.length - 1;

  while (idx >= 0) {
    if (predicate(arr[idx])) {
      arr.splice(idx, 1);
    }

    idx -= 1;
  }
}

export function debounce(func: any, wait = 0, options?: any) {
  let lastArgs: any;
  let lastThis: any;
  let maxWait: any;
  let result: any;
  let timerId: any;
  let lastCallTime: any;
  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  function invokeFunc(time: any) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastThis = undefined;
    lastArgs = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function trailingEdge(time: any) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastThis = undefined;
    lastArgs = undefined;
    return result;
  }

  function shouldInvoke(time: any) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  function remainingWait(time: any) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
    return null;
  }

  if (typeof options === "object") {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? Math.max(Number(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }

  function leadingEdge(time: any) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastThis = undefined;
    lastArgs = undefined;
    lastCallTime = undefined;
    timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function debounced(this: any, ...args: any) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    // eslint-disable-next-line
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
