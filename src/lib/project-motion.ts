export const PROJECT_LEAVE = {
  sidesMs: 750,
  staggerMs: 50,
  sideSteps: 3,
  centerMs: 750,
  aboutMs: 750,
  markMs: 750,
  sheetMs: 750,
  cornerMs: 750,
} as const;

export function projectSidesLeaveMs() {
  return (
    PROJECT_LEAVE.sidesMs + PROJECT_LEAVE.staggerMs * PROJECT_LEAVE.sideSteps
  );
}
