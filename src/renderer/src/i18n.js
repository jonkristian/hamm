import { derived, writable } from "svelte/store";
import translations from "./translations";

export const locale = writable('en');
export const locales = Object.keys(translations);

function translate(locale, key, vars) {
  if (!locale) {
    return key;
  }

  // Grab the translation from the translations object.
  let text = translations[locale][key];

  if (!text) {
    return key;
  }

  // Replace any passed in variables in the translation string.
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]);
  });

  return text;
}

export const t = derived(locale, ($locale) => (key, vars = {}) =>
  translate($locale, key, vars)
);
