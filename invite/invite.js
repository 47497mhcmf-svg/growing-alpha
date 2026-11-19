"use strict";
// The secret stays in the fragment: never sent to the static host, analytics,
// referrers, cookies or localStorage. No network requests on this page.
const fragment = location.hash.slice(1);
const match = /^adult\/([A-Za-z0-9_-]{1,1500})$/.exec(fragment);
let valid = false;
if (match) {
  try {
    const value = JSON.parse(atob(match[1].replace(/-/g, "+").replace(/_/g, "/")));
    valid = /^[0-9a-f-]{36}$/i.test(value.invite_id) && /^[0-9a-f]{64}$/.test(value.secret);
  } catch (_) { /* Deliberately no payload/error logging. */ }
}
const status = document.getElementById("status");
if (valid) {
  const open = document.getElementById("open");
  open.href = "growing://" + fragment;
  open.hidden = false;
  status.textContent = "Öppna Growing för att ansluta. Familjen godkänner dig innan du väljer namn och PIN.";
} else {
  status.textContent = "Länken är inte en giltig inbjudan. Be familjen skicka den igen.";
}
