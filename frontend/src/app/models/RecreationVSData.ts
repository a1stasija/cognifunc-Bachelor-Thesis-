import { VisualItem } from './VisualItem';

export class RecreationVSData {
  sessionId: string;
  iteration: number;
  timestamp: Date;
  items: VisualItem[];

  constructor(
    sessionId: string,
    iteration: number,
    items: VisualItem[],
    timestamp?: Date
  ) {
    this.sessionId = sessionId;
    this.iteration = iteration;
    this.items = items;
    this.timestamp = timestamp ? new Date(timestamp) : new Date();
  }
}
