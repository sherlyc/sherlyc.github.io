import { ConfigService } from "../config/config.service";
import { TestBed } from "@angular/core/testing";
import { ExperimentService } from "./experiment.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { of, throwError } from "rxjs";
import { RuntimeService } from "../runtime/runtime.service";
import { LottoService } from "../lotto/lotto.service";
import { HttpClient } from "@angular/common/http";
import { LoggerService } from "../logger/logger.service";
import { ExperimentName } from "../../../../common/ExperimentName";
import { DeviceService } from "../device/device.service";
import { DeviceType } from "../../../../common/DeviceType";
import { StoreService } from "../store/store.service";

describe("ExperimentService", () => {
  const experimentAPI = "/spade/api/experiment";
  let configServiceMock: ServiceMock<ConfigService>;
  let service: ExperimentService;
  let runtimeService: ServiceMock<RuntimeService>;
  let lottoService: ServiceMock<LottoService>;
  let http: ServiceMock<HttpClient>;
  let loggerService: ServiceMock<LoggerService>;
  let deviceService: ServiceMock<DeviceService>;
  let storeService: ServiceMock<StoreService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: LottoService,
          useClass: mockService(LottoService)
        },
        {
          provide: HttpClient,
          useClass: mockService(HttpClient)
        },
        {
          provide: LoggerService,
          useClass: mockService(LoggerService)
        },
        {
          provide: DeviceService,
          useClass: mockService(DeviceService)
        },
        {
          provide: StoreService,
          useClass: mockService(StoreService)
        }
      ]
    });
    configServiceMock = TestBed.get(ConfigService);
    configServiceMock.getConfig.mockReturnValue({ experimentAPI });
    deviceService = TestBed.get(DeviceService);
    service = TestBed.get(ExperimentService);
    runtimeService = TestBed.get(RuntimeService);
    lottoService = TestBed.get(LottoService);
    http = TestBed.get(HttpClient);
    loggerService = TestBed.get(LoggerService);
    storeService = TestBed.get(StoreService);
    jest.clearAllMocks();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should not setup when running in server", async () => {
    runtimeService.isServer.mockReturnValue(true);

    await service.setup();

    expect(lottoService.getLotteryNumber).not.toHaveBeenCalled();
    expect(http.get).not.toHaveBeenCalled();
  });

  describe("when in browser", () => {
    beforeEach(() => {
      runtimeService.isServer.mockReturnValue(false);
    });

    it("should call api with unknown deviceType when not provided", async () => {
      lottoService.getLotteryNumber.mockReturnValue(1);
      http.get.mockReturnValueOnce(of("control"));
      deviceService.getDevice.mockReturnValue(DeviceType.unknown);

      await service.setup();

      expect(http.get).toHaveBeenCalledWith(
        "/spade/api/experiment/Users/1/unknown",
        {
          responseType: "text"
        }
      );
    });

    it("should call api with deviceType", async () => {
      lottoService.getLotteryNumber.mockReturnValue(1);
      http.get.mockReturnValueOnce(of("control"));
      deviceService.getDevice.mockReturnValue(DeviceType.mobile);

      await service.setup();

      expect(http.get).toHaveBeenCalledWith(
        "/spade/api/experiment/Users/1/mobile",
        {
          responseType: "text"
        }
      );
    });

    describe("when getting an experiment", () => {
      it("should set up experiment with experiment and variant from api", async () => {
        const experimentName = "ExperimentOne";
        const variant = "GroupOne";
        lottoService.getLotteryNumber.mockReturnValue(1);
        http.get.mockReturnValueOnce(of(experimentName));
        http.get.mockReturnValueOnce(of(variant));

        await service.setup();
        const experiment = await service.getExperiment();

        expect(experiment.name).toEqual(experimentName);
        expect(experiment.variant).toEqual(variant);
      });

      it("should return NotAssigned if control is returned from Users Experiment", async () => {
        lottoService.getLotteryNumber.mockReturnValue(1);
        http.get.mockReturnValueOnce(of("control"));

        await service.setup();
        const experiment = await service.getExperiment();

        expect(experiment.name).toEqual(ExperimentName.NotAssigned);
        expect(experiment.variant).toEqual(ExperimentName.NotAssigned);
      });

      it("should return NotAssigned if api fails when retrieving the experiment for user", async () => {
        lottoService.getLotteryNumber.mockReturnValue(1);
        http.get.mockReturnValue(throwError(of("Internal Server Error")));

        await service.setup();
        const experiment = await service.getExperiment();

        expect(experiment.name).toEqual(ExperimentName.NotAssigned);
        expect(experiment.variant).toEqual(ExperimentName.NotAssigned);
      });

      it("should return NotAssigned if api fails when retrieving variant", async () => {
        lottoService.getLotteryNumber.mockReturnValue(1);
        http.get.mockReturnValueOnce(of("ExperimentOne"));
        http.get.mockReturnValueOnce(throwError(of("Internal Server Error")));

        await service.setup();
        const experiment = await service.getExperiment();

        expect(experiment.name).toEqual(ExperimentName.NotAssigned);
        expect(experiment.variant).toEqual(ExperimentName.NotAssigned);
      });
    });

    describe("when getting variant", () => {
      it("should get the variant for the experiment that the user is assigned to", async () => {
        runtimeService.isServer.mockReturnValue(false);
        const getExperiment = jest.fn();

        const assignedExperiment = {
          name: "ExperimentOne",
          variant: "GroupTwo"
        };
        getExperiment.mockResolvedValue(assignedExperiment);
        service.getExperiment = getExperiment;

        const variant = await service.getVariant("ExperimentOne");

        expect(variant).toEqual("GroupTwo");
      });

      it("should get control variant when the user is assigned to control for that experiment", async () => {
        const assignedExperiment = {
          name: "ExperimentOne",
          variant: "control"
        };

        const getExperiment = jest.fn();
        getExperiment.mockResolvedValue(assignedExperiment);
        service.getExperiment = getExperiment;

        const variant = await service.getVariant("ExperimentOne");

        expect(variant).toEqual("control");
      });

      it("should return NotAssigned when getting variant for an experiment that the user is not assigned to", async () => {
        const assignedExperiment = {
          name: "ExperimentOne",
          variant: "GroupTwo"
        };

        const getExperiment = jest.fn();
        getExperiment.mockResolvedValue(assignedExperiment);
        service.getExperiment = getExperiment;

        const variant = await service.getVariant("ExperimentTwo");

        expect(variant).toEqual(ExperimentName.NotAssigned);
      });

      it("should get a NotAssigned variant when experiment does not exist", async () => {
        const variant = await service.getVariant("NoExistentExperiment");

        expect(variant).toEqual(ExperimentName.NotAssigned);
      });

      it("should get NotAssigned when not assigned to an experiment", async () => {
        lottoService.getLotteryNumber.mockReturnValue(1);
        http.get.mockReturnValueOnce(of("control"));

        await service.setup();
        const variant = await service.getVariant("TopStoriesExperiment");

        expect(variant).toEqual(ExperimentName.NotAssigned);
      });

      it("should get experiment variant from existing cache", async () => {
        storeService.get.mockReturnValue("control");
        http.get.mockReturnValueOnce(of("Experiment"));
        http.get.mockReturnValueOnce(of("GroupOne"));

        await service.setup();
        await service.getExperiment();
        const variant = await service.getVariant("Experiment");

        expect(variant).toEqual(ExperimentName.NotAssigned);
      });

      it("should wait for variant if there is no existing cache", async () => {
        storeService.get.mockReturnValueOnce(undefined);
        http.get.mockReturnValueOnce(of("Experiment"));
        http.get.mockReturnValueOnce(of("GroupOne"));

        await service.setup();
        await service.getExperiment();
        const variant = await service.getVariant("Experiment");

        expect(variant).toEqual("GroupOne");
      });

      it("should save experiment info to cache", async () => {
        deviceService.getDevice.mockReturnValue(DeviceType.unknown);
        const lotteryNumber = 1;
        lottoService.getLotteryNumber.mockReturnValue(lotteryNumber);
        storeService.get.mockReturnValue(undefined);
        const expName = "Experiment";
        http.get.mockReturnValueOnce(of(expName));
        const variantName = "GroupOne";
        http.get.mockReturnValueOnce(of(variantName));

        await service.setup();
        await service.getExperiment();

        expect(storeService.set).toHaveBeenNthCalledWith(
          lotteryNumber,
          `cache-exp-${ExperimentName.Users}-${lotteryNumber}-${DeviceType.unknown}`,
          expName
        );
        expect(storeService.set).toHaveBeenNthCalledWith(
          2,
          `cache-exp-${expName}-${lotteryNumber}-${DeviceType.unknown}`,
          variantName
        );
      });
    });
  });
});
