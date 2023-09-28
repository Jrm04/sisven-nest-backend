import { Test, TestingModule } from '@nestjs/testing';
import { PayMethodsService } from './pay_methods.service';

describe('PayMethodsService', () => {
  let service: PayMethodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayMethodsService],
    }).compile();

    service = module.get<PayMethodsService>(PayMethodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
