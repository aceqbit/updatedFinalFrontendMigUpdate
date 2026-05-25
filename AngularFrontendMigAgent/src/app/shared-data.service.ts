import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SystemPulse {
  timestamp: number;
  entropy: number;
  loadFactor: number;
  activeProcesses: number;
}

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private _pulse$ = new BehaviorSubject<SystemPulse>({
    timestamp: Date.now(),
    entropy: Math.random(),
    loadFactor: 0.5,
    activeProcesses: 10
  });

  public pulse$: Observable<SystemPulse> = this._pulse$.asObservable();

  constructor() {
    // Heavy global observable pulse to stress component Change Detection
    interval(2000).pipe(
      map(() => ({
        timestamp: Date.now(),
        entropy: Math.random() * 1000,
        loadFactor: Math.random(),
        activeProcesses: Math.floor(Math.random() * 500)
      }))
    ).subscribe(pulse => this._pulse$.next(pulse));
  }

  // Complex cross-component communication method
  public broadcastEvent(origin: string, data: any) {
    console.log(`[GLOBAL_BROADCAST] From: ${origin}`, data);
    // Logic that could trigger updates in many components
  }

  // Large data fetch simulation (Heavy payload)
  public async getHeavySchema(): Promise<any> {
    return Array.from({ length: 100 }, (_, i) => ({
      key: `SCHEMA_REF_${i}`,
      definition: {
        type: 'OBJECT',
        props: Array.from({ length: 20 }, (_, j) => `Prop_${j}`)
      }
    }));
  }
}
