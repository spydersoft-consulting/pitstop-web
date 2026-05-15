import type { RootState } from "./store";

const STATE_KEY = "pitstop_state";
const STATE_VERSION = 3;

interface VersionedState {
  version: number;
  state: Partial<RootState>;
}

function isValidState(state: Partial<RootState>): boolean {
  if (state.vehicles !== undefined && !Array.isArray(state.vehicles.vehicles))
    return false;
  if (
    state.fillUps !== undefined &&
    !Array.isArray(state.fillUps.recentFillUps)
  )
    return false;
  return true;
}

export function loadState(): Partial<RootState> | undefined {
  try {
    const serialized = localStorage.getItem(STATE_KEY);
    if (!serialized) return undefined;
    const parsed = JSON.parse(serialized) as
      | VersionedState
      | Partial<RootState>;
    if (!("version" in parsed) || parsed.version !== STATE_VERSION)
      return undefined;
    if (!isValidState(parsed.state)) return undefined;
    return parsed.state;
  } catch {
    return undefined;
  }
}

export function saveState(state: RootState): void {
  try {
    const versioned: VersionedState = { version: STATE_VERSION, state };
    localStorage.setItem(STATE_KEY, JSON.stringify(versioned));
  } catch {
    // ignore write errors
  }
}
