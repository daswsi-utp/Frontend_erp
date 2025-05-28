import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str
  }
  return str.substring(0, maxLength) + "..."
}

export function getDomain(url) {
  let regex = /(?:https?:\/\/)?(?:www\.)?([^/]+)/
  let matches = url.match(regex)
  if (matches && matches.length > 1) {
    return matches[1]
  } else {
    return null
  }
}

export function copyToClipboard(texto) {
  copy(texto)
}