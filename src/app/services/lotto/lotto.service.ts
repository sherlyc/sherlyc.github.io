import { Injectable } from "@angular/core";
import * as random from "math-random";
import { StoreService } from "../store/store.service";

@Injectable({
  providedIn: "root"
})
export class LottoService {
  constructor(private storeService: StoreService) {}

  getLotteryNumber(experimentName: string): number {
    const experimentStorageKey = `${experimentName}ExperimentLottery`;
    const existingLotteryNumber = this.storeService.get<number>(
      experimentStorageKey
    );
    if (existingLotteryNumber) {
      return existingLotteryNumber;
    }
    const newLotteryNumber = Math.floor(random() * 100) + 1;
    this.storeService.set(experimentStorageKey, newLotteryNumber);
    return newLotteryNumber;
  }
}
