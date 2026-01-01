export class RecreationFData {
  sessionId: string = "";
  trialIndex: number = 0;
  stimulus: string[] = []; // ['left', 'left', 'right', 'left', 'left']
  isCongruent: boolean = false;
  timestamp: Date = new Date;
}
