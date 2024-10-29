import { v4 as uuidv4 } from 'uuid';

export const createSession = () => {
  const sessionId = uuidv4();
  const sessionUrl = `${window.location.origin}${window.location.pathname}#session=${sessionId}`;
  return { sessionId, sessionUrl };
};

export const getSessionFromUrl = () => {
  const hash = window.location.hash;
  const sessionMatch = hash.match(/session=([^&]*)/);
  return sessionMatch ? sessionMatch[1] : null;
};

export const saveSessionData = (sessionId, data) => {
  localStorage.setItem(`calc_session_${sessionId}`, JSON.stringify(data));
};

export const getSessionData = (sessionId) => {
  const data = localStorage.getItem(`calc_session_${sessionId}`);
  return data ? JSON.parse(data) : null;
};
