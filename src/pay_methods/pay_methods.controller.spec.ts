import { Test, TestingModule } from '@nestjs/testing';
import { PayMethodsController } from './pay_methods.controller';
import { PayMethodsService } from './pay_methods.service';

describe('PayMethodsController', () => {
  let controller: PayMethodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayMethodsController],
      providers: [PayMethodsService],
    }).compile();

    controller = module.get<PayMethodsController>(PayMethodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
